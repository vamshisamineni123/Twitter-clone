import { Controller, Post, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService) {}

    @Post('login')
    async login(@Body() loginDto) {
        return this.authService.login(loginDto);
    }
}
