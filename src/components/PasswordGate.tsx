import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Lock, KeyRound, Sparkles, Eye, EyeOff } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface PasswordGateProps {
  onUnlock: () => void;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = password.trim().toLowerCase();

    if (cleanInput === 'i love you') {
      setIsSubmitting(true);
      setErrorMsg('');

      // Play soft chime audio
      try {
        romanticAudio.playTone(523.25, 0.8); // C5
        setTimeout(() => romanticAudio.playTone(659.25, 1.2), 150); // E5
        setTimeout(() => romanticAudio.playTone(783.99, 1.8), 300); // G5
      } catch {
        // audio context handling
      }

      // Confetti burst
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#e11d48']
      });

      setTimeout(() => {
        onUnlock();
      }, 700);
    } else {
      setIsShaking(true);
      setErrorMsg('Incorrect password');
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-rose-100/60 via-stone-50 to-rose-50/80">
      {/* Background ambient decorative circles */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />

      <div
        className={`relative w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xl shadow-rose-950/5 transition-transform duration-200 ${
          isShaking ? 'translate-x-[-8px]' : ''
        }`}
      >
        {/* Heart Lock Icon */}
        <div className="flex justify-center -mt-14 mb-4">
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 p-1 shadow-lg shadow-rose-500/30 flex items-center justify-center animate-pulse-subtle">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <Heart className="w-10 h-10 text-rose-500 fill-rose-500" />
            </div>
            <div className="absolute bottom-0 right-0 w-7 h-7 bg-rose-600 rounded-full flex items-center justify-center shadow-md">
              <Lock className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
        </div>

        {/* Title & Romantic Subtitle */}
        <div className="text-center mb-6">
          <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase">
            Only For You
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif-romantic font-bold text-stone-900 mt-1">
            MY BABE ❤️
          </h1>
          <p className="text-sm text-stone-500 mt-2 max-w-xs mx-auto leading-relaxed">
            Enter the secret password to open
          </p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1.5 ml-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <KeyRound className="h-4 w-4 text-stone-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Enter password..."
                autoFocus
                className="w-full pl-10 pr-11 py-3 text-sm bg-rose-50/50 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400/40 focus:border-rose-400 transition-all text-stone-800 placeholder:text-stone-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-600 mt-2 font-medium ml-1">
                {errorMsg}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !password.trim()}
            className="w-full py-3 px-4 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-md shadow-rose-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-white" />
                <span>Unlocking...</span>
              </>
            ) : (
              <>
                <span>Enter</span>
                <Heart className="w-4 h-4 fill-white text-white" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
