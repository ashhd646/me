import React from 'react';
import { Mail, Heart } from 'lucide-react';
import { ProfileData } from '../types';

interface LoveLetterCardProps {
  profile: ProfileData;
}

export const LoveLetterCard: React.FC<LoveLetterCardProps> = ({ profile }) => {
  return (
    <section id="letter-section" className="py-8 px-4 sm:px-6 relative">
      <div className="max-w-3xl mx-auto">
        {/* Envelope/Letter Card Container */}
        <div className="relative bg-gradient-to-b from-amber-50/70 via-rose-50/40 to-white rounded-3xl p-6 sm:p-10 border border-rose-200/80 shadow-xl shadow-rose-950/5 overflow-hidden">
          {/* Decorative stamp at top-right */}
          <div className="absolute top-5 right-5 sm:top-6 sm:right-6 flex flex-col items-center">
            <div className="w-12 h-14 border-2 border-dashed border-rose-300 rounded-md p-1 flex flex-col items-center justify-center bg-white/70 rotate-3 shadow-xs">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span className="text-[9px] font-bold text-rose-400 mt-1 uppercase">Love</span>
            </div>
          </div>

          {/* Letter Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-rose-500">
                A Letter Just For You
              </span>
              <h3 className="text-xl sm:text-2xl font-serif-romantic font-bold text-stone-900">
                Dil Se Likha Ek Khaas Sandesh
              </h3>
            </div>
          </div>

          {/* Read-Only Romantic Letter Body */}
          <div className="my-6">
            <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-stone-700 font-serif-romantic tracking-wide space-y-4">
              {profile.loveLetter}
            </div>

            {/* Signature */}
            <div className="mt-8 pt-6 border-t border-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-stone-400 block">Written with love,</span>
                <span className="font-handwriting text-2xl sm:text-3xl font-semibold text-rose-600">
                  {profile.signature}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
