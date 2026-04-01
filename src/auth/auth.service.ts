import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
         private jwtService: JwtService
    ) { }
    async registerUser(registerUserDto: RegisterDto) {
       //todo 1. check user exists or not
       //todo 2. hash the pass
       //todo 3. store user to db
       //todo 4. generate jwt
       //todo 5. send token in response
       //todo 

        const saltRounds = 10;
        const hashedPass = await bcrypt.hash(registerUserDto.password, saltRounds);

        const user = await this.userService.createUser({ ...registerUserDto, password: hashedPass })

        console.log('user',user)

        const payload={ sub: user._id};
        const token = await this.jwtService.signAsync(payload)
        console.log(token)
        return {access_token:token};

    }
}
