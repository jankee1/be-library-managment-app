import { PartialType } from '@nestjs/mapped-types';
import { CreateBorrowedBookDto } from './create-borrowed-book.dto';

export class UpdateBorrowedBookDto extends PartialType(CreateBorrowedBookDto) {}
