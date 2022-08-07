import { USER_INPUT_BOOK_TITLE_MAX_LENGTH, USER_INPUT_BOOK_AUTHOR_MAX_LENGTH } from './../../consts';
import { IsDate, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(USER_INPUT_BOOK_TITLE_MAX_LENGTH)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(USER_INPUT_BOOK_AUTHOR_MAX_LENGTH)
    author: string;

    @IsDate()
    @IsNotEmpty()
    publishedOn: Date;
}
