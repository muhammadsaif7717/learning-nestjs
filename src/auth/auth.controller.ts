import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    // register route
    @Post('register')
    async register(@Body() registerUserDto: RegisterDto) {
        const token = await this.authService.registerUser(registerUserDto);
        return token
    }

    //login route 
    @Post('login')
    async login(@Body() loginUserDto:LoginDto){
       const result = await this.authService.loginUser(loginUserDto)
        return {result};
    }
}


