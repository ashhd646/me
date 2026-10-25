import { ProfileData, Memory, LoveReason, BirthdayData } from '../types';

export const DEFAULT_PROFILE: ProfileData = {
  name: "Mansii",
  nickname: "Meri Babe ❤️",
  tagline: "The one who turned my ordinary world into pure magic 🌸",
  avatarUrl: "/src/assets/images/4.jpeg",
  secondaryAvatarUrl: "/src/assets/images/3.jpeg",
  anniversaryDate: "2026-05-27",
  loveLetter: `Meri babe 😘,  

Mujhe nhi laga tha ki ham yaha tk aa jayenge, jb msg kiya tha lg nhi raha tha ki reply bhi aayega or aaj yaha tk so lovely❤️😘🥰💋😍.

Jab se aap aaye ho maza aa raha hai jine mai, aapko manana,ladna,aapke baare mai soachna,romance 🫣.

Pata nhi aage kya hoga jo hoga dekh lenge usko soach ke abhi ke hasin pal miss nhi krna hai aapke sath.

I love you more than words could ever describe, aaj bhi, kal bhi, aur aane wale har ek lamhe mein! Hamesha aise hi muskurati rehna. 💖`,
  signature: "Tumhara Ashiq, ashish ❤️"
};

export const DEFAULT_BIRTHDAY: BirthdayData = {
  targetDate: "2026-10-27T00:00:00",
  personName: "Mansii",
  nickname: "Meri Babe ❤️",
  title: "Happy Birthday Meri Babe! 🎂🎉",
  shortMsg: "Aaj ka din mere liye saal ka sabse khaas din hai ✨",
  revealedMessage: `Meri Baby😘,

Happy Birthday to the most precious girl in my life! 🎂❤️

God bless you orr jo aap jivan mai chaho aapko mile mera Ashirvad😁 aapke sath hai.

I love you so so so much babe!💖✨💋`,
  signature: "Tumhara Ashiq, ashish ❤️"
};


export const DEFAULT_MEMORIES: Memory[] = [
  {
    id: "mem-1",
    title: "Hamara Ghumna",
    date: "",
    imageUrl: "/src/assets/images/2.jpeg",
    description: "Meri Bandariya 🙈",
    location: "Zoo..",
    tag: "First Meet",
    createdAt: 1707868800000
  },
  {
    id: "mem-2",
    title: "Sunset Walk & Holding Hands",
    date: "2024-05-18",
    imageUrl: "/src/assets/images/memory_sunset_walk_1792234687582.jpg",
    description: "Samundar ki thandi hawayein, dhalte sooraj ki laal-peeli dhoop aur tumhara haath mere haath mein. Us shaam lag raha tha jaise waqt ko yahin rok dein.",
    location: "Sunset Promenade Beach",
    tag: "Special Evening",
    createdAt: 1716000000000
  },
];

export const PRESET_IMAGES = [
  {
    id: "img-portrait",
    title: "Sweet Portrait",
    url: "/src/assets/images/gf_portrait_1792234656322.jpg"
  },
  {
    id: "img-coffee",
    title: "Cafe Date",
    url: "/src/assets/images/memory_coffee_date_1792234671759.jpg"
  },
  {
    id: "img-sunset",
    title: "Sunset Walk",
    url: "/src/assets/images/memory_sunset_walk_1792234687582.jpg"
  }
];

export const DEFAULT_LOVE_REASONS: LoveReason[] = [
  {
    id: "r-1",
    title: "Smile",
    text: "Jb aap haste ho aapke daant dikhte hai 🫣, beautiful smile hai aapki .",
    emoji: "✨"
  },
  {
    id: "r-2",
    title: "cuteness overloaded",
    text: "You are really so so so so cuteee babe,appka face wow babe so cute 😘🥰.",
    emoji: "🤍"
  },
  {
    id: "r-3",
    title: "Hot",
    text: "You are so hot babe Uff aapki 26 ki kmr lajawab dil krta hai bss pakde rahe 🫣😘.",
    emoji: "😳"
  },
  {
    id: "r-4",
    title: "Strong Girl",
    text: "Aap bohot strong ho or sach mao bohot bohot kuch huwa hai aapke sath firr bhi aap roz mehnat krte ho so much respect aapke liye sab nhi kr paate hai.",
    emoji: "💪"
  },
  {
    id: "r-5",
    title: "I love you",
    text: "love you my babe hamare ye pal bss chlte rahe aap mere pass raho hamesha orr kuch saal baad bilkul mere pass🤞",
    emoji: "😘"
  },
  {
    id: "r-6",
    title: "Aapke liye",
    text: "aap aap raho bss aache ho aap bss hste raho bohot se problem aayengi aap khade rahna issi trh aaage aache pal jarur aayenge .",
    emoji: "💖"
  }
];
