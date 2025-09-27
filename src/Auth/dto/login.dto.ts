import { IsEmail, IsEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsEmpty()
  @IsString()
  password: string;
}
