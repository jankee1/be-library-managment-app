import { BorrowedBookUserType } from './../types';
import { SuccessResponse } from '../types/common/success-response';
import { BorrowedBookEntity } from './entities/borrowed-book.entity';
import { BookEntity } from '../book/entities/book.entity';
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateBorrowedBookDto } from './dto/create-borrowed-book.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { DataSource, FindOptionsWhere } from 'typeorm';

@Injectable()
export class BorrowedBookService {

  constructor(private dataSource: DataSource){}

  async create(user: UserEntity, createBorrowedBookDto: CreateBorrowedBookDto): Promise<SuccessResponse> {
    const book = await BookEntity.findOne({where: {id: createBorrowedBookDto.bookId}})
    if(!book || book.numberOfAvailable === 0)
      throw new NotFoundException('book has not beed found')
    
    const alreadyBorrowed = await BorrowedBookEntity.find({where: {user: user as FindOptionsWhere<UserEntity>, book: book as FindOptionsWhere<BookEntity> }})

    if(alreadyBorrowed.length > 0) 
      throw new ConflictException('selected book has been already borrowed')
    
    book.numberOfAvailable--;

    const borrow = new BorrowedBookEntity();

    borrow.user = user
    borrow.book = book;

    await book.save();
    await borrow.save()

    return {isSuccess: true}

  }

  async findAll(user: UserEntity): Promise<BorrowedBookUserType[]> {

    const borrowedBooks = await BorrowedBookEntity.find({where: {user: user as FindOptionsWhere<UserEntity>}})

    return borrowedBooks.map(item => ({
        borrowId: item.id,
        bookId: item.book.id,
        borrowDate: item.borrowedAt.toLocaleDateString(),
        additionalFees: item.fees,
        title: item.book.title,
        author: `${item.book.authorFirstName} ${item.book.authorLastName}`
      }
    ))
  }

  async remove(user: UserEntity, bookId: string): Promise<SuccessResponse> {
    const { affected } = await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(BorrowedBookEntity)
      .where('userId = :userId', {userId: user.id})
      .andWhere('bookId = :bookId', { bookId: bookId })
      .execute();
    
    if(!affected)
        throw new NotFoundException('book has not beed found')

    const book = await BookEntity.findOne({where: {id: bookId}})

    book.numberOfAvailable++;
    await book.save()

    return {isSuccess: true}

  }
}
