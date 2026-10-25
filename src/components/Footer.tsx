import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-rose-100 bg-white/70 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <div className="flex items-center gap-1.5 text-stone-600 font-medium">
          <span className="font-serif-romantic font-bold text-rose-600">#Aashman</span>
          <span>· Banaya gaya sirf tumhare liye</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline animate-pulse-subtle" />
          <span>with endless love</span>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium transition-colors"
        >
          <span>Top par jayein</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
