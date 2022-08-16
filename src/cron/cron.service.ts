import { BorrowedBookEntity } from './../borrowed-book/entities/borrowed-book.entity';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LessThan } from 'typeorm';

@Injectable()
export class CronService {

    private additionalFees: number = 1
    private daysBack: number = 30;
    private daysBackForFees: Date = new Date(new Date().setDate(new Date().getDate() - this.daysBack))

    @Cron("1 0 * * *") // every day at 00:01
    async addFees() {

        const borrowedBooks: BorrowedBookEntity[]  = await BorrowedBookEntity.find({
            where: {borrowedAt: LessThan(this.daysBackForFees)},
        })

        for(const book of borrowedBooks) {
            book.fees = book.fees + this.additionalFees
            await book.save();
        }
    }
}
