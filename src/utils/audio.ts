import janamJanamSong from '../assets/images/Janam Janam - Dilwale (128 kbps).mp3';

/**
 * Romantic Audio Player:
 * - Plays the romantic song ("Janam Janam" from src/assets/images)
 * - Also provides soft micro-interaction chime tones
 */

class RomanticAudioPlayer {
  private songAudio: HTMLAudioElement | null = null;
  private isSongPlaying: boolean = false;
  private audioCtx: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private listeners: Set<(playing: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.songAudio = new Audio(janamJanamSong);
        this.songAudio.loop = true;
        this.songAudio.volume = 0.75;
        this.songAudio.preload = 'auto';

        this.songAudio.addEventListener('play', () => {
          this.isSongPlaying = true;
          this.notify();
        });

        this.songAudio.addEventListener('pause', () => {
          this.isSongPlaying = false;
          this.notify();
        });

        this.songAudio.addEventListener('ended', () => {
          this.isSongPlaying = false;
          this.notify();
        });

        this.songAudio.addEventListener('error', () => {
          if (this.songAudio && !this.songAudio.src.endsWith('/audio/janam_janam.mp3')) {
            this.songAudio.src = '/audio/janam_janam.mp3';
          }
        });
      } catch {
        // audio element setup error handling
      }
    }
  }

  public subscribe(listener: (playing: boolean) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isSongPlaying));
  }

  // Play micro chime tone using Web Audio API for interactive taps
  public playTone(freq: number, duration: number = 1.2) {
    if (typeof window === 'undefined') return;
    try {
      if (!this.audioCtx) {
        const AudioCtxClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.audioCtx = new AudioCtxClass();
        this.gainNode = this.audioCtx.createGain();
        this.gainNode.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
        this.gainNode.connect(this.audioCtx.destination);
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const noteGain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      const now = this.audioCtx.currentTime;
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.15, now + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode!);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // ignore
    }
  }

  // Play cheerful birthday celebration arpeggio
  public playBirthdayChime(): void {
    if (typeof window === 'undefined') return;
    try {
      const melody = [
        { freq: 523.25, delay: 0 },    // C5
        { freq: 587.33, delay: 150 },  // D5
        { freq: 659.25, delay: 300 },  // E5
        { freq: 783.99, delay: 450 },  // G5
        { freq: 880.00, delay: 600 },  // A5
        { freq: 1046.50, delay: 780 }, // C6
      ];
      melody.forEach((note) => {
        setTimeout(() => {
          this.playTone(note.freq, 0.7);
        }, note.delay);
      });
    } catch {
      // ignore
    }
  }

  // Toggle Song playback
  public toggleSong(): boolean {
    if (!this.songAudio) return false;

    if (this.isSongPlaying) {
      this.songAudio.pause();
      this.isSongPlaying = false;
      this.notify();
      return false;
    } else {
      const playPromise = this.songAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isSongPlaying = true;
            this.notify();
          })
          .catch(() => {
            // User interaction policy fallback
            this.isSongPlaying = false;
            this.notify();
          });
      }
      return true;
    }
  }

  public playSong(): void {
    if (this.songAudio && !this.isSongPlaying) {
      this.songAudio.play().catch(() => {});
    }
  }

  public pauseSong(): void {
    if (this.songAudio && this.isSongPlaying) {
      this.songAudio.pause();
    }
  }

  public isPlaying(): boolean {
    return this.isSongPlaying;
  }
}

export const romanticAudio = new RomanticAudioPlayer();
