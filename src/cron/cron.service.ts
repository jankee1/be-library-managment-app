import { FEE_PER_DAY } from './../types/consts/consts';
import { DAYS_TO_BORROW_BOOK_FROM_LIBRARY } from './../types/';
import { BorrowedBookEntity } from './../borrowed-book/entities/borrowed-book.entity';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LessThan } from 'typeorm';

@Injectable()
export class CronService {

    private daysBackForFees: Date = new Date(new Date().setDate(new Date().getDate() - DAYS_TO_BORROW_BOOK_FROM_LIBRARY))

    @Cron("1 0 * * *") // every day at 00:01
    async addFees(): Promise<void> {

        const borrowedBooks: BorrowedBookEntity[]  = await BorrowedBookEntity.find({
            where: {borrowedAt: LessThan(this.daysBackForFees)},
        })

        for(const book of borrowedBooks) {
            book.fees = book.fees + FEE_PER_DAY
            await book.save();
        }
    }
}
