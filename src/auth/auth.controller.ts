import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/loginUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    // register route
    @Post('register')
    async register(@Body() registerUserDto: RegisterDto) {
        const token = await this.authService.registerUser(registerUserDto);
        return token
    }

    //login route 
    @Post('login')
    async login(@Body() loginUserDto: LoginDto) {
        const result = await this.authService.loginUser(loginUserDto)
        return { result };
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        const userId = req.user.sub;
        const result = await this.userService.getUserById(userId)
        return result;
    }
}


