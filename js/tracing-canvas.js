/**
 * Kids Tracing Canvas Engine
 * Handles smooth finger/mouse drawing, stroke order guides, checkpoint tracking,
 * animated hand/pencil demo, and celebration particles.
 */

class TracingCanvas {
    constructor(canvasElement, options = {}) {
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.onProgress = options.onProgress || (() => {});
        this.onComplete = options.onComplete || (() => {});

        // Internal logical coordinate size: 1000 x 1000
        this.coordSize = 1000;
        this.scale = 1;

        // Current letter state
        this.currentLetter = null;
        this.isLowercase = false;
        this.strokes = [];
        this.checkpoints = []; // Array of {x, y, strokeId, hit}
        this.totalCheckpoints = 0;
        this.hitCheckpoints = 0;

        // Brush settings
        this.currentColor = '#FF4757';
        this.brushSize = 42; // in 1000-space
        this.isRainbow = false;
        this.rainbowHue = 0;

        // Drawing state
        this.isDrawing = false;
        this.userPaths = []; // Array of drawn paths: [ { color, size, points: [{x,y}] } ]
        this.currentPath = null;
        this.completed = false;

        // Demo animation state
        this.isDemoRunning = false;
        this.demoTimer = null;
        this.demoPencilPos = null;

        // Floating sparkle particles
        this.particles = [];

        this.initCanvasSize();
        this.bindEvents();
        this.startParticleLoop();
    }

    initCanvasSize() {
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const width = rect.width || 500;
        const height = rect.height || 500;

        this.canvas.width = Math.floor(width * dpr);
        this.canvas.height = Math.floor(height * dpr);
        this.scale = (width * dpr) / this.coordSize;

        this.redraw();
    }

    setLetter(letterObj, isLowercase = false) {
        this.currentLetter = letterObj;
        this.isLowercase = isLowercase;
        this.stopDemo();

        const rawStrokes = isLowercase ? letterObj.lowerStrokes : letterObj.upperStrokes;
        this.strokes = rawStrokes || [];

        // Build checkpoints along each stroke
        this.checkpoints = [];
        this.strokes.forEach(stroke => {
            const pts = stroke.points;
            if (!pts || pts.length < 2) return;

            // Interpolate points every ~35 units
            for (let i = 0; i < pts.length - 1; i++) {
                const p1 = pts[i];
                const p2 = pts[i + 1];
                const dx = p2[0] - p1[0];
                const dy = p2[1] - p1[1];
                const dist = Math.hypot(dx, dy);
                const steps = Math.max(1, Math.floor(dist / 35));

                for (let s = 0; s <= steps; s++) {
                    const t = s / steps;
                    this.checkpoints.push({
                        x: p1[0] + dx * t,
                        y: p1[1] + dy * t,
                        strokeId: stroke.id,
                        hit: false
                    });
                }
            }
        });

        this.totalCheckpoints = this.checkpoints.length || 1;
        this.hitCheckpoints = 0;
        this.completed = false;
        this.userPaths = [];
        this.currentPath = null;

        this.redraw();
        this.onProgress(0, 0);
    }

    clear() {
        this.stopDemo();
        this.userPaths = [];
        this.currentPath = null;
        this.completed = false;
        this.hitCheckpoints = 0;
        this.checkpoints.forEach(cp => cp.hit = false);
        this.particles = [];
        this.redraw();
        this.onProgress(0, 0);
        window.kidsAudio.playErase();
    }

    setColor(colorHex) {
        if (colorHex === 'rainbow') {
            this.isRainbow = true;
        } else {
            this.isRainbow = false;
            this.currentColor = colorHex;
        }
    }

    setBrushSize(size) {
        this.brushSize = size;
    }

    getCoord(e) {
        const rect = this.canvas.getBoundingClientRect();
        const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

        const x = ((clientX - rect.left) / rect.width) * this.coordSize;
        const y = ((clientY - rect.top) / rect.height) * this.coordSize;
        return { x, y };
    }

    bindEvents() {
        window.addEventListener('resize', () => this.initCanvasSize());

        // Pointer Events (supports stylus, finger touch, and mouse unified)
        this.canvas.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            this.canvas.setPointerCapture(e.pointerId);
            this.handleStart(this.getCoord(e));
        });

        this.canvas.addEventListener('pointermove', (e) => {
            if (!this.isDrawing) return;
            e.preventDefault();
            this.handleMove(this.getCoord(e));
        });

        const endHandler = (e) => {
            if (!this.isDrawing) return;
            e.preventDefault();
            try { this.canvas.releasePointerCapture(e.pointerId); } catch (_) {}
            this.handleEnd();
        };

        this.canvas.addEventListener('pointerup', endHandler);
        this.canvas.addEventListener('pointercancel', endHandler);
    }

    handleStart(pt) {
        this.stopDemo();
        this.isDrawing = true;
        let color = this.currentColor;
        if (this.isRainbow) {
            color = `hsl(${this.rainbowHue}, 90%, 55%)`;
            this.rainbowHue = (this.rainbowHue + 25) % 360;
        }

        this.currentPath = {
            color: color,
            size: this.brushSize,
            isRainbow: this.isRainbow,
            points: [pt]
        };
        this.userPaths.push(this.currentPath);

        this.checkHit(pt);
        this.redraw();
        window.kidsAudio.playPop();
    }

    handleMove(pt) {
        if (!this.currentPath) return;
        this.currentPath.points.push(pt);

        if (this.isRainbow) {
            this.rainbowHue = (this.rainbowHue + 3) % 360;
            this.currentPath.color = `hsl(${this.rainbowHue}, 90%, 55%)`;
            // Spawn little sparkle particle occasionally
            if (Math.random() < 0.4) {
                this.spawnSparkle(pt.x, pt.y);
            }
        }

        this.checkHit(pt);
        this.redraw();
    }

    handleEnd() {
        this.isDrawing = false;
        this.currentPath = null;
        this.checkCompletion();
    }

    checkHit(pt) {
        // Hit tolerance around stroke path
        const hitRadius = this.brushSize * 1.5;
        let newHit = false;

        for (const cp of this.checkpoints) {
            if (!cp.hit) {
                const dist = Math.hypot(cp.x - pt.x, cp.y - pt.y);
                if (dist <= hitRadius) {
                    cp.hit = true;
                    this.hitCheckpoints++;
                    newHit = true;
                }
            }
        }

        if (newHit) {
            const pct = Math.round((this.hitCheckpoints / this.totalCheckpoints) * 100);
            let stars = 0;
            if (pct >= 85) stars = 3;
            else if (pct >= 55) stars = 2;
            else if (pct >= 25) stars = 1;

            this.onProgress(pct, stars);

            if (pct >= 85 && !this.completed) {
                this.completed = true;
                this.triggerCelebration();
            }
        }
    }

    checkCompletion() {
        const pct = Math.round((this.hitCheckpoints / this.totalCheckpoints) * 100);
        if (pct >= 80 && !this.completed) {
            this.completed = true;
            this.triggerCelebration();
        }
    }

    triggerCelebration() {
        // Star fanfare and praise!
        window.kidsAudio.playCheer();
        setTimeout(() => window.kidsAudio.speakPraise(), 600);

        // Burst 40 confetti particles
        for (let i = 0; i < 45; i++) {
            this.spawnCelebrationParticle();
        }

        this.onComplete(this.currentLetter, this.isLowercase);
    }

    spawnSparkle(x, y) {
        this.particles.push({
            type: 'sparkle',
            x: x + (Math.random() * 30 - 15),
            y: y + (Math.random() * 30 - 15),
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2 - 1,
            size: 14 + Math.random() * 12,
            char: ['✨', '⭐', '💫', '💖'][Math.floor(Math.random() * 4)],
            life: 1.0,
            decay: 0.04
        });
    }

    spawnCelebrationParticle() {
        const colors = ['#FF4757', '#FFA502', '#2ED573', '#1E90FF', '#9B59B6', '#FFD32A'];
        this.particles.push({
            type: 'confetti',
            x: 500 + (Math.random() * 200 - 100),
            y: 500 + (Math.random() * 200 - 100),
            vx: (Math.random() - 0.5) * 14,
            vy: (Math.random() - 0.5) * 14 - 4,
            size: 10 + Math.random() * 14,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 1.0,
            decay: 0.015,
            rotation: Math.random() * Math.PI,
            rotSpeed: (Math.random() - 0.5) * 0.2
        });
    }

    startParticleLoop() {
        const update = () => {
            if (this.particles.length > 0) {
                for (let i = this.particles.length - 1; i >= 0; i--) {
                    const p = this.particles[i];
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life -= p.decay;
                    if (p.type === 'confetti') {
                        p.vy += 0.3; // gravity
                        p.rotation += p.rotSpeed;
                    }
                    if (p.life <= 0) {
                        this.particles.splice(i, 1);
                    }
                }
                this.redraw();
            }
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }

    /**
     * Demonstrates how to trace the letter step-by-step
     */
    startDemo() {
        if (!this.strokes || this.strokes.length === 0) return;
        this.clear();
        this.isDemoRunning = true;

        let strokeIndex = 0;
        let pointIndex = 0;
        let currentDemoPath = null;

        const step = () => {
            if (!this.isDemoRunning) return;

            const stroke = this.strokes[strokeIndex];
            if (!stroke) {
                // Finished demo!
                this.stopDemo();
                window.kidsAudio.playStar();
                return;
            }

            const pts = stroke.points;
            if (pointIndex === 0) {
                currentDemoPath = {
                    color: '#FF6B81',
                    size: this.brushSize,
                    isRainbow: false,
                    points: [ { x: pts[0][0], y: pts[0][1] } ]
                };
                this.userPaths.push(currentDemoPath);
                window.kidsAudio.playDing();
            }

            pointIndex++;
            if (pointIndex < pts.length) {
                const target = { x: pts[pointIndex][0], y: pts[pointIndex][1] };
                // interpolate smoothly
                const last = currentDemoPath.points[currentDemoPath.points.length - 1];
                const dx = target.x - last.x;
                const dy = target.y - last.y;
                const dist = Math.hypot(dx, dy);
                const subSteps = Math.max(5, Math.floor(dist / 15));

                let s = 1;
                const subInterval = setInterval(() => {
                    if (!this.isDemoRunning) {
                        clearInterval(subInterval);
                        return;
                    }
                    const t = s / subSteps;
                    const subPt = { x: last.x + dx * t, y: last.y + dy * t };
                    currentDemoPath.points.push(subPt);
                    this.demoPencilPos = subPt;
                    this.checkHit(subPt);
                    this.redraw();
                    s++;
                    if (s > subSteps) {
                        clearInterval(subInterval);
                        setTimeout(step, 80);
                    }
                }, 20);
            } else {
                // Move to next stroke
                strokeIndex++;
                pointIndex = 0;
                setTimeout(step, 250);
            }
        };

        step();
    }

    stopDemo() {
        this.isDemoRunning = false;
        this.demoPencilPos = null;
    }

    redraw() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        ctx.clearRect(0, 0, w, h);

        ctx.save();
        ctx.scale(this.scale, this.scale);

        // 1. Draw Kindergarten / Montessori 4-Line Handwriting Rules
        this.drawHandwritingGuidelines(ctx);

        // 2. Draw Guide Outline & Numbered Arrows
        this.drawLetterGuide(ctx);

        // 3. Draw User Traced Lines
        this.drawUserStrokes(ctx);

        // 4. Draw Animated Demo Pencil (if demo running)
        if (this.demoPencilPos) {
            this.drawDemoPencil(ctx, this.demoPencilPos.x, this.demoPencilPos.y);
        }

        // 5. Draw Particles (Sparkles & Confetti)
        this.drawParticles(ctx);

        ctx.restore();
    }

    drawHandwritingGuidelines(ctx) {
        ctx.save();

        const lines = [
            { y: 180, label: '☁️ Sky Line', color: '#BDE0FE', dash: [] },
            { y: 500, label: '✈️ Plane Line', color: '#FED049', dash: [14, 12] },
            { y: 820, label: '🌿 Grass Line', color: '#55EFC4', dash: [] },
            { y: 960, label: '🪱 Worm Line', color: '#FFD3B6', dash: [10, 10] }
        ];

        lines.forEach(line => {
            ctx.beginPath();
            ctx.setLineDash(line.dash);
            ctx.strokeStyle = line.color;
            ctx.lineWidth = 4;
            ctx.moveTo(60, line.y);
            ctx.lineTo(940, line.y);
            ctx.stroke();

            // Line label badge on the left
            ctx.setLineDash([]);
            ctx.font = 'bold 22px "Comic Neue", "Fredoka", sans-serif';
            ctx.fillStyle = '#718096';
            ctx.fillText(line.label, 70, line.y - 10);
        });

        ctx.restore();
    }

    drawLetterGuide(ctx) {
        if (!this.strokes || this.strokes.length === 0) return;

        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Draw light ghost background strokes
        this.strokes.forEach(stroke => {
            const pts = stroke.points;
            if (pts.length < 2) return;

            // Wide soft background track
            ctx.beginPath();
            ctx.setLineDash([]);
            ctx.strokeStyle = '#F1F3F5';
            ctx.lineWidth = this.brushSize * 1.8;
            ctx.moveTo(pts[0][0], pts[0][1]);
            for (let i = 1; i < pts.length; i++) {
                ctx.lineTo(pts[i][0], pts[i][1]);
            }
            ctx.stroke();

            // Inner dashed guide track
            ctx.beginPath();
            ctx.setLineDash([18, 16]);
            ctx.strokeStyle = '#B2BEC3';
            ctx.lineWidth = 8;
            ctx.moveTo(pts[0][0], pts[0][1]);
            for (let i = 1; i < pts.length; i++) {
                ctx.lineTo(pts[i][0], pts[i][1]);
            }
            ctx.stroke();
        });

        // Draw Checkpoint Dots
        this.checkpoints.forEach(cp => {
            ctx.beginPath();
            ctx.setLineDash([]);
            if (cp.hit) {
                ctx.fillStyle = '#2ED573';
                ctx.arc(cp.x, cp.y, 8, 0, Math.PI * 2);
            } else {
                ctx.fillStyle = '#DFE6E9';
                ctx.arc(cp.x, cp.y, 5, 0, Math.PI * 2);
            }
            ctx.fill();
        });

        // Draw Numbered Badges & Directional Arrows at the start of each stroke
        this.strokes.forEach(stroke => {
            const pts = stroke.points;
            if (pts.length < 2) return;

            const startX = pts[0][0];
            const startY = pts[0][1];

            // Calculate initial direction arrow
            const nextX = pts[1][0];
            const nextY = pts[1][1];
            const angle = Math.atan2(nextY - startY, nextX - startX);

            // Draw directional arrow just ahead of start
            const arrowDist = 48;
            const ax = startX + Math.cos(angle) * arrowDist;
            const ay = startY + Math.sin(angle) * arrowDist;

            ctx.save();
            ctx.translate(ax, ay);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.fillStyle = '#0984E3';
            ctx.moveTo(12, 0);
            ctx.lineTo(-8, -9);
            ctx.lineTo(-4, 0);
            ctx.lineTo(-8, 9);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            // Numbered Circle Badge (1, 2, 3...)
            ctx.beginPath();
            ctx.setLineDash([]);
            ctx.arc(startX, startY, 26, 0, Math.PI * 2);
            ctx.fillStyle = '#0984E3';
            ctx.fill();
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 4;
            ctx.stroke();

            // Number text
            ctx.font = 'bold 28px "Fredoka", "Comic Neue", sans-serif';
            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(stroke.id.toString(), startX, startY + 1);
        });

        ctx.restore();
    }

    drawUserStrokes(ctx) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        this.userPaths.forEach(path => {
            const pts = path.points;
            if (!pts || pts.length === 0) return;

            ctx.strokeStyle = path.color;
            ctx.lineWidth = path.size;

            if (pts.length === 1) {
                ctx.beginPath();
                ctx.arc(pts[0].x, pts[0].y, path.size / 2, 0, Math.PI * 2);
                ctx.fillStyle = path.color;
                ctx.fill();
                return;
            }

            ctx.beginPath();
            ctx.moveTo(pts[0].x, pts[0].y);

            // Smooth Bézier curve through midpoints
            for (let i = 1; i < pts.length - 1; i++) {
                const xc = (pts[i].x + pts[i + 1].x) / 2;
                const yc = (pts[i].y + pts[i + 1].y) / 2;
                ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
            }
            ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
            ctx.stroke();
        });

        ctx.restore();
    }

    drawDemoPencil(ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);

        // Pencil tip glow
        const grad = ctx.createRadialGradient(0, 0, 5, 0, 0, 30);
        grad.addColorStop(0, 'rgba(255, 107, 129, 0.8)');
        grad.addColorStop(1, 'rgba(255, 107, 129, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, Math.PI * 2);
        ctx.fill();

        // Cute animated hand / pencil emoji
        ctx.font = '48px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('✏️', 10, -20);

        ctx.restore();
    }

    drawParticles(ctx) {
        ctx.save();
        this.particles.forEach(p => {
            if (p.type === 'sparkle') {
                ctx.font = `${p.size}px sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.globalAlpha = Math.max(0, p.life);
                ctx.fillText(p.char, p.x, p.y);
            } else if (p.type === 'confetti') {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(0, p.life);
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
                ctx.restore();
            }
        });
        ctx.restore();
    }
}

window.TracingCanvas = TracingCanvas;
