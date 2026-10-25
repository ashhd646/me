import React, { useState, useEffect, useRef } from 'react';
import {
  Gift,
  Heart,
  Clock,
  Calendar,
  X,
  PartyPopper,
  Flame,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BirthdayData } from '../types';
import { romanticAudio } from '../utils/audio';

interface BirthdayCountdownProps {
  birthdayData: BirthdayData;
  // 'hanger' (hanging tag at circle photo's right corner), 'header' (compact pill), or 'floating'
  variant?: 'hanger' | 'header' | 'floating';
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isEnded: boolean;
}

export const BirthdayCountdown: React.FC<BirthdayCountdownProps> = ({
  birthdayData,
  variant = 'hanger'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [candleLit, setCandleLit] = useState(true);
  const [hasTriggeredAutoEnd, setHasTriggeredAutoEnd] = useState(false);

  // Compute target Date: 27th October at 00:00:00
  const getTargetDate = (): Date => {
    if (birthdayData.targetDate) {
      const parsed = new Date(birthdayData.targetDate);
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }
    }
    // Fallback dynamically to 27th October of current year
    const now = new Date();
    const year = now.getFullYear();
    return new Date(year, 9, 27, 0, 0, 0); // Month 9 is October
  };

  const calculateTimeRemaining = (): TimeRemaining => {
    const target = getTargetDate();
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalMs: 0,
        isEnded: true
      };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {
      days,
      hours,
      minutes,
      seconds,
      totalMs: diff,
      isEnded: false
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(calculateTimeRemaining);
  const prevEndedRef = useRef(timeLeft.isEnded);

  const fireConfetti = () => {
    try {
      // Left cannon
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { x: 0.15, y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#f59e0b', '#fb7185', '#a855f7']
      });
      // Right cannon
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { x: 0.85, y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#f59e0b', '#fb7185', '#a855f7']
      });
      // Center star burst
      setTimeout(() => {
        confetti({
          particleCount: 60,
          spread: 100,
          origin: { y: 0.4 },
          shapes: ['circle'],
          colors: ['#fbbf24', '#f43f5e', '#ffffff']
        });
      }, 250);
    } catch {
      // ignore
    }
  };

  // Trigger celebration effects
  const triggerCelebration = () => {
    fireConfetti();
    try {
      romanticAudio.playBirthdayChime();
    } catch {
      // ignore
    }
  };

  // 1. Automatic show message upon mount ONLY IF countdown has reached 0 (ended)
  useEffect(() => {
    const AUTO_KEY = 'aashman_bday_modal_auto_shown';
    if (timeLeft.isEnded && !sessionStorage.getItem(AUTO_KEY)) {
      try {
        sessionStorage.setItem(AUTO_KEY, 'true');
      } catch {
        // ignore
      }
      setIsOpen(true);
      triggerCelebration();
    }
  }, [timeLeft.isEnded]);

  // 2. Ticking interval & auto-trigger when countdown reaches 0:00:00 in real-time
  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeRemaining();
      setTimeLeft(updated);

      // Detect the exact second when countdown reaches 0 (turns off)
      if (updated.isEnded && !prevEndedRef.current && !hasTriggeredAutoEnd) {
        prevEndedRef.current = true;
        setHasTriggeredAutoEnd(true);
        setIsOpen(true);
        triggerCelebration();
        try {
          sessionStorage.setItem('aashman_bday_modal_auto_shown', 'true');
        } catch {
          // ignore
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [hasTriggeredAutoEnd]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleCardClick = () => {
    setIsOpen(true);
    if (timeLeft.isEnded) {
      triggerCelebration();
    }
  };

  // Message is only revealed when countdown is ended (turned off)
  const isCelebrationState = timeLeft.isEnded;

  // Format two digits
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <>
      {/* =========================================================================
          VARIANT 1: HANGER TYPE BOX (Circle Photo's Right-Side Corner)
          ========================================================================= */}
      {variant === 'hanger' ? (
        <div className="relative flex flex-col items-center select-none z-30">
          {/* Top Anchor Pin & Ribbon Bow on the circle's corner */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Metallic Golden Ring / Pin */}
            <div className="w-5 h-5 rounded-full border-2 border-amber-300 bg-gradient-to-tr from-amber-400 to-amber-200 shadow-md flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white shadow-inner" />
            </div>

            {/* Cute Silk Ribbon Bow */}
            <div className="absolute -top-1.5 -right-2 text-rose-500 text-sm select-none animate-pulse-subtle pointer-events-none">
              🎀
            </div>

            {/* Suspended Twisted Cord / Ribbon */}
            <div className="w-[2px] h-5 sm:h-7 bg-gradient-to-b from-amber-400 via-rose-300 to-rose-400 shadow-sm" />
          </div>

          {/* The Swinging Hanger Card / Box */}
          <div
            className="animate-hanger-sway origin-top -mt-0.5"
            style={{ transformOrigin: 'top center' }}
          >
            {/* Tag Eyelet Hole at the top of the box */}
            <div className="w-3 h-3 rounded-full bg-stone-100 border-2 border-rose-300/80 shadow-inner mx-auto -mb-1.5 z-10 relative flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-stone-400/50" />
            </div>

            {/* The Beautiful Birthday Box */}
            <div
              onClick={handleCardClick}
              role="button"
              tabIndex={0}
              aria-label="Mansii's Birthday Countdown Box"
              title={
                isCelebrationState
                  ? "🎉 Happy Birthday Mansii! Tap to read special message"
                  : `Birthday Countdown: ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s remaining (Locked until 27 Oct)`
              }
              className={`w-40 sm:w-48 md:w-52 rounded-2xl p-2.5 sm:p-3 text-center transition-all cursor-pointer shadow-xl backdrop-blur-md relative overflow-hidden group select-none ${
                isCelebrationState
                  ? 'bg-gradient-to-b from-rose-500 via-pink-500 to-amber-500 text-white shadow-rose-500/30 border-2 border-amber-300 animate-pulse'
                  : 'bg-white/95 hover:bg-white text-stone-800 border-2 border-rose-200/90 hover:border-rose-400 shadow-rose-950/10 hover:shadow-rose-500/25 hover:scale-[1.02]'
              }`}
            >
              {isCelebrationState ? (
                /* Celebration State: Revealed only after countdown ends */
                <div className="py-1 flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center gap-1.5">
                    <PartyPopper className="w-4 h-4 text-amber-200 animate-bounce" />
                    <span className="text-xs sm:text-sm font-bold text-white tracking-tight leading-tight">
                      Happy Birthday! 🎂
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-rose-100 font-medium">
                    {birthdayData.personName} ka khaas sandesh ✨
                  </p>
                  <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-rose-600 text-[10px] sm:text-[11px] font-bold shadow-sm group-hover:scale-105 transition-transform">
                    <span>💌 Read Message</span>
                  </div>
                </div>
              ) : (
                /* Active Reverse Countdown State (Locked until 27 Oct) */
                <>
                  {/* Top Badge: Gift Icon + Person Name + Date */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="relative flex items-center justify-center">
                        <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 group-hover:scale-110 transition-transform" />
                        <span className="absolute -top-1 -right-1 flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
                        </span>
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold text-rose-600 tracking-tight">
                        {birthdayData.personName}'s B'day
                      </span>
                    </div>
                    <span className="text-[10px] text-rose-400 font-semibold bg-rose-50 px-1.5 py-0.5 rounded-full border border-rose-100">
                      27 Oct
                    </span>
                  </div>

                  {/* 4-Box Reverse Countdown Digits Grid */}
                  <div className="grid grid-cols-4 gap-1 sm:gap-1.5 mb-2">
                    {/* Days */}
                    <div className="bg-rose-50/80 group-hover:bg-rose-50 rounded-lg py-1 px-0.5 border border-rose-200/70 flex flex-col items-center">
                      <span className="text-xs sm:text-sm font-bold font-serif-romantic text-rose-700 tabular-nums leading-none">
                        {timeLeft.days}
                      </span>
                      <span className="text-[8px] sm:text-[9px] text-stone-500 uppercase tracking-tighter mt-0.5 leading-none font-medium">
                        Days
                      </span>
                    </div>

                    {/* Hours */}
                    <div className="bg-rose-50/80 group-hover:bg-rose-50 rounded-lg py-1 px-0.5 border border-rose-200/70 flex flex-col items-center">
                      <span className="text-xs sm:text-sm font-bold font-serif-romantic text-rose-700 tabular-nums leading-none">
                        {pad(timeLeft.hours)}
                      </span>
                      <span className="text-[8px] sm:text-[9px] text-stone-500 uppercase tracking-tighter mt-0.5 leading-none font-medium">
                        Hours
                      </span>
                    </div>

                    {/* Minutes */}
                    <div className="bg-rose-50/80 group-hover:bg-rose-50 rounded-lg py-1 px-0.5 border border-rose-200/70 flex flex-col items-center">
                      <span className="text-xs sm:text-sm font-bold font-serif-romantic text-rose-700 tabular-nums leading-none">
                        {pad(timeLeft.minutes)}
                      </span>
                      <span className="text-[8px] sm:text-[9px] text-stone-500 uppercase tracking-tighter mt-0.5 leading-none font-medium">
                        Mins
                      </span>
                    </div>

                    {/* Seconds (live pulsing) */}
                    <div className="bg-rose-50/80 group-hover:bg-rose-50 rounded-lg py-1 px-0.5 border border-rose-200/70 flex flex-col items-center">
                      <span className="text-xs sm:text-sm font-bold font-serif-romantic text-rose-700 tabular-nums leading-none animate-pulse">
                        {pad(timeLeft.seconds)}
                      </span>
                      <span className="text-[8px] sm:text-[9px] text-stone-500 uppercase tracking-tighter mt-0.5 leading-none font-medium">
                        Secs
                      </span>
                    </div>
                  </div>

                  {/* Bottom locked status badge */}
                  <div className="pt-1.5 border-t border-rose-100 flex items-center justify-center gap-1 text-[10px] sm:text-[11px] text-rose-500 font-semibold">
                    <Clock className="w-3 h-3 text-rose-400" />
                    <span>Unlocks on 27 Oct 🔒</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================================
            VARIANT 2: COMPACT PILL (For Password Gate Floating)
            ========================================================================= */
        <div
          className={`relative inline-flex items-center ${
            variant === 'floating' ? 'fixed top-3 right-3 sm:top-4 sm:right-4 z-50' : ''
          }`}
        >
          <button
            type="button"
            onClick={handleCardClick}
            aria-label="Birthday countdown"
            className={`group relative min-h-[42px] px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer shadow-sm select-none ${
              isCelebrationState
                ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white shadow-rose-500/30 hover:scale-105 animate-pulse'
                : 'bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 text-stone-700 hover:text-rose-600 border border-rose-200/90 hover:border-rose-300'
            }`}
          >
            {isCelebrationState ? (
              <>
                <PartyPopper className="w-4 h-4 text-amber-200 animate-bounce" />
                <span className="font-bold tracking-tight">
                  Happy Birthday Mansii! 🎂
                </span>
              </>
            ) : (
              <>
                <Gift className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
                <span className="text-rose-600/90 font-medium">
                  {birthdayData.personName}'s B'day:
                </span>
                <span className="font-mono font-bold text-rose-700 bg-white/90 px-1.5 py-0.5 rounded-md border border-rose-200 text-[11px] tabular-nums">
                  {timeLeft.days}d {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s
                </span>
              </>
            )}
          </button>
        </div>
      )}

      {/* =========================================================================
          BIRTHDAY MODAL: COUNTDOWN STATUS (LOCKED) OR REVEALED MESSAGE (AFTER END)
          ========================================================================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in select-none"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div
            className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-gradient-to-b from-white via-rose-50/30 to-pink-50/40 rounded-3xl p-5 sm:p-7 border border-rose-200 shadow-2xl shadow-rose-950/20 text-stone-800"
            style={{
              animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-rose-100 text-stone-400 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer z-20"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* -------------------------------------------------------------------
                STATE A: SURPRISE MESSAGE REVEALED (ONLY WHEN COUNTDOWN ENDS)
                ------------------------------------------------------------------- */}
            {isCelebrationState ? (
              <div className="text-center pt-2">
                {/* Animated Birthday Cake Icon with Clickable Candle */}
                <div className="relative inline-block mb-3">
                  <div className="relative w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-300 p-1 shadow-lg shadow-rose-500/30 flex items-center justify-center">
                    <div className="w-full h-full rounded-[22px] bg-white flex flex-col items-center justify-center relative overflow-hidden">
                      <button
                        type="button"
                        onClick={() => {
                          setCandleLit(!candleLit);
                          if (!candleLit) fireConfetti();
                        }}
                        title={candleLit ? "Tap candle to blow out!" : "Tap to light candle!"}
                        className="cursor-pointer focus:outline-none flex flex-col items-center"
                      >
                        {candleLit ? (
                          <div className="flex flex-col items-center -mt-1">
                            <Flame className="w-6 h-6 text-amber-500 fill-amber-400 animate-bounce" />
                            <div className="w-1.5 h-3 bg-amber-200 rounded-sm -mt-0.5" />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center -mt-1">
                            <span className="text-[10px] text-stone-400">💨 (blown)</span>
                            <div className="w-1.5 h-3 bg-stone-300 rounded-sm" />
                          </div>
                        )}
                        <span className="text-2xl mt-0.5">🎂</span>
                      </button>
                    </div>
                  </div>
                  <Heart className="absolute -bottom-1 -left-2 w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-serif-romantic font-bold text-stone-900 tracking-tight">
                  {birthdayData.title}
                </h2>
                <p className="text-xs sm:text-sm text-rose-600 font-medium mt-1 flex items-center justify-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span>{birthdayData.nickname} · 27th October</span>
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                </p>

                {/* Heartfelt Birthday Message Box */}
                <div className="mt-5 text-left bg-white/95 rounded-2xl p-5 sm:p-6 border border-rose-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300" />

                  <div className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal space-y-3">
                    {birthdayData.revealedMessage}
                  </div>

                  {birthdayData.signature && (
                    <div className="mt-5 pt-3 border-t border-rose-100/80 flex items-center justify-end">
                      <p className="font-handwriting text-rose-600 text-base sm:text-lg">
                        {birthdayData.signature}
                      </p>
                    </div>
                  )}
                </div>

                {/* Celebratory Action Buttons */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={triggerCelebration}
                    className="min-h-[42px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <PartyPopper className="w-4 h-4 text-amber-200" />
                    <span>Celebrate Again 🎊</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => romanticAudio.toggleSong()}
                    className="min-h-[42px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Play Song 🎵</span>
                  </button>
                </div>
              </div>
            ) : (
              /* -------------------------------------------------------------------
                  STATE B: COUNTDOWN TICKING (LOCKED UNTIL 27 OCT)
                  ------------------------------------------------------------------- */
              <div className="text-center pt-2">
                {/* Header Icon */}
                <div className="relative inline-block mb-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-tr from-rose-500 to-pink-400 p-1 shadow-lg shadow-rose-500/20 flex items-center justify-center">
                    <div className="w-full h-full rounded-[22px] bg-white flex items-center justify-center">
                      <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-rose-500" />
                    </div>
                  </div>
                </div>

                {/* Subtitle & Title */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/70 text-rose-600 text-xs font-semibold tracking-wide uppercase mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>27th October Special Day</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif-romantic font-bold text-stone-900 tracking-tight">
                  {birthdayData.personName}'s Birthday Countdown 🎂
                </h2>

                <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-sm mx-auto leading-relaxed">
                  Counting down every precious second until meri babe ka sabse khaas din shuru hota hai! ✨
                </p>

                {/* 4-Box Reverse Countdown Grid */}
                <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto">
                  {/* Days */}
                  <div className="bg-white rounded-2xl p-3 sm:p-4 border border-rose-200/80 shadow-sm flex flex-col items-center justify-center">
                    <span className="text-2xl sm:text-3xl font-bold font-serif-romantic text-rose-600 tabular-nums">
                      {timeLeft.days}
                    </span>
                    <span className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider font-medium mt-1">
                      Days
                    </span>
                  </div>

                  {/* Hours */}
                  <div className="bg-white rounded-2xl p-3 sm:p-4 border border-rose-200/80 shadow-sm flex flex-col items-center justify-center">
                    <span className="text-2xl sm:text-3xl font-bold font-serif-romantic text-rose-600 tabular-nums">
                      {pad(timeLeft.hours)}
                    </span>
                    <span className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider font-medium mt-1">
                      Hours
                    </span>
                  </div>

                  {/* Minutes */}
                  <div className="bg-white rounded-2xl p-3 sm:p-4 border border-rose-200/80 shadow-sm flex flex-col items-center justify-center">
                    <span className="text-2xl sm:text-3xl font-bold font-serif-romantic text-rose-600 tabular-nums">
                      {pad(timeLeft.minutes)}
                    </span>
                    <span className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider font-medium mt-1">
                      Mins
                    </span>
                  </div>

                  {/* Seconds */}
                  <div className="bg-white rounded-2xl p-3 sm:p-4 border border-rose-200/80 shadow-sm flex flex-col items-center justify-center">
                    <span className="text-2xl sm:text-3xl font-bold font-serif-romantic text-rose-600 tabular-nums animate-pulse">
                      {pad(timeLeft.seconds)}
                    </span>
                    <span className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider font-medium mt-1">
                      Secs
                    </span>
                  </div>
                </div>

                {/* Strictly Locked Notice */}
                <div className="mt-6 p-4 rounded-2xl bg-rose-50/70 border border-rose-100 flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-white text-rose-500 flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-stone-800">
                      Surprise Birthday Message Locked 🔒
                    </h4>
                    <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5 leading-relaxed">
                      27 October ko jaise hi countdown 00:00:00 par khatam hoga, special romantic birthday letter automatically reveal ho jayega! Tab tak yeh surprise locked rahega. ❤️
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
