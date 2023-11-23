import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../users/users.service';
import { PostService } from '../posts/posts.service';
import { AppService } from './app.service';
import { User as UserModel, Post as PostModel } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@ApiTags('app')
@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly appservice: AppService,
  ) {}

 
 
}

