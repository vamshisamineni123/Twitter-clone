import { Controller, Get,Post,Body,Param,Patch,Delete,Put, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { PrismaClient, User ,UserFollowing} from '@prisma/client';
import { UserService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fastifyMulter from 'fastify-multer';
import * as path from 'path';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  // @Post("/upload")
  // @UseInterceptors(FileInterceptor('file' , {
  //   storage : diskStorage({
  //     destination : "./uploads",
  //     filename : (req , file , cb) => {
  //       cb(null , `${file.originalname}`)
  //     }
  //   })
  // }))
  // async uploadFile(@UploadedFile() file : any) { 
  //   console.log(file);
  //   return "success";
  // }


  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // Destination folder for the uploaded files
      filename: (req, file, cb) => {
        const fileName: string = 'uploadedFile';
        const extension: string = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        
        cb(null, `${fileName}-${uniqueSuffix}${extension}`);
      },
    }),
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }


  // @Post('/upload')
  // @UseInterceptors(FileInterceptor('file', {
  //   storage: diskStorage({
  //     destination: './uploads', // Destination folder for the uploaded files
  //     filename: (req, file, cb) => {
  //       const fileName: string = 'meralauda';
  //       const extension: string = '.png';
 
  //       cb(null, `${fileName}${extension}`);
  //     },
  //   }),
  // }))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file);
  // }



  @Get('/')
  async getAllUsers(): Promise<User[]> {
    const users = await this.userService.getAllUsers();
    return users;
  }
  @Get('/@:username')
  getUserByUsername(@Param('username') username: string): Promise<User> {
    const user= this.userService.getByName(username);
    if (!user) {
      throw new Error(`User with username ${username} does not exist`);
    }
    else
    return user;
  }

  @Get('/:userid')
getUserById(@Param('userid') userid:string): Promise<User> {
  const user=this.userService.getById(userid);
  if(!user) {
    throw new Error(`User with userid ${userid} does not exist`);
  }
  else
    return user;
}

  @Get('/email/:email')
  async getUserByEmail(@Param('email') email:string): Promise<User> {
   
    const user=await this.userService.getUserByEmail(email);
    // console.log(user);
    if(!user) {
      throw new Error(`User with email ${email} does not exist`);
    }
    else
    return user;
  }

  @Post('/')     // to get all the posts displayed
  postUser(@Body() body): Promise<User> {
    const user=this.userService.createUser(body);
    
      return user;
      //return 'user posted';
  }

  @Delete('/:userid')
  DeleteUser(@Param() param): any {
    const user=this.userService.deleteUser(param.userid);
    if(!user) {
      throw new Error(`User with userid ${param.userid} does not exist`);
    }
    else
    "user deleted"
  }
   @Post('/login')
   async authenticate(@Body() body:{ email: string; password: string }): Promise<User | null> {
    const response=await this.userService.authenticateUser(body);
    setTimeout(() => {
      console.log('samineni',  response);
    }, 1000);
    console.log('samineni',  response)
     return response;
   }
//
//   @Patch('/:userid')   
//   UpdateUser(@Param() param, @Body() body): string {
//       return 'user updated';
//   }
  @Post('/:followerId/follow/:followeeId')
async followUser(
  @Param('followerId') followerId: string,
  @Param('followeeId') followeeId: string,
): Promise<void> {
  const userFollowing = await this.userService.createFollowing(followerId, followeeId);
  return userFollowing;
}
  // the below has to be fixed
  // @Delete('/:followerId/follow/:followeeId')
  // unfollowUser(@Param('followerId') followerId:string,
  //               @Param('followeeId') followeeId: string,
  // ): Promise<void> {
  //   const temp=this.userService.unfollowUser(followerId, followeeId); 
  //   return temp;
  //   //  return 'user unfollowed';
  // }
  @Get('/:userid/followers')
  async getFollowers(@Param('userid') userid: string): Promise<User[]> {
    const followers = await this.userService.getFollowers(userid);
    return followers;
  }

  @Delete('/:followerId/unfollow/:followeeId')
  async unfollowUser(
    @Param('followerId') followerId: string,
    @Param('followeeId') followeeId: string,
  ): Promise<void> {
    const userFollowing = await this.userService.unfollowUser(followerId, followeeId);
    return userFollowing;
  }
  //people you are following
  @Get('/:userid/followees')
  async getFollowees(@Param('userid') userid: string): Promise<User[]> {
    const followees = await this.userService.getFollowees(userid);
    return followees;
  }

  // @Get('/:userid/following')
  // async getFollowing(@Param('userid') userid:string):  Promise<User[]> {
  //   const following = await this.userService.getFollowings(userid);
  //   return following;
  // }
}



