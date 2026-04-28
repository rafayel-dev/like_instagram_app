export type Story = {
  id: string;
  name: string;
  avatar: string;
  isMine?: boolean;
};

export type Post = {
  id: string;
  user: string;
  avatar: string;
  image: string;
  likes: number;
  caption: string;
  time: string;
};

export type Suggestion = {
  id: string;
  name: string;
  handle: string;
  topic: string;
  avatar: string;
  chatId: string;
};

export type ChatItem = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  avatar: string;
};

export type NoteItem = {
  id: string;
  name: string;
  note: string;
  avatar: string;
  isMe: boolean;
};

export type ChatMessage = {
  id: string;
  text: string;
  mine: boolean;
  time: string;
};

export const STORIES: Story[] = [
  { id: "0", name: "Your Story", avatar: "https://i.pravatar.cc/150?u=me", isMine: true },
  { id: "1", name: "Jane", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
  { id: "2", name: "John", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: "3", name: "Emily", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: "4", name: "Mike", avatar: "https://i.pravatar.cc/150?u=5" },
  { id: "5", name: "Sarah", avatar: "https://i.pravatar.cc/150?u=6" },
];

export const POSTS: Post[] = [
  {
    id: "1",
    user: "Jane Doe",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    likes: 3482,
    caption: "Weekend mood with coffee and clean UI ideas.",
    time: "12 minutes ago",
  },
  {
    id: "2",
    user: "John Smith",
    avatar: "https://i.pravatar.cc/150?u=1",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    likes: 1204,
    caption: "Shipping a new React Native screen today.",
    time: "1 hour ago",
  },
  {
    id: "3",
    user: "Emily Clark",
    avatar: "https://i.pravatar.cc/150?u=4",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    likes: 892,
    caption: "Late night product flow review.",
    time: "3 hours ago",
  },
];

export const SUGGESTIONS: Suggestion[] = [
  { id: "1", name: "Jane Doe", handle: "@janedoe", topic: "Design", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", chatId: "1" },
  { id: "2", name: "John Smith", handle: "@johnsmith", topic: "React Native", avatar: "https://i.pravatar.cc/150?u=1", chatId: "2" },
  { id: "3", name: "UI/UX Community", handle: "@uiux", topic: "Community", avatar: "https://i.pravatar.cc/150?u=2", chatId: "3" },
  { id: "4", name: "Tech Bros", handle: "@techbros", topic: "Startups", avatar: "https://i.pravatar.cc/150?u=3", chatId: "4" },
  { id: "5", name: "Emily Clark", handle: "@emily", topic: "Product", avatar: "https://i.pravatar.cc/150?u=4", chatId: "5" },
];

export const TRENDING = ["Design Systems", "React Native", "Product Thinking", "Startup Tools"];

export const MOCK_NOTES: NoteItem[] = [
  { id: "1", name: "Your note", note: "Leave a note", avatar: "https://i.pravatar.cc/150?u=me", isMe: true },
  { id: "2", name: "Jane", note: "Need coffee", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", isMe: false },
  { id: "3", name: "John", note: "Gym time", avatar: "https://i.pravatar.cc/150?u=1", isMe: false },
  { id: "4", name: "Emily", note: "Sleepy", avatar: "https://i.pravatar.cc/150?u=4", isMe: false },
  { id: "5", name: "Mike", note: "Working...", avatar: "https://i.pravatar.cc/150?u=5", isMe: false },
];

export const MOCK_CHATS: ChatItem[] = [
  { id: "1", name: "Jane Doe", lastMessage: "Sent you a reel.", time: "2m", unread: true, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
  { id: "2", name: "John Smith", lastMessage: "Reacted to your message.", time: "1h", unread: false, avatar: "https://i.pravatar.cc/150?u=1" },
  { id: "3", name: "UI/UX Community", lastMessage: "Jane: That looks great!", time: "4h", unread: false, avatar: "https://i.pravatar.cc/150?u=2" },
  { id: "4", name: "Tech Bros", lastMessage: "Sent an attachment.", time: "1d", unread: true, avatar: "https://i.pravatar.cc/150?u=3" },
  { id: "5", name: "Emily Clark", lastMessage: "Active yesterday", time: "", unread: false, avatar: "https://i.pravatar.cc/150?u=4" },
  { id: "6", name: "Mike Ross", lastMessage: "See you soon!", time: "2d", unread: false, avatar: "https://i.pravatar.cc/150?u=5" },
  { id: "7", name: "Sarah Lee", lastMessage: "Loved it!", time: "3d", unread: false, avatar: "https://i.pravatar.cc/150?u=6" },
];

export const CHAT_META: Record<string, { name: string; status: string }> = {
  "1": { name: "Jane Doe", status: "Active now" },
  "2": { name: "John Smith", status: "Active 1h ago" },
  "3": { name: "UI/UX Community", status: "23 members online" },
  "4": { name: "Tech Bros", status: "5 members online" },
  "5": { name: "Emily Clark", status: "Active yesterday" },
  "6": { name: "Mike Ross", status: "Active 2d ago" },
  "7": { name: "Sarah Lee", status: "Active 3d ago" },
};

export const MESSAGES: Record<string, ChatMessage[]> = {
  "1": [
    { id: "1", text: "Hey! Did you check the reel?", mine: false, time: "09:12" },
    { id: "2", text: "Yes, looked great.", mine: true, time: "09:13" },
    { id: "3", text: "Sending one more.", mine: false, time: "09:14" },
  ],
  "2": [
    { id: "1", text: "Are we shipping today?", mine: false, time: "10:01" },
    { id: "2", text: "Yes, after QA signs off.", mine: true, time: "10:03" },
  ],
};
