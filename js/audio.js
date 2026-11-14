/**
 * Kids Alphabet Audio Engine (v2.0)
 * Uses high-quality natural voice audio recordings (Microsoft Azure Neural Child Voice)
 * with instant Web Audio synthesizer chimes and smart SpeechSynthesis fallback.
 */

class KidsAudioEngine {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.speechEnabled = true;
        this.selectedVoice = null;
        this.currentAudio = null;
        this.audioCache = {};
        this.initVoices();
    }

    initContext() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    initVoices() {
        if (!('speechSynthesis' in window)) return;
        const setVoice = () => {
            const voices = window.speechSynthesis.getVoices();
            // Prioritize natural online / neural voices
            const preferred = [
                'Natural',
                'Jenny',
                'Aria',
                'Ana',
                'Google US English',
                'Samantha',
                'en-US'
            ];
            for (const name of preferred) {
                const found = voices.find(v => v.name.includes(name) || v.lang.includes(name));
                if (found) {
                    this.selectedVoice = found;
                    break;
                }
            }
        };

        setVoice();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = setVoice;
        }
    }

    playPop() {
        if (this.muted) return;
        this.initContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(750, now + 0.08);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.1);
    }

    playDing() {
        if (this.muted) return;
        this.initContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1760, now + 0.25);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
    }

    playStar() {
        if (this.muted) return;
        this.initContext();
        if (!this.ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
            const now = this.ctx.currentTime + (i * 0.06);
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.28);
        });
    }

    playSuccess() {
        if (this.muted) return;
        this.initContext();
        if (!this.ctx) return;

        const chord = [
            { f: 523.25, t: 0 },
            { f: 659.25, t: 0.09 },
            { f: 783.99, t: 0.18 },
            { f: 1046.50, t: 0.27 },
            { f: 1318.51, t: 0.38 }
        ];

        chord.forEach(item => {
            const now = this.ctx.currentTime + item.t;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(item.f, now);

            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.55);
        });
    }

    playErase() {
        if (this.muted) return;
        this.initContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.17);
    }

    playCheer() {
        this.playSuccess();
        setTimeout(() => this.playStar(), 250);
    }

    /**
     * Plays a high-quality human voice MP3 file, with automatic speech synthesis fallback
     */
    playAudioFile(filePath, fallbackText) {
        if (this.muted) return;

        if (this.currentAudio) {
            try {
                this.currentAudio.pause();
                this.currentAudio.currentTime = 0;
            } catch (_) {}
        }

        const audio = new Audio(filePath);
        this.currentAudio = audio;

        audio.play().catch(() => {
            // If local audio playback fails (e.g. offline cache miss), fallback to TTS
            if (fallbackText) {
                this.speak(fallbackText);
            }
        });
    }

    speak(text, { pitch = 1.12, rate = 0.86 } = {}) {
        if (this.muted || !('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        if (this.selectedVoice) {
            utterance.voice = this.selectedVoice;
        }
        utterance.pitch = pitch;
        utterance.rate = rate;
        utterance.lang = 'en-US';

        window.speechSynthesis.speak(utterance);
    }

    speakLetter(letterObj, isLower = false) {
        this.playPop();
        const char = letterObj.char.toUpperCase();
        const filePath = `audio/letter_${char}.mp3`;
        const fallback = `${letterObj.char}. ${letterObj.char} is for ${letterObj.word}!`;
        this.playAudioFile(filePath, fallback);
    }

    speakPhonics(letterObj) {
        this.playPop();
        const char = letterObj.char.toUpperCase();
        const filePath = `audio/phonics_${char}.mp3`;
        const fallback = `The letter ${letterObj.char} makes the sound ${letterObj.phonetic}. ${letterObj.phonetic}, ${letterObj.phonetic}, ${letterObj.word}!`;
        this.playAudioFile(filePath, fallback);
    }

    speakPraise() {
        const praiseIdx = Math.floor(Math.random() * 5) + 1;
        const filePath = `audio/praise_${praiseIdx}.mp3`;
        const fallback = "Superstar! Awesome tracing!";
        this.playAudioFile(filePath, fallback);
    }
}

window.kidsAudio = new KidsAudioEngine();
