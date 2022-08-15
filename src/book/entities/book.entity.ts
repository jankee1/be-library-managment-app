import { BorrowedBookEntity } from '../../borrowed-book/entities/borrowed-book.entity';
import { USER_INPUT_BOOK_TITLE_MAX_LENGTH, USER_INPUT_BOOK_AUTHOR_FIRST_NAME_MAX_LENGTH, USER_INPUT_BOOK_AUTHOR_LAST_NAME_MAX_LENGTH } from './../../consts';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BookEntity extends BaseEntity {

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

    @Column({ type: 'int', width: 3})
    numberOfAvailable: number

    @OneToMany(() => BorrowedBookEntity, entity => entity.book)
    books: BorrowedBookEntity[]
    
}
