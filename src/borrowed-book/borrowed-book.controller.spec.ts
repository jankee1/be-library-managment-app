import { Test, TestingModule } from '@nestjs/testing';
import { BorrowedBookController } from './borrowed-book.controller';
import { BorrowedBookService } from './borrowed-book.service';

describe('BorrowedBooksController', () => {
  let controller: BorrowedBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowedBookController],
      providers: [BorrowedBookService],
    }).compile();

    controller = module.get<BorrowedBookController>(BorrowedBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
