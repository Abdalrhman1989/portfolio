"use client";

// Simple Audio Engine using Web Audio API
class AudioEngine {
    private ctx: AudioContext | null = null;

    private init() {
        if (!this.ctx && typeof window !== "undefined") {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }

    private playTone(freq: number, type: OscillatorType, duration: number, volume: number) {
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    playMove() {
        this.playTone(440, "sine", 0.1, 0.1);
    }

    playCollision() {
        this.playTone(100, "sawtooth", 0.5, 0.2);
        this.playTone(50, "square", 0.3, 0.2);
    }

    playPowerUp() {
        this.playTone(880, "sine", 0.1, 0.1);
        setTimeout(() => this.playTone(1320, "sine", 0.1, 0.1), 50);
        setTimeout(() => this.playTone(1760, "sine", 0.2, 0.1), 100);
    }

    playLevelUp() {
        const freqs = [523.25, 659.25, 783.99, 1046.50];
        freqs.forEach((f, i) => {
            setTimeout(() => this.playTone(f, "triangle", 0.3, 0.1), i * 150);
        });
    }

    playStart() {
        this.playTone(261.63, "sine", 0.2, 0.1);
        setTimeout(() => this.playTone(392.00, "sine", 0.3, 0.1), 100);
    }
}

export const gameAudio = new AudioEngine();
