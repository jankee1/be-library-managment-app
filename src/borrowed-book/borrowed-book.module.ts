import { Module } from '@nestjs/common';
import { BorrowedBookService } from './borrowed-book.service';
import { BorrowedBookController } from './borrowed-book.controller';

@Module({
  controllers: [BorrowedBookController],
  providers: [BorrowedBookService]
})
export class BorrowedBookModule {}
