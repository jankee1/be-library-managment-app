import { USER_INPUT_BOOK_TITLE_MAX_LENGTH, USER_INPUT_BOOK_AUTHOR_FIRST_NAME_MAX_LENGTH, USER_INPUT_BOOK_AUTHOR_LAST_NAME_MAX_LENGTH, USER_INPUT_BOOK_AUTHOR_FIRST_NAME_MIN_LENGTH, USER_INPUT_BOOK_AUTHOR_LAST_NAME_MIN_LENGTH } from './../../consts';
import { IsDate, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(USER_INPUT_BOOK_TITLE_MAX_LENGTH)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(USER_INPUT_BOOK_AUTHOR_FIRST_NAME_MIN_LENGTH)
    @MaxLength(USER_INPUT_BOOK_AUTHOR_FIRST_NAME_MAX_LENGTH)
    authorFirstName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(USER_INPUT_BOOK_AUTHOR_LAST_NAME_MIN_LENGTH)
    @MaxLength(USER_INPUT_BOOK_AUTHOR_LAST_NAME_MAX_LENGTH)
    authorLastName: string;

    @IsDate()
    @IsNotEmpty()
    publishedOn: Date;
}
