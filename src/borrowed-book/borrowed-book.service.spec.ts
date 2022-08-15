import { Test, TestingModule } from '@nestjs/testing';
import { BorrowedBookService } from './borrowed-book.service';

describe('BorrowedBooksService', () => {
  let service: BorrowedBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BorrowedBookService],
    }).compile();

    service = module.get<BorrowedBookService>(BorrowedBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
