import { USER_INPUT_PASSWORD_MIN_LENGTH, USER_INPUT_PASSWORD_MAX_LENGTH, USER_INPUT_EMAIL_MAX_LENGTH } from '../../types/consts/consts';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MaxLength(USER_INPUT_EMAIL_MAX_LENGTH)
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(USER_INPUT_PASSWORD_MIN_LENGTH)
    @MaxLength(USER_INPUT_PASSWORD_MAX_LENGTH)
    password: string;

}
