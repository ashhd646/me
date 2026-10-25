import React, { useEffect, useState } from 'react';
import { ShieldAlert, Heart } from 'lucide-react';

export const ProtectionLayer: React.FC = () => {
  const [showWarning, setShowWarning] = useState<string | null>(null);
  const [isWindowBlurred, setIsWindowBlurred] = useState(false);

  useEffect(() => {
    // 1. Disable right-click / context menu across the entire document
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerWarning('Right-click & context menu are disabled for privacy ❤️');
      return false;
    };

    // 2. Disable text selection start
    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      // Allow input typing in password box
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return true;
      }
      e.preventDefault();
      return false;
    };

    // 3. Disable copy and cut events
    const handleCopyCut = (e: ClipboardEvent) => {
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.clearData();
      }
      triggerWarning('Content copy is disabled on this website ❤️');
      return false;
    };

    // 4. Disable drag start on any element/image
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // 5. Intercept screenshot shortcuts and inspect shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // PrintScreen key
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen') {
        e.preventDefault();
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText('');
          }
        } catch {
          // ignore
        }
        triggerWarning('Screenshot capture is protected on this website 🔒');
        return false;
      }

      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // Ctrl/Cmd + C (Copy), X (Cut), A (Select All), S (Save), P (Print), U (View Source)
      if (isCtrlOrCmd && ['c', 'C', 'x', 'X', 'a', 'A', 's', 'S', 'p', 'P', 'u', 'U'].includes(e.key)) {
        const target = e.target as HTMLElement;
        if ((target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') && ['c', 'v', 'x', 'a'].includes(e.key.toLowerCase())) {
          return true; // Allow basic text field typing
        }
        e.preventDefault();
        triggerWarning('Action is restricted for privacy ❤️');
        return false;
      }

      // Dev tools: F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (
        e.key === 'F12' ||
        (isCtrlOrCmd && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key))
      ) {
        e.preventDefault();
        return false;
      }

      // Mac Screenshot shortcuts: Cmd + Shift + 3 / 4 / 5
      if (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        triggerWarning('Screenshot capture is protected on this website 🔒');
        return false;
      }
    };

    // 6. Screenshot tool defense on window blur
    const handleWindowBlur = () => {
      setIsWindowBlurred(true);
    };

    const handleWindowFocus = () => {
      setIsWindowBlurred(false);
    };

    // 7. Visibility change defense
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsWindowBlurred(true);
      } else {
        setIsWindowBlurred(false);
      }
    };

    // Attach listeners
    document.addEventListener('contextmenu', handleContextMenu, { capture: true });
    document.addEventListener('selectstart', handleSelectStart, { capture: true });
    document.addEventListener('copy', handleCopyCut, { capture: true });
    document.addEventListener('cut', handleCopyCut, { capture: true });
    document.addEventListener('dragstart', handleDragStart, { capture: true });
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, { capture: true } as EventListenerOptions);
      document.removeEventListener('selectstart', handleSelectStart, { capture: true } as EventListenerOptions);
      document.removeEventListener('copy', handleCopyCut, { capture: true } as EventListenerOptions);
      document.removeEventListener('cut', handleCopyCut, { capture: true } as EventListenerOptions);
      document.removeEventListener('dragstart', handleDragStart, { capture: true } as EventListenerOptions);
      window.removeEventListener('keydown', handleKeyDown, { capture: true } as EventListenerOptions);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  let timeoutId: number;
  const triggerWarning = (msg: string) => {
    setShowWarning(msg);
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      setShowWarning(null);
    }, 2800);
  };

  return (
    <>
      {/* Privacy Warning Toast */}
      {showWarning && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-medium border border-rose-500/40 animate-fadeIn pointer-events-none">
          <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{showWarning}</span>
        </div>
      )}

      {/* Screen Capture Blankout Overlay (triggers during app switch or screen grab) */}
      {isWindowBlurred && (
        <div className="fixed inset-0 z-50 bg-stone-950 flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="w-16 h-16 rounded-full bg-rose-900/30 border border-rose-500/30 flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse-subtle" />
          </div>
          <h2 className="text-xl font-serif-romantic font-bold text-white mb-1">
            Privacy Protected
          </h2>
          <p className="text-xs text-rose-200/70 max-w-xs leading-relaxed">
            Screen capture and sharing are restricted for privacy. Click or switch back to continue viewing.
          </p>
        </div>
      )}
    </>
  );
};
