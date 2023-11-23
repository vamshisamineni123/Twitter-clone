import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('hastags')
@Controller('hastags')
export class HastagsController {
  constructor() {}

  @Get('/')
  getHastags(): string {
    //TODO: add actual logic
    return 'all top strings';
  }
  @Get('/:tag/hastags')
  getPostsForHastag(@Param() param):string{
    //TODO: add actual logic
       return 'posts for hastag ' + param.tag;

  }
}