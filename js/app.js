/**
 * Kids Alphabet Main Application (v3.0)
 * Coordinates tracing, animated videos, soundboard, quiz game, and sticker book.
 */

class KidsAlphabetApp {
    constructor() {
        this.alphabet = ALPHABET_DATA;
        this.currentIndex = 0;
        this.isLowercase = false;
        this.currentMode = 'trace'; // 'trace' | 'videos' | 'chart' | 'game' | 'stickers'

        // Local storage data
        this.progress = this.loadProgress();

        // Components
        this.canvas = null;
        this.quizState = {
            currentQuestion: null,
            score: 0,
            streak: 0
        };

        this.initDOM();
        this.initCanvas();
        this.renderLetter(this.currentIndex);
        this.renderVideoSection();
        this.renderChart();
        this.renderStickerBook();
        this.updateStarDisplay();
    }

    loadProgress() {
        try {
            const raw = localStorage.getItem('kids_alphabet_progress');
            if (raw) return JSON.parse(raw);
        } catch (_) {}
        return {
            totalStars: 0,
            letters: {}
        };
    }

    saveProgress() {
        try {
            localStorage.setItem('kids_alphabet_progress', JSON.stringify(this.progress));
        } catch (_) {}
        this.updateStarDisplay();
    }

    updateStarDisplay() {
        const starCountEl = document.getElementById('globalStarCount');
        if (starCountEl) {
            starCountEl.textContent = this.progress.totalStars || 0;
        }
    }

    initDOM() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.dataset.mode;
                this.switchMode(mode);
            });
        });

        // Letter slider / buttons
        this.renderLetterBar();

        // Prev / Next buttons
        const prevBtn = document.getElementById('prevLetterBtn');
        const nextBtn = document.getElementById('nextLetterBtn');
        if (prevBtn) prevBtn.addEventListener('click', () => this.prevLetter());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextLetter());

        // Case toggle (Uppercase / Lowercase)
        const upperBtn = document.getElementById('toggleUpperBtn');
        const lowerBtn = document.getElementById('toggleLowerBtn');
        if (upperBtn && lowerBtn) {
            upperBtn.addEventListener('click', () => {
                this.isLowercase = false;
                upperBtn.classList.add('active');
                lowerBtn.classList.remove('active');
                this.renderLetter(this.currentIndex);
            });
            lowerBtn.addEventListener('click', () => {
                this.isLowercase = true;
                lowerBtn.classList.add('active');
                upperBtn.classList.remove('active');
                this.renderLetter(this.currentIndex);
            });
        }

        // Action buttons
        const clearBtn = document.getElementById('clearBtn');
        if (clearBtn) clearBtn.addEventListener('click', () => this.canvas.clear());

        const demoBtn = document.getElementById('demoBtn');
        if (demoBtn) demoBtn.addEventListener('click', () => {
            window.kidsAudio.playPop();
            this.canvas.startDemo();
        });

        // Video button in tracing toolbar
        const traceVideoBtn = document.getElementById('traceVideoBtn');
        if (traceVideoBtn) {
            traceVideoBtn.addEventListener('click', () => {
                window.kidsAudio.playPop();
                this.switchMode('videos');
                this.loadLetterVideo(this.currentIndex);
            });
        }

        // Done button in tracing toolbar
        const doneBtn = document.getElementById('doneTracingBtn');
        if (doneBtn) {
            doneBtn.addEventListener('click', () => {
                window.kidsAudio.playPop();
                if (this.canvas) {
                    this.canvas.evaluateLetterCompletion();
                    if (!this.canvas.completed) {
                        // Gentle hint if strokes are still missing
                        window.kidsAudio.speak("Trace all the strokes from 1 to the end!");
                    }
                }
            });
        }

        // Jump to trace from video theater
        const jumpTraceBtn = document.getElementById('jumpToTraceFromVideoBtn');
        if (jumpTraceBtn) {
            jumpTraceBtn.addEventListener('click', () => {
                window.kidsAudio.playPop();
                this.switchMode('trace');
            });
        }

        const speakBtn = document.getElementById('speakLetterBtn');
        if (speakBtn) speakBtn.addEventListener('click', () => {
            const letter = this.alphabet[this.currentIndex];
            window.kidsAudio.speakLetter(letter, this.isLowercase);
        });

        const phonicsBtn = document.getElementById('phonicsBtn');
        if (phonicsBtn) phonicsBtn.addEventListener('click', () => {
            const letter = this.alphabet[this.currentIndex];
            window.kidsAudio.speakPhonics(letter);
        });

        // Color swatches
        document.querySelectorAll('.color-swatch').forEach(swatch => {
            swatch.addEventListener('click', () => {
                document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
                swatch.classList.add('selected');
                const color = swatch.dataset.color;
                this.canvas.setColor(color);
                window.kidsAudio.playPop();
            });
        });

        // Brush sizes
        document.querySelectorAll('.brush-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.brush-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                const size = parseInt(btn.dataset.size, 10);
                this.canvas.setBrushSize(size);
                window.kidsAudio.playPop();
            });
        });

        // Sound mute toggle
        const muteBtn = document.getElementById('muteToggleBtn');
        if (muteBtn) {
            muteBtn.addEventListener('click', () => {
                window.kidsAudio.muted = !window.kidsAudio.muted;
                muteBtn.textContent = window.kidsAudio.muted ? '🔇' : '🔊';
                muteBtn.classList.toggle('muted', window.kidsAudio.muted);
            });
        }

        // Quiz Next button
        const quizNextBtn = document.getElementById('quizNextBtn');
        if (quizNextBtn) {
            quizNextBtn.addEventListener('click', () => this.generateQuizQuestion());
        }
    }

    initCanvas() {
        const canvasEl = document.getElementById('tracingCanvas');
        if (!canvasEl) return;

        this.canvas = new TracingCanvas(canvasEl, {
            onProgress: (pct, stars) => this.handleTraceProgress(pct, stars),
            onComplete: (letter, isLower) => this.handleTraceComplete(letter, isLower),
            onStrokeUpdate: (status) => this.renderStrokeChecklist(status)
        });
    }

    renderStrokeChecklist(statusList) {
        const bar = document.getElementById('strokeChecklistBar');
        if (!bar) return;
        bar.innerHTML = '';

        statusList.forEach(s => {
            const item = document.createElement('div');
            item.className = `stroke-status-chip ${s.isDone ? 'done' : ''}`;
            item.innerHTML = `
                <span class="chip-num">${s.id}</span>
                <span class="chip-label">${s.hint}</span>
                <span class="chip-check">${s.isDone ? '✅' : '⏳'}</span>
            `;
            bar.appendChild(item);
        });
    }

    renderLetterBar() {
        const bar = document.getElementById('lettersQuickBar');
        if (!bar) return;
        bar.innerHTML = '';

        this.alphabet.forEach((item, idx) => {
            const btn = document.createElement('button');
            btn.className = `letter-pill ${idx === this.currentIndex ? 'active' : ''}`;
            btn.dataset.index = idx;

            const letterInfo = this.progress.letters[item.char];
            const hasStars = letterInfo && letterInfo.stars > 0;

            btn.innerHTML = `
                <span class="pill-char">${item.char}</span>
                ${hasStars ? '<span class="pill-star">⭐</span>' : ''}
            `;

            btn.addEventListener('click', () => {
                this.currentIndex = idx;
                this.renderLetter(idx);
                this.updateLetterBar();
            });

            bar.appendChild(btn);
        });
    }

    updateLetterBar() {
        const pills = document.querySelectorAll('.letter-pill');
        pills.forEach((pill, idx) => {
            pill.classList.toggle('active', idx === this.currentIndex);
            const item = this.alphabet[idx];
            const letterInfo = this.progress.letters[item.char];
            const hasStars = letterInfo && letterInfo.stars > 0;
            const starSpan = pill.querySelector('.pill-star');
            if (hasStars && !starSpan) {
                const s = document.createElement('span');
                s.className = 'pill-star';
                s.textContent = '⭐';
                pill.appendChild(s);
            }
        });

        const active = document.querySelector('.letter-pill.active');
        if (active) {
            active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }

    renderLetter(index) {
        this.currentIndex = index;
        const letter = this.alphabet[index];
        if (!letter) return;

        const charDisplay = this.isLowercase ? letter.lower : letter.char;
        const mainCharEl = document.getElementById('currentLetterDisplay');
        if (mainCharEl) mainCharEl.textContent = charDisplay;

        const wordEl = document.getElementById('currentWordDisplay');
        if (wordEl) wordEl.textContent = letter.word;

        const emojiEl = document.getElementById('currentEmojiDisplay');
        if (emojiEl) emojiEl.textContent = letter.emoji;

        const soundHintEl = document.getElementById('soundHintDisplay');
        if (soundHintEl) soundHintEl.textContent = letter.soundHint;

        const funFactEl = document.getElementById('funFactDisplay');
        if (funFactEl) funFactEl.textContent = letter.funFact;

        const altContainer = document.getElementById('altWordsContainer');
        if (altContainer) {
            altContainer.innerHTML = '';
            letter.altWords.forEach(alt => {
                const chip = document.createElement('button');
                chip.className = 'word-chip';
                chip.innerHTML = `${alt.emoji} <span>${alt.word}</span>`;
                chip.addEventListener('click', () => {
                    window.kidsAudio.playPop();
                    window.kidsAudio.speak(alt.word);
                });
                altContainer.appendChild(chip);
            });
        }

        this.updateStarRating(0);

        if (this.canvas) {
            this.canvas.setLetter(letter, this.isLowercase);
        }

        this.updateLetterBar();
        window.kidsAudio.speakLetter(letter, this.isLowercase);
    }

    prevLetter() {
        let nextIdx = this.currentIndex - 1;
        if (nextIdx < 0) nextIdx = this.alphabet.length - 1;
        this.renderLetter(nextIdx);
    }

    nextLetter() {
        let nextIdx = this.currentIndex + 1;
        if (nextIdx >= this.alphabet.length) nextIdx = 0;
        this.renderLetter(nextIdx);
    }

    handleTraceProgress(pct, stars) {
        const pctEl = document.getElementById('tracePercent');
        if (pctEl) pctEl.textContent = `${pct}%`;

        const barEl = document.getElementById('traceProgressBar');
        if (barEl) barEl.style.width = `${pct}%`;

        this.updateStarRating(stars);
    }

    updateStarRating(stars) {
        for (let i = 1; i <= 3; i++) {
            const starEl = document.getElementById(`star-${i}`);
            if (starEl) {
                starEl.classList.toggle('active', i <= stars);
            }
        }
    }

    handleTraceComplete(letter, isLower) {
        if (!this.progress.letters[letter.char]) {
            this.progress.letters[letter.char] = { upper: false, lower: false, stars: 0 };
        }
        const record = this.progress.letters[letter.char];
        const wasNew = isLower ? !record.lower : !record.upper;

        if (isLower) record.lower = true;
        else record.upper = true;

        if (wasNew) {
            record.stars = Math.min(3, record.stars + 1);
            this.progress.totalStars += 3;
            this.saveProgress();
            this.updateLetterBar();
            this.renderStickerBook();
        }

        this.showSuccessCelebration(letter);
    }

    showSuccessCelebration(letter) {
        const modal = document.getElementById('celebrationModal');
        if (!modal) return;

        const charDisplay = modal.querySelector('.modal-char');
        const msgDisplay = modal.querySelector('.modal-msg');

        if (charDisplay) charDisplay.textContent = this.isLowercase ? letter.lower : letter.char;
        if (msgDisplay) msgDisplay.textContent = `You traced ${letter.word} ${letter.emoji} perfectly!`;

        modal.classList.add('visible');

        const closeBtn = document.getElementById('closeModalBtn');
        const nextLetterModalBtn = document.getElementById('nextLetterModalBtn');

        const dismiss = () => {
            modal.classList.remove('visible');
        };

        if (closeBtn) closeBtn.onclick = dismiss;
        if (nextLetterModalBtn) {
            nextLetterModalBtn.onclick = () => {
                dismiss();
                this.nextLetter();
            };
        }
    }

    switchMode(mode) {
        this.currentMode = mode;
        window.kidsAudio.playPop();

        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });

        document.querySelectorAll('.mode-section').forEach(sec => {
            sec.classList.remove('active');
        });

        const activeSec = document.getElementById(`section-${mode}`);
        if (activeSec) activeSec.classList.add('active');

        if (mode === 'trace') {
            setTimeout(() => {
                if (this.canvas) {
                    this.canvas.initCanvasSize();
                    this.renderLetter(this.currentIndex);
                }
            }, 100);
        } else if (mode === 'videos') {
            this.loadLetterVideo(this.currentIndex);
        } else if (mode === 'game') {
            this.startQuiz();
        } else if (mode === 'stickers') {
            this.renderStickerBook();
        } else if (mode === 'chart') {
            this.renderChart();
        }
    }

    /**
     * Mode: Alphabet Video Theater
     */
    renderVideoSection() {
        const grid = document.getElementById('videoLettersGrid');
        if (!grid) return;
        grid.innerHTML = '';

        this.alphabet.forEach((item, idx) => {
            const btn = document.createElement('button');
            btn.className = `video-letter-pill ${idx === this.currentIndex ? 'active' : ''}`;
            btn.innerHTML = `<span>${item.char}</span> <small>${item.emoji}</small>`;
            btn.addEventListener('click', () => {
                window.kidsAudio.playPop();
                this.currentIndex = idx;
                this.loadLetterVideo(idx);
                document.querySelectorAll('.video-letter-pill').forEach((p, i) => {
                    p.classList.toggle('active', i === idx);
                });
            });
            grid.appendChild(btn);
        });
    }

    loadLetterVideo(index) {
        const letter = this.alphabet[index];
        if (!letter) return;

        const videoPlayer = document.getElementById('letterVideoPlayer');
        const sourceEl = document.getElementById('videoPlayerSource');
        const badgeEl = document.getElementById('videoLetterBadge');
        const titleEl = document.getElementById('videoWordTitle');
        const hintEl = document.getElementById('videoPhonicsHint');

        const videoPath = `videos/letter_${letter.char}.mp4`;

        if (badgeEl) badgeEl.textContent = letter.char;
        if (titleEl) titleEl.textContent = `${letter.char} is for ${letter.word} ${letter.emoji}`;
        if (hintEl) hintEl.textContent = `Letter ${letter.char} makes the sound ${letter.phonetic}`;

        if (videoPlayer && sourceEl) {
            sourceEl.src = videoPath;
            videoPlayer.load();
            videoPlayer.play().catch(() => {});
        }
    }

    /**
     * Mode: Alphabet Chart / Soundboard
     */
    renderChart() {
        const grid = document.getElementById('alphabetGrid');
        if (!grid) return;
        grid.innerHTML = '';

        this.alphabet.forEach((item, idx) => {
            const card = document.createElement('div');
            card.className = 'chart-card';
            card.style.borderColor = item.color;

            const letterInfo = this.progress.letters[item.char];
            const hasStars = letterInfo && letterInfo.stars > 0;

            card.innerHTML = `
                <div class="chart-card-top">
                    <span class="card-letters" style="color: ${item.color}">${item.char}${item.lower}</span>
                    ${hasStars ? '<span class="card-star">⭐</span>' : ''}
                </div>
                <div class="card-emoji">${item.emoji}</div>
                <div class="card-word">${item.word}</div>
                <div class="card-sound">${item.phonetic}</div>
                <button class="card-trace-btn" style="background-color: ${item.color}">Trace ✏️</button>
            `;

            card.addEventListener('click', (e) => {
                if (e.target.classList.contains('card-trace-btn')) return;
                window.kidsAudio.speakLetter(item);
                card.classList.add('bouncing');
                setTimeout(() => card.classList.remove('bouncing'), 600);
            });

            const traceBtn = card.querySelector('.card-trace-btn');
            traceBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.currentIndex = idx;
                this.switchMode('trace');
            });

            grid.appendChild(card);
        });
    }

    /**
     * Mode: Phonics Quiz Game
     */
    startQuiz() {
        this.quizState.score = 0;
        this.quizState.streak = 0;
        this.updateQuizUI();
        this.generateQuizQuestion();
    }

    generateQuizQuestion() {
        const qType = Math.random() < 0.5 ? 'letter' : 'word';
        const correctIndex = Math.floor(Math.random() * this.alphabet.length);
        const correctLetter = this.alphabet[correctIndex];

        const distractors = [];
        while (distractors.length < 3) {
            const r = Math.floor(Math.random() * this.alphabet.length);
            if (r !== correctIndex && !distractors.includes(r)) {
                distractors.push(r);
            }
        }

        const choices = [correctIndex, ...distractors].sort(() => Math.random() - 0.5);

        this.quizState.currentQuestion = {
            type: qType,
            correctLetter: correctLetter,
            choices: choices
        };

        this.renderQuizQuestion();
    }

    renderQuizQuestion() {
        const q = this.quizState.currentQuestion;
        if (!q) return;

        const promptTextEl = document.getElementById('quizPromptText');
        const promptEmojiEl = document.getElementById('quizPromptEmoji');
        const choicesGrid = document.getElementById('quizChoicesGrid');
        const feedbackEl = document.getElementById('quizFeedback');
        const nextBtn = document.getElementById('quizNextBtn');

        if (feedbackEl) {
            feedbackEl.textContent = '';
            feedbackEl.className = 'quiz-feedback';
        }
        if (nextBtn) nextBtn.style.display = 'none';

        if (q.type === 'letter') {
            if (promptEmojiEl) promptEmojiEl.textContent = '🔤';
            if (promptTextEl) promptTextEl.textContent = `Can you find the letter "${q.correctLetter.char}"?`;
            window.kidsAudio.speak(`Can you find the letter ${q.correctLetter.char}?`);
        } else {
            if (promptEmojiEl) promptEmojiEl.textContent = q.correctLetter.emoji;
            if (promptTextEl) promptTextEl.textContent = `Which letter starts with ${q.correctLetter.word}?`;
            window.kidsAudio.speak(`Which letter does ${q.correctLetter.word} start with?`);
        }

        if (choicesGrid) {
            choicesGrid.innerHTML = '';
            q.choices.forEach(idx => {
                const item = this.alphabet[idx];
                const btn = document.createElement('button');
                btn.className = 'quiz-choice-card';
                btn.innerHTML = `
                    <span class="choice-char">${item.char}</span>
                    <span class="choice-lower">${item.lower}</span>
                `;

                btn.addEventListener('click', () => this.handleQuizAnswer(btn, item));
                choicesGrid.appendChild(btn);
            });
        }
    }

    handleQuizAnswer(btn, selectedItem) {
        const q = this.quizState.currentQuestion;
        if (!q) return;

        const isCorrect = selectedItem.char === q.correctLetter.char;
        const feedbackEl = document.getElementById('quizFeedback');
        const nextBtn = document.getElementById('quizNextBtn');

        document.querySelectorAll('.quiz-choice-card').forEach(c => c.disabled = true);

        if (isCorrect) {
            btn.classList.add('correct');
            this.quizState.score++;
            this.quizState.streak++;
            this.progress.totalStars += 1;
            this.saveProgress();
            this.updateQuizUI();

            window.kidsAudio.playSuccess();
            window.kidsAudio.speak(`Yes! ${selectedItem.char} is for ${selectedItem.word}!`);

            if (feedbackEl) {
                feedbackEl.textContent = `🎉 Fantastic! ${selectedItem.char} is for ${selectedItem.word}! 🌟 +1 Star!`;
                feedbackEl.className = 'quiz-feedback correct';
            }

            if (nextBtn) nextBtn.style.display = 'inline-flex';
            setTimeout(() => {
                if (this.currentMode === 'game') this.generateQuizQuestion();
            }, 1800);
        } else {
            btn.classList.add('wrong');
            this.quizState.streak = 0;
            this.updateQuizUI();

            window.kidsAudio.playPop();
            window.kidsAudio.speak(`Nice try! That is the letter ${selectedItem.char}.`);

            if (feedbackEl) {
                feedbackEl.textContent = `Almost! That is letter ${selectedItem.char}. The right answer was ${q.correctLetter.char}!`;
                feedbackEl.className = 'quiz-feedback wrong';
            }

            if (nextBtn) nextBtn.style.display = 'inline-flex';
        }
    }

    updateQuizUI() {
        const scoreEl = document.getElementById('quizScoreVal');
        const streakEl = document.getElementById('quizStreakVal');
        if (scoreEl) scoreEl.textContent = this.quizState.score;
        if (streakEl) streakEl.textContent = this.quizState.streak;
    }

    /**
     * Mode: My Sticker Book & Badges
     */
    renderStickerBook() {
        const grid = document.getElementById('stickerGrid');
        if (!grid) return;
        grid.innerHTML = '';

        let unlockedCount = 0;

        this.alphabet.forEach(item => {
            const record = this.progress.letters[item.char] || { upper: false, lower: false, stars: 0 };
            const isUnlocked = record.upper || record.lower;
            if (isUnlocked) unlockedCount++;

            const badge = document.createElement('div');
            badge.className = `sticker-badge ${isUnlocked ? 'unlocked' : 'locked'}`;

            badge.innerHTML = `
                <div class="sticker-icon">${isUnlocked ? item.emoji : '🔒'}</div>
                <div class="sticker-letter">${item.char}${item.lower}</div>
                <div class="sticker-name">${isUnlocked ? item.word : 'Locked'}</div>
                <div class="sticker-stars">
                    ${'⭐'.repeat(record.stars || 0)}
                </div>
            `;

            if (isUnlocked) {
                badge.addEventListener('click', () => {
                    window.kidsAudio.playStar();
                    window.kidsAudio.speak(`${item.char} is for ${item.word}! You earned ${record.stars} stars!`);
                    badge.classList.add('bouncing');
                    setTimeout(() => badge.classList.remove('bouncing'), 600);
                });
            }

            grid.appendChild(badge);
        });

        const progressMsg = document.getElementById('stickerProgressMsg');
        if (progressMsg) {
            progressMsg.textContent = `${unlockedCount} of 26 Stickers Unlocked! 🌟`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.kidsApp = new KidsAlphabetApp();
});
