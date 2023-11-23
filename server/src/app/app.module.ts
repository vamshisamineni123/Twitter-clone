import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from '../users/users.service';
import { PrismaService } from '../prisma.service';
import { PostService } from '../posts/posts.service';
import { HastagsController } from '../hastags/hastags.controller';
import { PostsController } from '../posts/posts.controller';
import { UsersController } from '../users/users.controller';
import { DatabaseSetupService } from 'src/database/database.service';
import { MainModule } from 'src/database/database.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({
    dest: './uploads',
  })],
  controllers: [
    AppController,
    HastagsController,
    PostsController,
    UsersController,
  ],
  providers: [AppService, UserService,PrismaService,DatabaseSetupService, PostService],
  

  
})
export class AppModule {
  constructor(private readonly databaseSetupService: DatabaseSetupService) {}

  async onModuleInit(): Promise<void> {
    console.log('Creating tables...');
    // await this.databaseSetupService.updateTables();
  }
}
