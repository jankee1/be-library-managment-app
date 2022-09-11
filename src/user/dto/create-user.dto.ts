import { USER_INPUT_FIRSTNAME_MIN_LENGTH, USER_INPUT_FIRSTNAME_MAX_LENGTH, USER_INPUT_LASTNAME_MIN_LENGTH, USER_INPUT_LASTNAME_MAX_LENGTH, USER_INPUT_PASSWORD_MIN_LENGTH, USER_INPUT_PASSWORD_MAX_LENGTH, USER_INPUT_EMAIL_MAX_LENGTH } from '../../types/consts/consts';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { MatchDecorator } from "src/utils";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(USER_INPUT_FIRSTNAME_MIN_LENGTH)
    @MaxLength(USER_INPUT_FIRSTNAME_MAX_LENGTH)
    firstName: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(USER_INPUT_LASTNAME_MIN_LENGTH)
    @MaxLength(USER_INPUT_LASTNAME_MAX_LENGTH)
    lastName: string;

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

    @IsNotEmpty()
    @IsString()
    @MinLength(USER_INPUT_PASSWORD_MIN_LENGTH)
    @MaxLength(USER_INPUT_PASSWORD_MAX_LENGTH)
    @MatchDecorator('password', { message: 'Provided passwords are different' })
    repeatPassword: string;
}
