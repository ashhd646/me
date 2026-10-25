import React, { useState, useEffect } from 'react';
import { Heart, Volume2, Music, Lock } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface HeaderProps {
  onLock: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLock }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(romanticAudio.isPlaying());

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggleSong = () => {
    romanticAudio.toggleSong();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-rose-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark */}
        <a
          href="#"
          className="flex items-center gap-2 text-rose-600 font-serif-romantic font-bold text-lg sm:text-xl tracking-tight whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
          <span>#Aashman</span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-stone-600">
          <a href="#profile-section" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
            Profile
          </a>
          <a href="#letter-section" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
            Khaas Sandesh
          </a>
          <a href="#reasons-section" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
            Why I Love You
          </a>
        </nav>

        {/* Zone 3: Actions (Play Song & Lock) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Song Player Toggle */}
          <button
            type="button"
            onClick={handleToggleSong}
            title={isPlaying ? "Pause song" : "Play romantic song (Janam Janam)"}
            className={`min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              isPlaying
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 border border-rose-400'
                : 'bg-stone-100 text-stone-700 hover:bg-rose-50 hover:text-rose-600 border border-stone-200'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-4 h-4 animate-pulse text-white" />
                <span>Song Playing</span>
                <span className="flex gap-0.5 items-end h-3">
                  <span className="w-0.5 h-3 bg-white animate-pulse" />
                  <span className="w-0.5 h-2 bg-white animate-pulse delay-75" />
                  <span className="w-0.5 h-2.5 bg-white animate-pulse delay-150" />
                </span>
              </>
            ) : (
              <>
                <Music className="w-4 h-4 text-rose-500" />
                <span>Play Song</span>
              </>
            )}
          </button>

          {/* Lock Screen Button */}
          <button
            type="button"
            onClick={onLock}
            title="Lock screen again"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            aria-label="Lock screen"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
