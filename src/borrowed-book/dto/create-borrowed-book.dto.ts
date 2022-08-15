import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateBorrowedBookDto {
    
    @IsUUID()
    @IsNotEmpty()
    bookId: string;
}
