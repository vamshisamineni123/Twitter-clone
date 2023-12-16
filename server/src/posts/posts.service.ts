import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Post, Like, Prisma } from '@prisma/client';
import { Client } from 'pg';
@Injectable()
export class PostService {
  private readonly client: Client;
  constructor(private prisma: PrismaService) {
    this.client = new Client({
      connectionString: 'postgresql://postgres:mysecretpassword@localhost:5432/postgres',
    });
    this.client.connect();
  }

  async createPost(data1: {
    // id: string;
    text: string;
   author_id: string;
    images?: string;
    like_count?: number;
    repost_count?: number;
    // orig_post_id?: string;
    // reply_to_id?: string;
  }): Promise<any> {
    const query = `
      INSERT INTO posts (id,text,author_id,images, like_count, repost_count)
      VALUES (uuid_generate_v4(),$1, $2, $3, $4,$5)
      RETURNING *
    `;
    const values = [
      //  "f48e6f39-0acf-4897-8576-38a69f8fcfed",
      data1.text,
      data1.author_id,
      data1.images,
      data1.like_count ?? 0,
      data1.repost_count ?? 0,
    ];
    const result = await this.client.query(query, values);
    return result.rows[0];

  }


  async increaseLikeCount(postId: string): Promise<any> {
    const query = `
        UPDATE posts
        SET like_count = like_count + 1
        WHERE id = $1
        RETURNING *
    `;
    const values = [postId];
    const result = await this.client.query(query, values);
    return result.rows[0];
  }


  // async createPost(data1: {
  //     text: string;
  //     author_id: string;
  //     like_count?: number;
  //     repost_count?: number;
  //     // orig_post_id?: string;
  //     // reply_to_id?: string;
  //   }): Promise<Post | null> {
  //   const post = await this.prisma.post.create({
  //     data: {
  //       text: data1.text,
  //       author: { connect: { id: data1.author_id } },
  //       like_count: data1.like_count,
  //       repost_count: data1.repost_count,
  //       // orig_post_id: data1.orig_post_id,
  //       // reply_to_id: data1.reply_to_id,
  //     },
  //   });
  //   return post;
  // }

  // async getPosts(): Promise<Post[]> {
  //   const posts = await this.prisma.post.findMany({include:{author:true}});
  //   return posts;
  // }

  async getPostsByAuthorId(authorId: string): Promise<Post[]> {
    const query = `
        SELECT * FROM posts WHERE author_id = $1
    `;

    try {
      const result = await this.client.query(query, [authorId]);
      console.log(result)
      const posts = result.rows;
      console.log(posts)
      // If no posts are found, return an empty array
      if (!posts) {
        return [];
      }

      // If posts are found, return the posts
      return posts;
    } catch (error) {
      console.error('Error executing SQL query:', error);
      throw error;
    }
  }

  async getPosts() {
    const res = await this.client.query('SELECT * FROM posts');
    return res.rows;
  }

  // async getPostById(postId: string): Promise<Post | null> {
  //   const post = await this.prisma.post.findUnique({
  //     where: { id: postId },
  //   });
  //   return post;
  // }
  async deletePost(postId: string): Promise<void> {
    await this.prisma.post.delete({
      where: { id: postId },
    });
  }
  async likePost(postId: string, userId: string): Promise<Like> {
    const like = await this.prisma.like.create({
      data: {
        post: { connect: { id: postId } },
        user: { connect: { id: userId } },
      },
    });

    return like;
  }

  async unlikePost(postId: string, userId: string): Promise<void> {
    await this.prisma.like.deleteMany({
      where: {
        post: { id: postId },
        user: { id: userId },
      },
    });
  }

}


