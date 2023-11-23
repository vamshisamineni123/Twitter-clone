import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma ,Like,Post} from '@prisma/client';

@Injectable()
export class LikesService {
    constructor(private prisma: PrismaService) {}
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
