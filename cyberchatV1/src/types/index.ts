export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen: Date;
}

export interface Friend {
  id: string;
  user: User;
  status: 'pending' | 'accepted' | 'blocked';
}

export interface Message {
  id: string;
  content: string;
  authorId: string;
  author: User;
  timestamp: Date;
  type: 'text' | 'image' | 'command';
  imageUrl?: string;
}

export interface Room {
  id: string;
  name: string;
  type: 'private' | 'group';
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
  isActive: boolean;
}

export interface Command {
  command: string;
  description: string;
  usage: string;
  example: string;
}

export interface Theme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
  terminal: string;
}

export interface AppState {
  currentUser: User | null;
  friends: Friend[];
  rooms: Room[];
  currentRoom: Room | null;
  theme: Theme;
  isAuthenticated: boolean;
  showHelp: boolean;
}