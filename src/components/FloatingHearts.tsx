import React, { useMemo } from 'react';

export const FloatingHearts: React.FC = () => {
  // Generate random stable particles
  const particles = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${(i * 7 + 4) % 96}%`,
      animationDuration: `${12 + (i % 6) * 3}s`,
      animationDelay: `${(i * 1.5) % 8}s`,
      size: 14 + (i % 4) * 6,
      opacity: 0.18 + (i % 3) * 0.1,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute text-rose-400 select-none"
          style={{
            left: p.left,
            bottom: '-40px',
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatUpward ${p.animationDuration} linear infinite`,
            animationDelay: p.animationDelay,
          }}
        >
          {p.id % 2 === 0 ? '❤️' : '🌸'}
        </span>
      ))}
      <style>{`
        @keyframes floatUpward {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 0.25;
          }
          85% {
            opacity: 0.25;
          }
          100% {
            transform: translateY(-110vh) rotate(45deg) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
