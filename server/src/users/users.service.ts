import { Injectable,InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Client } from 'pg';
import { User, Prisma ,UserFollowing} from '@prisma/client';

@Injectable()
export class UserService {
  private readonly client: Client;
  constructor(private prisma: PrismaService) {
    this.client = new Client({
      connectionString: 'postgresql://postgres:mysecretpassword@localhost:5432/postgres',
    });
    this.client.connect();
  }


  async getAllUsers(): Promise<User[]> {
    const query = `
      SELECT * FROM users
    `;

    const result = await this.client.query(query);
    const users = result.rows;
    return users;
  }

  async createUser(data: {
    // id: string;
    username: string;
    name: string;
    avatar?: string;
    bio?: string;
    follower_count?: number;
    following_count?: number;
    verified?: boolean;
    email: string;
    password: string;
  }): Promise<User> {
    const query = `
      INSERT INTO users (id,username, name, avatar, bio, follower_count, following_count, verified,email,password)
      VALUES (uuid_generate_v4(),$1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const values = [
      // data.id,
      data.username,
      data.name,
      data.avatar,
      data.bio,
      data.follower_count ?? 0,
      data.following_count ?? 0,
      data.verified ?? false,
      data.email,
      data.password
    ];
    console.log(values)
    // if (!data.id) {
    //   throw new Error('The "id" field cannot be null');
    // }
    try {
      const result = await this.client.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error executing SQL query:', error);
      throw error;
    }
  
    // const newUser = await this.prisma.user.create({
    //   data: {
    //     ...data,
    //     follower_count: data.follower_count ?? 0,
    //     following_count: data.following_count ?? 0,
    //     verified: data.verified ?? false,
    //   },
    // });
    // return newUser;
  }
  async getByName(username: string): Promise<any> {
    const query = `
      SELECT *
      FROM users
      WHERE username = $1
    `;
    const values = [username];
    const result = await this.client.query(query, values);
    return result.rows[0];
  }
  // async getByName(username: string): Promise<User> {
  //   try {
  //     const user = await this.prisma.user.findUnique({
  //       where: {
  //         username,
  //       },
  //     });
  //     return user;
  //   } catch (error) {
  //     console.error(error);
  //     throw new InternalServerErrorException('Error retrieving user by username');
  //   }
  // }

  async getUserByEmail(email: any): Promise<User | null> {
    const query = `
        SELECT * FROM users WHERE email = $1
    `;
   
    try {
        const result = await this.client.query(query, [email]);
        const user = result.rows[0];
        // If user doesn't exist, return null
        if (!user) {
          // console.log('user is null call from service');
            return null;
        }
        //  console.log('user is not null call from service')
        // If user exists, return the user
        return user;
    } catch (error) {
        console.error('Error executing SQL query:', error);
        throw error;
    }
}


  async getById(userid: string): Promise<any> {
    const query = `
      SELECT *
      FROM users
      WHERE id = $1
    `;
    const values = [userid];
    const result = await this.client.query(query, values);
    return result.rows[0];
  }
//   async getById(userid: string): Promise<User> {
//     const user=await this.prisma.user.findUnique({
//         where:{
//             id:userid,
//         },
//     });
//     return user;
// }
async create(data: {
  id: string;
  username: string;
  name: string;
  avatar?: string;
  bio?: string;
  follower_count?: number;
  following_count?: number;
  verified?: boolean;
}): Promise<any> {
  const query = `
    INSERT INTO users (id, username, name, avatar, bio, follower_count, following_count, verified)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;
  const values = [
    data.id,
    data.username,
    data.name,
    data.avatar ?? '',
    data.bio ?? '',
    data.follower_count ?? 0,
    data.following_count ?? 0,
    data.verified ?? false,
  ];
  const result = await this.client.query(query, values);
  return result.rows[0];
}

async deleteUser(userid: string): Promise<void> {
  const query = `
    DELETE FROM users
    WHERE id = $1
    RETURNING *
  `;
  const values = [userid];
  await this.client.query(query, values);
}

async authenticateUser(body: { email: string; password: string }): Promise<User | null> {
  const query = `
  SELECT * FROM users WHERE email = $1
`;
console.log('hey')
try {
  const result = await this.client.query(query, [body.email]);
  const user = result.rows[0];
  console.log('user ', result)
  // If user doesn't exist or password doesn't match, return null
  if (!user || user.password !== body.password) {
    console.log('service calle2')
    return null;
  }
   console.log('service called3')
  // If user exists and password matches, return the user
  return user;
} catch (error) {
  console.log('service called')
  console.error('Error executing SQL query:', error);
  throw error;
}
return null;
}


async createFollowing(followerId: string, followeeId: string): Promise<void> {
  const createFollowingSQL = `
    INSERT INTO follows (follower_id, followee_id)
    VALUES ($1, $2)
  `;

 const res= await this.client.query(createFollowingSQL, [followerId, followeeId]);
 return res;
}


async getFollowers(userId: string): Promise<any> {
  const getFollowersSQL = `
    SELECT *
    FROM follows
    WHERE followee_id = $1
  `;

  const { rows } = await this.client.query(getFollowersSQL, [userId]);
  return rows;
}

async getFollowees(userId: string): Promise<any> {
  const getFolloweesSQL = `
    SELECT *
    FROM follows
    WHERE follower_id = $1
  `;

  const { rows } = await this.client.query(getFolloweesSQL, [userId]);
  return rows;
}
async unfollowUser(followerId: string, followeeId: string): Promise<void> {

  const query = `
    DELETE FROM follows
    WHERE follower_id = $1 AND followee_id = $2
  `;
  const values = [followerId, followeeId];
  await this.client.query(query, values);
}
// async create(data:{
//   username: string;
//   name: string;
//   avatar?: string;
//   bio?: string;
//   follower_count?: number;
//   following_count?: number;
//   verified?: boolean;
// }): Promise<User> {
//   const newUser = await this.prisma.user.create({
//     data: {
//       username: data.username,
//       name: data.name,
//       avatar: data.avatar ?? '',
//       bio: data.bio ?? '',
//       follower_count: data.follower_count ?? 0,
//       following_count: data.following_count ?? 0,
//       verified: data.verified ?? false,
//     },
//   });
//   return newUser;
// }

// async createFollowing(followerId: string, followeeId: string): Promise<UserFollowing> {
//   const userFollowing = await this.prisma.userFollowing.create({
//     data: {
//       follower: { connect: { id: followerId } },
//       followee: { connect: { id: followeeId } },
//     },
//   });
//   return userFollowing;
// }
//below method has to be fixed
// async unfollowUser(followerId: string, followeeId: string): Promise<void> {
//   await this.prisma.userFollowing.deleteMany({
//     where: {
//       follower_id: followerId,
//       followee_id: followeeId,
//     },
//   });
// }



// async unfollowUser(followerId: string, followeeId: string): Promise<void> {
//   await this.prisma.userFollowing.delete({
//     where: {
//       follower_id_followee_id: {
//         follower_id: followerId,
//         followee_id: followeeId,
//       },
//     },
//   });
// }

// async getFollowers(userid: string): Promise<User[]> {
//   const userFollowings = await this.prisma.userFollowing.findMany({
//     where: {
//       followee_id: userid,
//     },
//     include: {
//       follower: true,
//     },
//   });

//   const followers = userFollowings.map((userFollowing) => userFollowing.follower);

//   return followers;
// }

// async getFollowings(userid: string): Promise<User[]> {
//   const userFollowings = await this.prisma.userFollowing.findMany({
//     where: {
//       follower_id: userid,
//     },
//     include: {
//       followee: true,
//     },
//   });

//   const followers = userFollowings.map((userFollowing) => userFollowing.followee);

//   return followers;
// }

}
