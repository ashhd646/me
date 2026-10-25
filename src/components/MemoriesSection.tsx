import React, { useState } from 'react';
import { Calendar, MapPin, Eye, Heart } from 'lucide-react';
import { Memory } from '../types';

interface MemoriesSectionProps {
  memories: Memory[];
}

export const MemoriesSection: React.FC<MemoriesSectionProps> = ({ memories }) => {
  // Lightbox / detail view
  const [activeMemory, setActiveMemory] = useState<Memory | null>(null);

  // Sort memories chronologically (latest to earliest)
  const sortedMemories = [...memories].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section id="memories-section" className="py-12 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center sm:text-left mb-8">
          <span className="text-xs font-semibold tracking-wider uppercase text-rose-500">
            Special Dates & Chapters
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif-romantic font-bold text-stone-900 mt-1">
            Hamari Yaadon Ka Safar
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Woh din aur lamhein jo hamare dil mein hamesha taaza rahenge
          </p>
        </div>

        {/* Empty state fallback */}
        {sortedMemories.length === 0 ? (
          <div className="bg-white/80 rounded-3xl p-10 text-center border border-rose-100 max-w-md mx-auto">
            <Heart className="w-12 h-12 text-rose-300 mx-auto mb-3 stroke-[1.5]" />
            <h3 className="font-serif-romantic font-bold text-stone-800 text-lg">
              Abhi koi yaad nahi jodi gayi
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Code mein memories add karein
            </p>
          </div>
        ) : (
          /* Responsive Card Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedMemories.map((mem) => {
              const formattedDate = new Date(mem.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <article
                  key={mem.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-rose-100 shadow-sm hover:shadow-xl hover:shadow-rose-950/5 transition-all duration-300 flex flex-col"
                >
                  {/* Photo with zoom affordance */}
                  <div
                    className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer"
                    onClick={() => setActiveMemory(mem)}
                  >
                    <img
                      src={mem.imageUrl}
                      alt={mem.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3.5">
                      <span className="text-white text-xs font-medium flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Photo</span>
                      </span>
                    </div>

                    {/* Clean date badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-rose-700 shadow-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-rose-500" />
                      <span>{formattedDate}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Quiet metadata line */}
                      <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
                        {mem.tag && (
                          <span className="text-rose-500 font-medium">{mem.tag}</span>
                        )}
                        {mem.tag && mem.location && <span aria-hidden="true">·</span>}
                        {mem.location && (
                          <span className="flex items-center gap-1 truncate max-w-[160px]">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span className="truncate">{mem.location}</span>
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif-romantic font-bold text-lg text-stone-900 group-hover:text-rose-600 transition-colors">
                        {mem.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed line-clamp-3">
                        {mem.description}
                      </p>
                    </div>

                    {/* Bottom view story trigger */}
                    <div className="mt-4 pt-3 border-t border-rose-50 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setActiveMemory(mem)}
                        className="text-xs font-medium text-rose-600 hover:text-rose-700 flex items-center gap-1"
                      >
                        <span>Poori Baat Padhein</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox / Memory Reader Detail Modal */}
      {activeMemory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveMemory(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-rose-100 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] sm:aspect-[2/1] bg-stone-900">
              <img
                src={activeMemory.imageUrl}
                alt={activeMemory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveMemory(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-3">
              <div className="flex items-center gap-2 text-xs text-rose-600 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {new Date(activeMemory.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                {activeMemory.location && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{activeMemory.location}</span>
                    </span>
                  </>
                )}
              </div>

              <h3 className="text-2xl font-serif-romantic font-bold text-stone-900">
                {activeMemory.title}
              </h3>

              <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line font-serif-romantic pt-2">
                {activeMemory.description}
              </p>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveMemory(null)}
                  className="px-5 py-2 text-xs font-medium bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
