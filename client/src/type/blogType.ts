export interface ListItem {
  content: string;
}

export interface EditorBlock {
  type: string;
  data: {
    text?: string;
    level?: number;
    style?: "ordered" | "unordered";
    items: ListItem[];
    caption?: string;
    content?: string;
    file?: {
      url: string;
    };
    [key: string]: unknown;
  };
}

export interface EditorContent {
  time: string;
  blocks: EditorBlock[];
  version: string;
}

export interface Author {
  id: string;
  username: string;
}

export interface Article {
  _id: string;
  title: string;
  image: string;
  content: EditorContent;
  author: Author;
  avatar: string;
  likes: string[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CommentData {
  _id: string;
  text: string;
  blog?: string;
  author?: Author[];
  createdAt: string;
}

export interface User {
  avatar: string;
  bio: string;
  createdAt: string;
  email: string;
  updatedAt: string;
  username: string;
  _id: string;
}

interface Recipent {
  id: string;
  userName: string;
}

interface Sender {
  id: string;
  username: string;
  avatar: string;
}
export interface Notification {
  _id: string;
  isRead: boolean;
  message: string;
  recipent: Recipent;
  type: "like" | "comment" | "follow";
  sender: Sender;
  targetBlog: string | null;
  targetUser: string | null;
  createdAt?: string;
  updatedAt?: string;
}
