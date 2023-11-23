export interface Post {
    id: string;
    text: string;
    author_id: string;
    images: string;
    like_count: number;
    repost_count: number;
    orig_post_id: string | null;
    reply_to_id: string | null;
    hashtags: string | null;
    mentions: string | null;
  }