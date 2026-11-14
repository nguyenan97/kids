/**
 * Kids Alphabet Audio Engine
 * Pure Web Audio API synthesizers for zero-dependency, ultra-crisp sound effects
 * plus Web Speech API for natural phonics and letter narration.
 */

class KidsAudioEngine {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.speechEnabled = true;
        this.selectedVoice = null;
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
            // Prefer child-friendly, natural English voices
            const preferred = [
                'Google US English',
                'Google UK English Female',
                'Samantha',
                'Microsoft Jenny Online (Natural)',
                'Microsoft Aria Online (Natural)',
                'en-US',
                'en-GB'
            ];
            for (const name of preferred) {
                const found = voices.find(v => v.name.includes(name) || v.lang.startsWith(name));
                if (found) {
                    this.selectedVoice = found;
                    break;
                }
            }
            if (!this.selectedVoice && voices.length > 0) {
                this.selectedVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
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

        // Joyful chord fanfare
        const chord = [
            { f: 523.25, t: 0 },    // C5
            { f: 659.25, t: 0.09 }, // E5
            { f: 783.99, t: 0.18 }, // G5
            { f: 1046.50, t: 0.27 },// C6
            { f: 1318.51, t: 0.38 } // E6
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

    speak(text, { pitch = 1.08, rate = 0.88, onEnd = null } = {}) {
        if (!this.speechEnabled || !('speechSynthesis' in window)) {
            if (onEnd) onEnd();
            return;
        }

        window.speechSynthesis.cancel(); // Cancel any ongoing speech
        const utterance = new SpeechSynthesisUtterance(text);
        if (this.selectedVoice) {
            utterance.voice = this.selectedVoice;
        }
        utterance.pitch = pitch;
        utterance.rate = rate;
        utterance.lang = 'en-US';

        if (onEnd) {
            utterance.onend = onEnd;
            utterance.onerror = onEnd;
        }

        window.speechSynthesis.speak(utterance);
    }

    speakLetter(letterObj, isLower = false) {
        this.playPop();
        const name = isLower ? letterObj.lower : letterObj.char;
        const text = `${name}. ${name} is for ${letterObj.word}!`;
        this.speak(text);
    }

    speakPhonics(letterObj) {
        const text = `${letterObj.char}. The letter ${letterObj.char} makes the sound ${letterObj.phonetic}. ${letterObj.phonetic}, ${letterObj.phonetic}, ${letterObj.word}!`;
        this.speak(text);
    }

    speakPraise() {
        const praises = [
            "Awesome job!",
            "Superstar!",
            "You did it!",
            "Wonderful tracing!",
            "High five!",
            "Fantastic work!",
            "You are so smart!"
        ];
        const randomPraise = praises[Math.floor(Math.random() * praises.length)];
        this.speak(randomPraise);
    }
}

window.kidsAudio = new KidsAudioEngine();
