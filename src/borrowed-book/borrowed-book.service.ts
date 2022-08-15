import { SuccessResponse } from '../types/common/success-response';
import { BorrowedBookEntity } from './entities/borrowed-book.entity';
import { BookEntity } from '../book/entities/book.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBorrowedBookDto } from './dto/create-borrowed-book.dto';
import { UpdateBorrowedBookDto } from './dto/update-borrowed-book.dto';
import { NotFoundError } from 'rxjs';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class BorrowedBookService {
  async create(createBorrowedBookDto: CreateBorrowedBookDto): Promise<SuccessResponse> {
    const book = await BookEntity.findOne({where: {id: createBorrowedBookDto.bookId}})
    if(!book || book.numberOfAvailable === 0)
      throw new NotFoundException('book has not beed found')
    

    book.numberOfAvailable = book.numberOfAvailable - 1

    const borrow = new BorrowedBookEntity();

    borrow.user = await UserEntity.findOne({where: {id : 'adf39e03-e89e-4534-b7dc-2efc196aa0cf'}}); // @TODO test
    borrow.book = book;

    await book.save();
    await borrow.save()

    return {isSuccess: true}

  }

  findAll() {
    return `This action returns all borrowedBooks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} borrowedBook`;
  }

  update(id: number, updateBorrowedBookDto: UpdateBorrowedBookDto) {
    return `This action updates a #${id} borrowedBook`;
  }

  remove(id: number) {
    return `This action removes a #${id} borrowedBook`;
  }
}
