/**
 * Kids Tracing Canvas Engine (v2.0)
 * Rock-solid touch/pointer drawing, uniform aspect-ratio preservation,
 * high-contrast child-friendly letter guides, real-time accuracy scoring,
 * and celebratory animations.
 */

class TracingCanvas {
    constructor(canvasElement, options = {}) {
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.onProgress = options.onProgress || (() => {});
        this.onComplete = options.onComplete || (() => {});

        // Internal logical coordinate space: 1000 x 1000
        this.coordSize = 1000;
        this.scaleFactor = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.dpr = window.devicePixelRatio || 1;

        // Current letter state
        this.currentLetter = null;
        this.isLowercase = false;
        this.strokes = [];
        this.checkpoints = []; // Array of {x, y, strokeId, hit}
        this.totalCheckpoints = 0;
        this.hitCheckpoints = 0;

        // Brush settings
        this.currentColor = '#FF4757';
        this.brushSize = 54; // in 1000-space
        this.isRainbow = false;
        this.rainbowHue = 0;

        // Drawing state
        this.isDrawing = false;
        this.userPaths = []; // Array of drawn paths: [ { color, size, points: [{x,y}] } ]
        this.currentPath = null;
        this.completed = false;

        // Demo animation state
        this.isDemoRunning = false;
        this.demoPencilPos = null;

        // Floating sparkle particles
        this.particles = [];

        this.initCanvasSize();
        this.bindEvents();
        this.startParticleLoop();
    }

    initCanvasSize() {
        const rect = this.canvas.getBoundingClientRect();
        this.dpr = window.devicePixelRatio || 1;
        const width = rect.width || 600;
        const height = rect.height || 500;

        this.canvas.width = Math.round(width * this.dpr);
        this.canvas.height = Math.round(height * this.dpr);

        // Uniform aspect ratio scaling: fit 1000x1000 box with 40px margin
        const usableSize = 1000;
        const availableW = this.canvas.width;
        const availableH = this.canvas.height;

        this.scaleFactor = Math.min(availableW / usableSize, availableH / usableSize) * 0.94;
        this.offsetX = (availableW - usableSize * this.scaleFactor) / 2;
        this.offsetY = (availableH - usableSize * this.scaleFactor) / 2;

        this.redraw();
    }

    setLetter(letterObj, isLowercase = false) {
        this.currentLetter = letterObj;
        this.isLowercase = isLowercase;
        this.stopDemo();

        const rawStrokes = isLowercase ? letterObj.lowerStrokes : letterObj.upperStrokes;
        this.strokes = rawStrokes || [];

        // Build dense checkpoints along each stroke for accuracy checking
        this.checkpoints = [];
        this.strokes.forEach(stroke => {
            const pts = stroke.points;
            if (!pts || pts.length < 2) return;

            for (let i = 0; i < pts.length - 1; i++) {
                const p1 = pts[i];
                const p2 = pts[i + 1];
                const dx = p2[0] - p1[0];
                const dy = p2[1] - p1[1];
                const dist = Math.hypot(dx, dy);
                const steps = Math.max(1, Math.floor(dist / 30));

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

    /**
     * Converts viewport client coordinates to 1000x1000 logical canvas coordinates
     */
    getCoord(e) {
        const rect = this.canvas.getBoundingClientRect();
        const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

        const canvasX = (clientX - rect.left) * this.dpr;
        const canvasY = (clientY - rect.top) * this.dpr;

        const x = (canvasX - this.offsetX) / this.scaleFactor;
        const y = (canvasY - this.offsetY) / this.scaleFactor;

        return { x, y };
    }

    bindEvents() {
        window.addEventListener('resize', () => this.initCanvasSize());

        // Unified Pointer & Touch listeners
        const startDraw = (e) => {
            e.preventDefault();
            try {
                if (e.pointerId && this.canvas.setPointerCapture) {
                    this.canvas.setPointerCapture(e.pointerId);
                }
            } catch (_) {}
            const pt = this.getCoord(e);
            this.handleStart(pt);
        };

        const moveDraw = (e) => {
            if (!this.isDrawing) return;
            if (e.pointerType === 'mouse' && e.buttons === 0) {
                this.handleEnd();
                return;
            }
            e.preventDefault();
            const pt = this.getCoord(e);
            this.handleMove(pt);
        };

        const endDraw = (e) => {
            if (!this.isDrawing) return;
            e.preventDefault();
            try {
                if (e.pointerId && this.canvas.releasePointerCapture) {
                    this.canvas.releasePointerCapture(e.pointerId);
                }
            } catch (_) {}
            this.handleEnd();
        };

        // Pointer Events
        this.canvas.addEventListener('pointerdown', startDraw);
        this.canvas.addEventListener('pointermove', moveDraw);
        this.canvas.addEventListener('pointerup', endDraw);
        this.canvas.addEventListener('pointercancel', endDraw);

        // Explicit Touch fallback for older mobile browsers
        this.canvas.addEventListener('touchstart', startDraw, { passive: false });
        this.canvas.addEventListener('touchmove', moveDraw, { passive: false });
        this.canvas.addEventListener('touchend', endDraw, { passive: false });
    }

    handleStart(pt) {
        this.stopDemo();
        this.isDrawing = true;
        let color = this.currentColor;
        if (this.isRainbow) {
            color = `hsl(${this.rainbowHue}, 95%, 52%)`;
            this.rainbowHue = (this.rainbowHue + 30) % 360;
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
        if (!this.isDrawing || !this.currentPath) return;
        this.currentPath.points.push(pt);

        if (this.isRainbow) {
            this.rainbowHue = (this.rainbowHue + 4) % 360;
            this.currentPath.color = `hsl(${this.rainbowHue}, 95%, 52%)`;
            if (Math.random() < 0.45) {
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
        const hitRadius = this.brushSize * 1.8;
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
            const pct = Math.min(100, Math.round((this.hitCheckpoints / this.totalCheckpoints) * 100));
            let stars = 0;
            if (pct >= 80) stars = 3;
            else if (pct >= 50) stars = 2;
            else if (pct >= 20) stars = 1;

            this.onProgress(pct, stars);

            if (pct >= 80 && !this.completed) {
                this.completed = true;
                this.triggerCelebration();
            }
        }
    }

    checkCompletion() {
        const pct = Math.min(100, Math.round((this.hitCheckpoints / this.totalCheckpoints) * 100));
        if (pct >= 75 && !this.completed) {
            this.completed = true;
            this.triggerCelebration();
        }
    }

    triggerCelebration() {
        window.kidsAudio.playCheer();
        setTimeout(() => window.kidsAudio.speakPraise(), 550);

        for (let i = 0; i < 50; i++) {
            this.spawnCelebrationParticle();
        }

        this.onComplete(this.currentLetter, this.isLowercase);
    }

    spawnSparkle(x, y) {
        this.particles.push({
            type: 'sparkle',
            x: x + (Math.random() * 26 - 13),
            y: y + (Math.random() * 26 - 13),
            vx: (Math.random() - 0.5) * 2.5,
            vy: (Math.random() - 0.5) * 2.5 - 1.5,
            size: 20 + Math.random() * 16,
            char: ['✨', '⭐', '💫', '💖'][Math.floor(Math.random() * 4)],
            life: 1.0,
            decay: 0.04
        });
    }

    spawnCelebrationParticle() {
        const colors = ['#FF4757', '#FFA502', '#2ED573', '#1E90FF', '#9B59B6', '#FFD32A', '#FF6B81'];
        this.particles.push({
            type: 'confetti',
            x: 500 + (Math.random() * 240 - 120),
            y: 500 + (Math.random() * 240 - 120),
            vx: (Math.random() - 0.5) * 16,
            vy: (Math.random() - 0.5) * 16 - 6,
            size: 14 + Math.random() * 14,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 1.0,
            decay: 0.014,
            rotation: Math.random() * Math.PI,
            rotSpeed: (Math.random() - 0.5) * 0.25
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
                        p.vy += 0.35; // gravity
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
     * Animated demonstration showing how to trace the letter
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
                this.stopDemo();
                window.kidsAudio.playStar();
                return;
            }

            const pts = stroke.points;
            if (pointIndex === 0) {
                currentDemoPath = {
                    color: '#FF4757',
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
                const last = currentDemoPath.points[currentDemoPath.points.length - 1];
                const dx = target.x - last.x;
                const dy = target.y - last.y;
                const dist = Math.hypot(dx, dy);
                const subSteps = Math.max(6, Math.floor(dist / 14));

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
                }, 18);
            } else {
                strokeIndex++;
                pointIndex = 0;
                setTimeout(step, 240);
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
        ctx.translate(this.offsetX, this.offsetY);
        ctx.scale(this.scaleFactor, this.scaleFactor);

        // 1. Draw Kindergarten 4-Line Guidelines
        this.drawHandwritingGuidelines(ctx);

        // 2. Draw High-Contrast Letter Guide Track & Numbered Badges
        this.drawLetterGuide(ctx);

        // 3. Draw User Traced Lines
        this.drawUserStrokes(ctx);

        // 4. Draw Animated Demo Pencil (if active)
        if (this.demoPencilPos) {
            this.drawDemoPencil(ctx, this.demoPencilPos.x, this.demoPencilPos.y);
        }

        // 5. Draw Particles
        this.drawParticles(ctx);

        ctx.restore();
    }

    drawHandwritingGuidelines(ctx) {
        ctx.save();

        const lines = [
            { y: 180, label: '☁️ Sky Line', color: '#90CAF9', dash: [] },
            { y: 500, label: '✈️ Plane Line', color: '#FBC02D', dash: [16, 14] },
            { y: 820, label: '🌿 Grass Line', color: '#4CAF50', dash: [] },
            { y: 940, label: '🪱 Worm Line', color: '#FFAB91', dash: [12, 12] }
        ];

        lines.forEach(line => {
            ctx.beginPath();
            ctx.setLineDash(line.dash);
            ctx.strokeStyle = line.color;
            ctx.lineWidth = 4.5;
            ctx.moveTo(30, line.y);
            ctx.lineTo(970, line.y);
            ctx.stroke();

            // Line label badge on the left
            ctx.setLineDash([]);
            ctx.font = 'bold 24px "Fredoka", "Comic Neue", sans-serif';
            ctx.fillStyle = '#546E7A';
            ctx.fillText(line.label, 40, line.y - 10);
        });

        ctx.restore();
    }

    drawLetterGuide(ctx) {
        if (!this.strokes || this.strokes.length === 0) return;

        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Palette for distinct numbered badges
        const badgeColors = ['#1E90FF', '#FFA502', '#2ED573', '#9B59B6', '#FF4757'];

        // Layer A: Wide High-Contrast Outer Track Border
        this.strokes.forEach(stroke => {
            const pts = stroke.points;
            if (pts.length < 2) return;

            // Outer contour stroke (darker pastel outline)
            ctx.beginPath();
            ctx.setLineDash([]);
            ctx.strokeStyle = '#CBD5E1';
            ctx.lineWidth = this.brushSize * 2.2;
            ctx.moveTo(pts[0][0], pts[0][1]);
            for (let i = 1; i < pts.length; i++) {
                ctx.lineTo(pts[i][0], pts[i][1]);
            }
            ctx.stroke();

            // Soft friendly inner lane fill
            ctx.beginPath();
            ctx.strokeStyle = '#F1F5F9';
            ctx.lineWidth = this.brushSize * 2.0;
            ctx.moveTo(pts[0][0], pts[0][1]);
            for (let i = 1; i < pts.length; i++) {
                ctx.lineTo(pts[i][0], pts[i][1]);
            }
            ctx.stroke();
        });

        // Layer B: Bright Crisp Center Dashed Guide Line
        this.strokes.forEach(stroke => {
            const pts = stroke.points;
            if (pts.length < 2) return;

            ctx.beginPath();
            ctx.setLineDash([20, 18]);
            ctx.strokeStyle = '#94A3B8';
            ctx.lineWidth = 9;
            ctx.moveTo(pts[0][0], pts[0][1]);
            for (let i = 1; i < pts.length; i++) {
                ctx.lineTo(pts[i][0], pts[i][1]);
            }
            ctx.stroke();
        });

        // Layer C: Checkpoint Dots
        this.checkpoints.forEach(cp => {
            ctx.beginPath();
            ctx.setLineDash([]);
            if (cp.hit) {
                ctx.fillStyle = '#2ED573';
                ctx.arc(cp.x, cp.y, 10, 0, Math.PI * 2);
            } else {
                ctx.fillStyle = '#CBD5E1';
                ctx.arc(cp.x, cp.y, 6, 0, Math.PI * 2);
            }
            ctx.fill();
        });

        // Layer D: Distinct Numbered Badges & Directional Arrows
        this.strokes.forEach((stroke, idx) => {
            const pts = stroke.points;
            if (pts.length < 2) return;

            const startX = pts[0][0];
            const startY = pts[0][1];
            const badgeColor = badgeColors[idx % badgeColors.length];

            // Direction arrow along stroke
            const nextX = pts[1][0];
            const nextY = pts[1][1];
            const angle = Math.atan2(nextY - startY, nextX - startX);
            const arrowDist = 58;
            const ax = startX + Math.cos(angle) * arrowDist;
            const ay = startY + Math.sin(angle) * arrowDist;

            ctx.save();
            ctx.translate(ax, ay);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.fillStyle = badgeColor;
            ctx.moveTo(16, 0);
            ctx.lineTo(-10, -11);
            ctx.lineTo(-5, 0);
            ctx.lineTo(-10, 11);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            // Glow / Pulse outer circle
            ctx.beginPath();
            ctx.arc(startX, startY, 36, 0, Math.PI * 2);
            ctx.fillStyle = badgeColor;
            ctx.globalAlpha = 0.25;
            ctx.fill();
            ctx.globalAlpha = 1.0;

            // Numbered Circle Badge (1, 2, 3...)
            ctx.beginPath();
            ctx.arc(startX, startY, 28, 0, Math.PI * 2);
            ctx.fillStyle = badgeColor;
            ctx.fill();
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 5;
            ctx.stroke();

            // Number text
            ctx.font = 'bold 30px "Fredoka", "Comic Neue", sans-serif';
            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(stroke.id.toString(), startX, startY + 2);
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
        const grad = ctx.createRadialGradient(0, 0, 5, 0, 0, 36);
        grad.addColorStop(0, 'rgba(255, 71, 87, 0.9)');
        grad.addColorStop(1, 'rgba(255, 71, 87, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, 36, 0, Math.PI * 2);
        ctx.fill();

        // Animated pencil emoji
        ctx.font = '54px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('✏️', 12, -24);

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
