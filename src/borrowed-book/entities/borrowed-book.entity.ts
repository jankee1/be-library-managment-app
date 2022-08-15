import { BookEntity } from '../../book/entities/book.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class BorrowedBookEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, (entity) => entity.users, {
        eager: true,
      })
    user: UserEntity

    @ManyToOne(() => BookEntity, (entity) => entity.books, {
        eager: true,
      })
    book: BookEntity

    @Column({
        default: ()=> "CURRENT_TIMESTAMP"
    })
    bookedAt: Date
}