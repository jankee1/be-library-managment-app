import { SuccessResponse } from './../types';
import { BookEntity } from './entities/book.entity';
import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

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

  findAll() {
    return `This action returns all book`;
  }

  async findOne(id: string): Promise<BookEntity> {
    return await BookEntity.findOne({where: {id}})
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
