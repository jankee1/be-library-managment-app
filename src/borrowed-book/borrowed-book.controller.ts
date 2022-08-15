import { SuccessResponse } from './../types/common/success-response';
import { BorrowedBookEntity } from './../borrowed-book/entities/borrowed-book.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Controller, Get, Post, Body, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { BorrowedBookService } from './borrowed-book.service';
import { CreateBorrowedBookDto } from './dto/create-borrowed-book.dto';

@Controller('borrowed-books')
export class BorrowedBookController {
  constructor(private readonly borrowedBooksService: BorrowedBookService) {}

  @Post()
  async create(@Body() createBorrowedBookDto: CreateBorrowedBookDto): Promise<SuccessResponse>  {
    const user = await UserEntity.findOne({where: {id : 'adf39e03-e89e-4534-b7dc-2efc196aa0cf'}}); // @TODO authentication
    return this.borrowedBooksService.create(user, createBorrowedBookDto);
  }

  @Get()
  async findAll(): Promise<BorrowedBookEntity> {
    const user = await UserEntity.findOne({where: {id : 'adf39e03-e89e-4534-b7dc-2efc196aa0cf'}}); // @TODO authentication
    return this.borrowedBooksService.findAll(user);
  }

  @Delete(":id")
  async remove(@Param("id", ParseUUIDPipe) bookId: string ): Promise<SuccessResponse> {
    const user = await UserEntity.findOne({where: {id : 'adf39e03-e89e-4534-b7dc-2efc196aa0cf'}}); // @TODO authentication
    return this.borrowedBooksService.remove(user, bookId);
  }
}
