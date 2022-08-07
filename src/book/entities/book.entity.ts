import { USER_INPUT_BOOK_TITLE_MAX_LENGTH, USER_INPUT_BOOK_AUTHOR_MAX_LENGTH } from './../../consts';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BookEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: USER_INPUT_BOOK_TITLE_MAX_LENGTH})
    title: string;

    @Column({length: USER_INPUT_BOOK_AUTHOR_MAX_LENGTH})
    author: string;

    @Column()
    publishedOn: Date;
    
}
