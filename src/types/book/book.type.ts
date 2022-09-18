import { BookEntity } from './../../book/entities/book.entity';


type Book = Pick<BookEntity,  
    "id" |
    "title" |
    "authorFirstName" |
    "authorLastName" |
    "publishedOn" |
    "numberOfAvailable"
>

export type BookType = Book & {isBorrowed: boolean}
