import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
         private jwtService: JwtService
    ) { }

    // register function
    async registerUser(registerUserDto: RegisterDto) {

        const saltRounds = 10;
        const hashedPass = await bcrypt.hash(registerUserDto.password, saltRounds);

        const user = await this.userService.createUser({ ...registerUserDto, password: hashedPass })

        const payload={ sub: user._id, role:user.role};
        const token = await this.jwtService.signAsync(payload)
        return {access_token:token, user};

    }

    //login function
    async loginUser(loginUserDto:LoginDto){
          const user = await this.userService.findUser(loginUserDto)
          const payload={sub: user?._id, role:user.role}
          const token = await this.jwtService.signAsync(payload)
          return {access_token: token, user}
    }
}
