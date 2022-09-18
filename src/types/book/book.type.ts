import { BookEntity } from './../../book/entities/book.entity';


export type BookType = Pick<BookEntity,  
    "id" |
    "title" |
    "authorFirstName" |
    "authorLastName" |
    "publishedOn" |
    "numberOfAvailable"
>