import { USER_INPUT_BOOK_TITLE_MAX_LENGTH, USER_INPUT_BOOK_AUTHOR_FIRST_NAME_MAX_LENGTH, USER_INPUT_BOOK_AUTHOR_LAST_NAME_MAX_LENGTH } from './../../consts';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BookEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: USER_INPUT_BOOK_TITLE_MAX_LENGTH})
    title: string;

    @Column({length: USER_INPUT_BOOK_AUTHOR_FIRST_NAME_MAX_LENGTH})
    authorFirstName: string;

    @Column({length: USER_INPUT_BOOK_AUTHOR_LAST_NAME_MAX_LENGTH})
    authorLastName: string;

    @Column()
    publishedOn: Date;
    
}
