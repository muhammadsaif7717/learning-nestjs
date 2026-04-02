import { IsEmail, IsNotEmpty, IsString, IsEnum } from "class-validator";
import { Role } from "src/user/user.types";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  fname!: string;

  @IsString()
  @IsNotEmpty()
  lname!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsEnum(Role)
  role!: Role;
}