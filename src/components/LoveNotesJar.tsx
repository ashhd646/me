import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DEFAULT_LOVE_REASONS } from '../data/initialData';
import { LoveReason } from '../types';

export const LoveNotesJar: React.FC = () => {
  const [reasons] = useState<LoveReason[]>(DEFAULT_LOVE_REASONS);
  const [revealedIds, setRevealedIds] = useState<string[]>([DEFAULT_LOVE_REASONS[0].id]);

  const handleReveal = (id: string) => {
    if (!revealedIds.includes(id)) {
      setRevealedIds(prev => [...prev, id]);
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#fda4af', '#f43f5e']
      });
    }
  };

  const handleRevealAll = () => {
    setRevealedIds(reasons.map(r => r.id));
    confetti({
      particleCount: 60,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fbbf24']
    });
  };

  return (
    <section id="reasons-section" className="py-12 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold tracking-wider uppercase text-rose-500">
            A Little Surprise For You
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif-romantic font-bold text-stone-900 mt-1">
            Kyu Tum Meri Duniya Ho?
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Card par tap karke padhein ki aap mere liye itni khaas kyu hain
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {reasons.map((reason, index) => {
            const isRevealed = revealedIds.includes(reason.id);

            return (
              <div
                key={reason.id}
                onClick={() => handleReveal(reason.id)}
                className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[160px] ${
                  isRevealed
                    ? 'bg-white border-rose-200 shadow-md shadow-rose-950/5'
                    : 'bg-rose-50/70 hover:bg-rose-100/60 border-rose-200/60 shadow-xs'
                }`}
              >
                {isRevealed ? (
                  <>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl">{reason.emoji}</span>
                        <span className="text-[11px] font-semibold text-rose-400">
                          Reason #{index + 1}
                        </span>
                      </div>
                      <h4 className="font-serif-romantic font-bold text-sm text-stone-900 mb-1.5">
                        {reason.title}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed font-sans">
                        {reason.text}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-rose-50 flex items-center justify-end">
                      <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-6">
                    <div className="w-10 h-10 rounded-full bg-rose-200/60 flex items-center justify-center text-rose-500 mb-2">
                      <Heart className="w-5 h-5 fill-rose-400 text-rose-400" />
                    </div>
                    <span className="font-serif-romantic font-semibold text-stone-800 text-sm">
                      Khaas Baat #{index + 1}
                    </span>
                    <span className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                      <Sparkles className="w-3 h-3" />
                      <span>Tap to reveal</span>
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Reveal all trigger */}
        {revealedIds.length < reasons.length && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={handleRevealAll}
              className="text-xs text-rose-600 hover:text-rose-700 font-medium underline"
            >
              Reveal All Sweet Notes ✨
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
