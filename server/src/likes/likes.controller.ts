import { Controller, Post, Delete, Param } from '@nestjs/common';
import { Like } from '@prisma/client';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likeService: LikesService) {}

  @Post(':postId/:userId')
  async likePost(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
  ): Promise<Like> {
    const like = await this.likeService.likePost(postId, userId);
    return like;
  }

  @Delete(':postId/:userId')
  async unlikePost(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    await this.likeService.unlikePost(postId, userId);
  }
}