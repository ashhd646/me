import React, { useState, useEffect, useRef } from 'react';
import { Heart, Calendar, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProfileData } from '../types';
import { romanticAudio } from '../utils/audio';
import { BirthdayCountdown } from './BirthdayCountdown';
import { DEFAULT_BIRTHDAY } from '../data/initialData';

interface HeroProfileProps {
  profile: ProfileData;
}

export const HeroProfile: React.FC<HeroProfileProps> = ({ profile }) => {
  // State to toggle between primary and secondary photo on click
  const [isAltPhoto, setIsAltPhoto] = useState(false);
  const autoFlipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Time together calculation based purely on anniversaryDate from code
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(profile.anniversaryDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [profile.anniversaryDate]);

  // Clean up auto-flip timer on unmount
  useEffect(() => {
    return () => {
      if (autoFlipTimerRef.current) {
        clearTimeout(autoFlipTimerRef.current);
      }
    };
  }, []);

  const handleTogglePhoto = () => {
    // Clear any pending auto-flip timer
    if (autoFlipTimerRef.current) {
      clearTimeout(autoFlipTimerRef.current);
      autoFlipTimerRef.current = null;
    }

    // If currently flipped to the second photo, clicking again immediately flips back
    if (isAltPhoto) {
      setIsAltPhoto(false);
      return;
    }

    // Flip to second photo
    setIsAltPhoto(true);

    // Play sweet chime note
    try {
      romanticAudio.playTone(659.25, 0.6);
    } catch {
      // ignore
    }

    // Mini heart sparkle burst
    confetti({
      particleCount: 18,
      spread: 45,
      origin: { y: 0.3 },
      colors: ['#f43f5e', '#fda4af', '#fbcfe8']
    });

    // Auto flip back to initial photo after 500ms
    autoFlipTimerRef.current = setTimeout(() => {
      setIsAltPhoto(false);
      autoFlipTimerRef.current = null;
    }, 500);
  };

  const secondaryPhoto = profile.secondaryAvatarUrl || profile.avatarUrl;

  return (
    <section id="profile-section" className="pt-8 pb-12 px-4 sm:px-6 relative text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Avatar & Hanging Birthday Countdown Container */}
        <div className="relative inline-flex items-center justify-center select-none">
          {/* Clickable Circle Image Wrapper with Romantic Glow & 3D Perspective */}
          <div
            className="relative z-10 group cursor-pointer select-none"
            onClick={handleTogglePhoto}
            title="Surprise photo dekhne ke liye tap karein ✨"
            style={{ perspective: '1000px' }}
          >
            {/* Subtle animated halo */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-rose-400 via-pink-400 to-rose-300 blur-md opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* 3D Flippable Circular Container */}
            <div
              className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full group-hover:scale-[1.02]"
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isAltPhoto ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* FRONT FACE: Primary Photo */}
              <div
                className="absolute inset-0 w-full h-full rounded-full p-1.5 bg-gradient-to-tr from-rose-500 via-pink-300 to-amber-200 shadow-xl shadow-rose-950/10"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-rose-100 relative">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Fallback initials if image fails */}
                  <div className="absolute inset-0 flex items-center justify-center bg-rose-200 text-rose-600 font-serif-romantic text-4xl font-bold -z-10">
                    {profile.name.charAt(0)}
                  </div>
                </div>

                {/* Sparkle decorative badge */}
                <div className="absolute bottom-2 right-2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-rose-500 text-white shadow-lg flex items-center justify-center border-2 border-white animate-float-slow">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white" />
                </div>
              </div>

              {/* BACK FACE: Second Photo */}
              <div
                className="absolute inset-0 w-full h-full rounded-full p-1.5 bg-gradient-to-tr from-pink-500 via-rose-300 to-amber-200 shadow-xl shadow-rose-950/10"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-rose-100 relative">
                  <img
                    src={secondaryPhoto}
                    alt={`${profile.name} surprise`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Fallback heart icon if image fails */}
                  <div className="absolute inset-0 flex items-center justify-center bg-pink-200 text-pink-600 font-serif-romantic text-4xl font-bold -z-10">
                    <Heart className="w-10 h-10 fill-rose-500 text-rose-500 animate-pulse" />
                  </div>
                </div>

                {/* Heart decorative badge on flipped side */}
                <div className="absolute bottom-2 right-2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-pink-600 text-white shadow-lg flex items-center justify-center border-2 border-white">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Birthday Countdown Hanger - Placed behind circle photo on mobile (z-0), beside photo on desktop (md:z-20) */}
          <div
            className="absolute -top-3 -right-3 sm:-right-4 md:left-[102%] md:right-auto md:top-2 z-0 md:z-20 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <BirthdayCountdown birthdayData={DEFAULT_BIRTHDAY} variant="hanger" />
          </div>
        </div>

        {/* Her Name (Directly underneath the circle) */}
        <div className="mt-5 w-full max-w-md">
          <div className="inline-block">
            <h2 className="text-3xl sm:text-4xl font-serif-romantic font-bold text-stone-900 tracking-tight">
              {profile.name}
            </h2>

            {profile.nickname && (
              <p className="text-rose-600 font-medium text-sm mt-1 flex items-center justify-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>{profile.nickname}</span>
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              </p>
            )}

            {profile.tagline && (
              <p className="text-stone-500 text-xs sm:text-sm mt-1.5 max-w-md mx-auto leading-relaxed">
                {profile.tagline}
              </p>
            )}
          </div>
        </div>

        {/* Days Together Counter */}
        <div className="mt-8 w-full max-w-lg bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-rose-100 shadow-sm">
          <div className="flex items-center justify-center text-xs text-stone-500 mb-3 px-1">
            <span className="font-medium text-rose-600 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Hamare Pyar Ka Safar</span>
            </span>
          </div>

          {/* Time digits grid */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-rose-50/60 rounded-xl py-2 px-1">
              <span className="block text-xl sm:text-2xl font-bold font-serif-romantic text-rose-600 tabular-nums">
                {timeTogether.days}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider">Days</span>
            </div>
            <div className="bg-rose-50/60 rounded-xl py-2 px-1">
              <span className="block text-xl sm:text-2xl font-bold font-serif-romantic text-rose-600 tabular-nums">
                {timeTogether.hours}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider">Hours</span>
            </div>
            <div className="bg-rose-50/60 rounded-xl py-2 px-1">
              <span className="block text-xl sm:text-2xl font-bold font-serif-romantic text-rose-600 tabular-nums">
                {timeTogether.minutes}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider">Mins</span>
            </div>
            <div className="bg-rose-50/60 rounded-xl py-2 px-1">
              <span className="block text-xl sm:text-2xl font-bold font-serif-romantic text-rose-600 tabular-nums">
                {timeTogether.seconds}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider">Secs</span>
            </div>
          </div>
          <p className="text-[11px] text-stone-400 mt-2.5">
            Since {new Date(profile.anniversaryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · Every moment with you is precious
          </p>
        </div>
      </div>
    </section>
  );
};
