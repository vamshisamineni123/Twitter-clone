export interface User {
    id: string;
    username: string;
    name?: string;
    avatar?: string;
    bio?: string;
    follower_count: number;
    following_count: number;
    verified: boolean;
  }