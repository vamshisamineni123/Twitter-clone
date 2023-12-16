import { Controller,Get,Put,Post,Param,Body,Delete } from '@nestjs/common';
import { Like, Post  as PostModel } from '@prisma/client';
import { PostService } from './posts.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private postservice: PostService) {}

  @Post('/')
  async createPost(
    @Body()
    data: {
      // id: string;
      text: string;
       author_id: string;
      images?: string;
      like_count?: number;
      repost_count?: number;
      orig_post_id?: string;
      reply_to_id?: string;
    }
  ): Promise<PostModel> {
    console.log(data)
    const post = await this.postservice.createPost(data);
    return post;
  }

  @Get('/')
  getPosts(): Promise<PostModel[]> {
    return this.postservice.getPosts();
   // return 'all the posts';
  }



  @Get('/:id')
  getPostsByAuthorId(@Param('id') author_id: string): Promise<PostModel[]> {
    return this.postservice.getPostsByAuthorId(author_id);
  }

  // @Get('/:postid')
  // async getPostById(@Param() param): String {
  //   //const post = await this.postservice.getPostById(param.postid);
  //   //return post.text;
  //   return 'posts by id';
  // }

  // @Post('/')
  // postPost(@Body() data:{data: {
  //     text: string;
  //     author_id: string;
  //     like_count?: number;
  //     repost_count?: number;
  //     orig_post_id?: string;
  //     reply_to_id?: string;
  //   },}): Promise<Post> {
  //  return this.postservice.createPost(body);
  //  // return 'post posted';
  // }

  @Delete('/:postid')
  deletePost(@Param('postid') postid:string): Promise<void> {
    return this.postservice.deletePost(postid);
    //return 'post deleted';
  }
  @Put('/:postid/like')
  likePost(@Param('postid') postid:string): any {
    const like=this.postservice.increaseLikeCount(postid);
    return like;
  }
  @Delete('/:postid/:userid/like')
  unlikePost(@Param('postid') postid:string,
  @Param('userid') userid:string): Promise<void> {
    return this.postservice.unlikePost(postid,userid);
   // return 'post unliked';
  }

}
