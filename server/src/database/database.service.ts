import pgPromise from 'pg-promise';
import dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';


// database-setup.service.ts
@Injectable()
export class DatabaseSetupService {
  private readonly pool: Pool;


  constructor() {

    this.pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "postgres",
      password: "mysecretpassword",
      port: 5432,
    });
  }
  async createTables(): Promise<void> {
    const createTablesSQL = `
     
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        username VARCHAR(30) UNIQUE NOT NULL,
        name VARCHAR(50),
        avatar VARCHAR,
        bio TEXT,
        follower_count BIGINT DEFAULT 0,
        following_count BIGINT DEFAULT 0,
        verified BOOLEAN DEFAULT FALSE,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS posts (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        text VARCHAR(240) NOT NULL,
        author_id UUID NOT NULL REFERENCES users(id),
        images VARCHAR(400),
        like_count BIGINT DEFAULT 0,
        repost_count BIGINT DEFAULT 0,
        orig_post_id UUID REFERENCES posts(id),
        reply_to_id UUID REFERENCES posts(id),
        hashtags VARCHAR[],
        mentions JSONB[]
      );

    
    CREATE TABLE IF NOT EXISTS hashtags (
      id UUID PRIMARY KEY,
      tag VARCHAR UNIQUE NOT NULL,
      recent_post_count BIGINT
    );

    CREATE TABLE IF NOT EXISTS post_mentions (
      id UUID PRIMARY KEY,
      post_id UUID NOT NULL REFERENCES posts(id),
      user_id UUID NOT NULL REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS likes (
      id UUID PRIMARY KEY,
      post_id UUID NOT NULL REFERENCES posts(id),
      user_id UUID NOT NULL REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS follows (
      follower_id UUID NOT NULL REFERENCES users(id),
      followee_id UUID NOT NULL REFERENCES users(id),
      PRIMARY KEY (follower_id, followee_id)
    );
    `;
   
    await this.pool.query(createTablesSQL);

   
  }

  async  updateTables() {
    console.log('Creating tables... executing updateTables()');
    const updateTablesSQL = `
    ALTER TABLE users ADD COLUMN IF NOT EXISTS email VARCHAR(255);
  ALTER TABLE users ADD COLUMN IF NOT EXISTS password VARCHAR(255);`
  const t=await this.pool.query(updateTablesSQL);
  console.log(t)
  }

}