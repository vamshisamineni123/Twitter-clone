import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';

@Module({
    imports: [],
    controllers: [LikesController],
    providers: [LikesService],
})
export class LikesModule {}
