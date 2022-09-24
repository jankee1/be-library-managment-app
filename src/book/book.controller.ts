import { UserRole } from '../types';
import { BookEntity } from './entities/book.entity';
import { SuccessResponse } from './../types/common/success-response';
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AccessRole } from 'src/utils/decorators/access-role.decorator';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @AccessRole(UserRole.Admin)
  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<SuccessResponse> {
    return this.bookService.create(createBookDto);
  }
  // @UseGuards(JwtAccessGuard)
  @Get()
  findAll(): Promise<BookEntity[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<BookEntity> {
    return this.bookService.findOne(id);
  }

  @AccessRole(UserRole.Admin)
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateBookDto: UpdateBookDto): Promise<SuccessResponse> {
    return this.bookService.update(id, updateBookDto);
  }

  @AccessRole(UserRole.Admin)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<SuccessResponse> {
    return this.bookService.remove(id);
  }
}
