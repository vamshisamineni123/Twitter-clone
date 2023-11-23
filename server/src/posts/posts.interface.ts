import { User,Image,Hashtag,Mention,Like,Post } from "@prisma/client";

export interface IPost {
    id: string;
    text: string;
    author: User;
    like_count: number;
    repost_count: number;
    // orig_post?: Post;
    // reply_to?: Post;
    images?: Image[];
    hashtags?: Hashtag[];
    mentions?: Mention[];
    likes?: Like[];
    // reposts?: Post[];
    // replies?: Post[];
  }