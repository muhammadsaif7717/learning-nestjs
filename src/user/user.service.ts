import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { LoginDto } from 'src/auth/dto/loginUser.dto';
import bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async createUser(registerUserDto: RegisterDto) {
        try {
            return await this.userModel.create({
                fname: registerUserDto.fname,
                lname: registerUserDto.lname,
                email: registerUserDto.email,
                password: registerUserDto.password,
                role: registerUserDto.role,
            })
        } catch (err: unknown) {
            const e = err as { code?: number }

            if (e.code === 11000) {
                throw new ConflictException('Email is already taken')
            }
            throw err;
        }

    }

  async findUser(loginUserDto: LoginDto) {
  const { email, password } = loginUserDto;
  const user = await this.userModel.findOne({ email });

  if (!user) {
    throw new UnauthorizedException("Invalid Credentials");
  }

  const isPassMatch = await bcrypt.compare(password, user.password);
  if (!isPassMatch) {
    throw new UnauthorizedException("Invalid Credentials");
  }

  return user;
}
}