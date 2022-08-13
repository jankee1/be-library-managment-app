import { SuccessResponse } from './../types';
import { BookEntity } from './entities/book.entity';
import { Injectable } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './dto/';

@Injectable()
export class BookService {
  
  async create(createBookDto: CreateBookDto): Promise<SuccessResponse> {
    const book = new BookEntity()

    for( const [key, value] of Object.entries(createBookDto)) {
      book[key] = value
    }
    await book.save()
    return {isSuccess: true};
  }

  async findAll(): Promise<BookEntity[]> {
    return await BookEntity.find();
  }

  async findOne(id: string): Promise<BookEntity> {
    return await BookEntity.findOne({where: {id}})
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<SuccessResponse>  {
    const bookToBeUpdated = await this.findOne(id)

    for( const [key, value] of Object.entries(updateBookDto)) {
      bookToBeUpdated[key] = value
    }

    await bookToBeUpdated.save()
    return {isSuccess: true};
  }

  async remove(id: string) {
    const bookToBeDeleted = await this.findOne(id);
    bookToBeDeleted.remove()

    return {isSuccess: true};
  }
}
