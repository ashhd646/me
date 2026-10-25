export interface Memory {
  id: string;
  title: string;
  date: string; // ISO date string YYYY-MM-DD
  imageUrl: string;
  description: string;
  location?: string;
  tag?: string;
  createdAt: number;
}

export interface ProfileData {
  name: string;
  nickname: string;
  tagline: string;
  avatarUrl: string;
  secondaryAvatarUrl?: string;
  anniversaryDate: string; // YYYY-MM-DD
  loveLetter: string;
  signature: string;
}

export interface LoveReason {
  id: string;
  title: string;
  text: string;
  emoji: string;
}

export interface BirthdayData {
  targetDate: string; // e.g. "2026-10-27T00:00:00"
  personName: string;
  nickname: string;
  title: string;
  shortMsg: string;
  revealedMessage: string;
  signature: string;
}

