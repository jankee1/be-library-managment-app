import { BorrowedBookUserType, UserRole } from './../types';
import { SuccessResponse } from './../types/common/success-response';
import { UserEntity } from 'src/user/entities/user.entity';
import { Controller, Get, Post, Body, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { BorrowedBookService } from './borrowed-book.service';
import { CreateBorrowedBookDto } from './dto/create-borrowed-book.dto';
import { GetUser } from 'src/utils';
import { AccessRole } from 'src/utils/decorators/access-role.decorator';

@Controller('borrowed-books')
export class BorrowedBookController {
  constructor(private readonly borrowedBooksService: BorrowedBookService) {}

  @Post()
  async create(
    @Body() createBorrowedBookDto: CreateBorrowedBookDto,
    @GetUser() user: UserEntity
  ): Promise<SuccessResponse>  {
    return this.borrowedBooksService.create(user, createBorrowedBookDto);
  }

  @Get()
  async findAll(
    @GetUser() user: UserEntity
  ): Promise<BorrowedBookUserType[]>{
    
    return this.borrowedBooksService.findAll(user);
  }

  @Delete(":id")
  async remove(
    @Param("id", ParseUUIDPipe) bookId: string,
    @GetUser() user: UserEntity
  ): Promise<SuccessResponse> {
    return this.borrowedBooksService.remove(user, bookId);
  }

  @AccessRole(UserRole.Admin)
  @Get('stats')
  async findAllForStats() {
    // return this.borrowedBooksService.findAllForStats();
    return "admin"
  }
}
