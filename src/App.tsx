/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PasswordGate } from './components/PasswordGate';
import { FloatingHearts } from './components/FloatingHearts';
import { Header } from './components/Header';
import { HeroProfile } from './components/HeroProfile';
import { LoveLetterCard } from './components/LoveLetterCard';
import { LoveNotesJar } from './components/LoveNotesJar';
import { Footer } from './components/Footer';
import { ProtectionLayer } from './components/ProtectionLayer';
import { BirthdayCountdown } from './components/BirthdayCountdown';
import { DEFAULT_PROFILE, DEFAULT_BIRTHDAY } from './data/initialData';

const SESSION_LOCK_KEY = 'aashman_unlocked_session';

export default function App() {
  // Lock state: strictly requires password 'i love you' on initial visit
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(SESSION_LOCK_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Data is driven directly from code (src/data/initialData.ts).
  // Any update to initialData.ts will immediately reflect here!
  const profile = DEFAULT_PROFILE;

  const handleUnlock = () => {
    setIsUnlocked(true);
    try {
      sessionStorage.setItem(SESSION_LOCK_KEY, 'true');
    } catch {
      // ignore
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    try {
      sessionStorage.removeItem(SESSION_LOCK_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <>
      {/* Anti-screenshot, anti-copy and protection layer */}
      <ProtectionLayer />

      {/* If locked, render Password Gate with top right birthday countdown */}
      {!isUnlocked ? (
        <main className="relative">
          <FloatingHearts />
          <BirthdayCountdown birthdayData={DEFAULT_BIRTHDAY} variant="floating" />
          <PasswordGate onUnlock={handleUnlock} />
        </main>
      ) : (
        /* When unlocked, render pristine romantic tribute */
        <div className="min-h-screen flex flex-col relative select-none">
          <FloatingHearts />

          {/* Navigation Header */}
          <Header onLock={handleLock} />

          <main className="flex-1 z-10">
            {/* 1. Circle Image, Name & Anniversary Counter */}
            <HeroProfile profile={profile} />

            {/* 2. Message Box / Heartfelt Love Letter */}
            <LoveLetterCard profile={profile} />

            {/* 3. Reasons Why I Love You Interactive Notes */}
            <LoveNotesJar />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
}
