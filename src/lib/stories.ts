import mansion from "@/assets/story-mansion.jpg";
import hospital from "@/assets/story-hospital.jpg";
import graveyard from "@/assets/story-graveyard.jpg";

export type Story = {
  id: string;
  title: string;
  preview: string;
  content: string;
  category: string;
  username: string;
  avatar: string;
  likes: number;
  comments: number;
  readTime: string;
  cover: string;
  date: string;
};

export const categories = [
  { name: "Haunted Places", count: 142, icon: "🏚️" },
  { name: "Paranormal", count: 98, icon: "👻" },
  { name: "Cursed Objects", count: 64, icon: "🕯️" },
  { name: "Sleep Paralysis", count: 73, icon: "🌙" },
  { name: "Urban Legends", count: 110, icon: "🩸" },
  { name: "True Encounters", count: 201, icon: "👁️" },
];

const longStory = `It began on the third night after we moved in.

The house was old — built in 1894, the realtor said, though she could not (or would not) tell us who had lived here before. The walls held a smell we could never quite place. Not mold. Not dust. Something older.

I woke at 3:17 AM. I know because the clock on the dresser glowed faintly red, the only light in the room. My wife was breathing softly beside me. The house was silent — and yet I felt watched.

I sat up. The bedroom door, which we always closed, stood open. A pale figure stood in the hallway. Not moving. Not breathing. Just watching.

I tried to scream. Nothing came out. The figure tilted its head — a slow, wrong motion — and stepped backward into the dark. The door clicked shut on its own.

In the morning my wife showed me a photo on her phone. She had taken it the previous evening, a casual snap of the hallway. In the reflection of the mirror at the end of the corridor, behind her smile, the same pale figure stood. Watching. Already waiting.

We are still in the house. We cannot leave. Every door we open leads back to the same hallway. And every night, at 3:17, the door opens again.`;

export const stories: Story[] = [
  {
    id: "1",
    title: "The House on Hollow Hill",
    preview: "We moved in for the silence. We never expected the silence to watch us back...",
    content: longStory,
    category: "Haunted Places",
    username: "midnight_scribe",
    avatar: "M",
    likes: 1243,
    comments: 87,
    readTime: "6 min",
    cover: mansion,
    date: "Oct 31, 2025",
  },
  {
    id: "2",
    title: "Ward 13",
    preview: "Every nurse who worked the night shift in Ward 13 quit within a week. I lasted three days...",
    content: longStory,
    category: "Paranormal",
    username: "nightshift_rn",
    avatar: "N",
    likes: 982,
    comments: 54,
    readTime: "8 min",
    cover: hospital,
    date: "Sep 18, 2025",
  },
  {
    id: "3",
    title: "Beneath the Stones",
    preview: "The old cemetery keeper warned us not to dig. We laughed. We shouldn't have...",
    content: longStory,
    category: "Urban Legends",
    username: "graveborn",
    avatar: "G",
    likes: 1567,
    comments: 122,
    readTime: "10 min",
    cover: graveyard,
    date: "Aug 04, 2025",
  },
  {
    id: "4",
    title: "The Mirror at 3:17",
    preview: "It only appears when you aren't looking. But it's always there. Always watching.",
    content: longStory,
    category: "Cursed Objects",
    username: "midnight_scribe",
    avatar: "M",
    likes: 743,
    comments: 41,
    readTime: "5 min",
    cover: mansion,
    date: "Jul 22, 2025",
  },
  {
    id: "5",
    title: "She Visits Every Night",
    preview: "My body wouldn't move. My eyes wouldn't close. And she was getting closer...",
    content: longStory,
    category: "Sleep Paralysis",
    username: "ash_in_dark",
    avatar: "A",
    likes: 2104,
    comments: 198,
    readTime: "7 min",
    cover: hospital,
    date: "Jun 13, 2025",
  },
  {
    id: "6",
    title: "The Whistler",
    preview: "If you hear him whistle, do not turn around. Do not answer. Just walk.",
    content: longStory,
    category: "True Encounters",
    username: "graveborn",
    avatar: "G",
    likes: 1320,
    comments: 76,
    readTime: "6 min",
    cover: graveyard,
    date: "May 30, 2025",
  },
];

export const featured = stories[2];
export const trending = stories.slice(0, 3);

export const mockComments = [
  { user: "shadow_walker", avatar: "S", text: "I read this at 2am. I will never sleep again. Genuinely one of the most unsettling things I've read on here.", time: "2h ago" },
  { user: "ravenheart", avatar: "R", text: "The 3:17 detail broke me. Why is it always 3:17?", time: "5h ago" },
  { user: "whisper_in_dark", avatar: "W", text: "My grandmother lived in a house like this. We never visited after she passed. Now I know why.", time: "1d ago" },
];
