import { USER_INPUT_BOOK_TITLE_MAX_LENGTH, USER_INPUT_BOOK_AUTHOR_FIRST_NAME_MAX_LENGTH, USER_INPUT_BOOK_AUTHOR_LAST_NAME_MAX_LENGTH, USER_INPUT_BOOK_AUTHOR_FIRST_NAME_MIN_LENGTH, USER_INPUT_BOOK_AUTHOR_LAST_NAME_MIN_LENGTH, USER_INPUT_COUNT_OF_AVAILABLE_BOOKS_MAX_NUMBER } from '../../types/consts/consts';
import { IsDateString, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

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

    @IsDateString()
    @IsNotEmpty()
    publishedOn: Date;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(USER_INPUT_COUNT_OF_AVAILABLE_BOOKS_MAX_NUMBER)
    numberOfAvailable: number
}
