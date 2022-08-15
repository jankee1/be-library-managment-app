import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BorrowedBookService } from './borrowed-book.service';
import { CreateBorrowedBookDto } from './dto/create-borrowed-book.dto';
import { UpdateBorrowedBookDto } from './dto/update-borrowed-book.dto';

@Controller('borrowed-books')
export class BorrowedBookController {
  constructor(private readonly borrowedBooksService: BorrowedBookService) {}

  @Post()
  create(@Body() createBorrowedBookDto: CreateBorrowedBookDto) {
    return this.borrowedBooksService.create(createBorrowedBookDto);
  }

  @Get()
  findAll() {
    return this.borrowedBooksService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.borrowedBooksService.remove(+id);
  }
}
