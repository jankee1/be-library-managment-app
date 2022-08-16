import { BorrowedBookEntity } from './../borrowed-book/entities/borrowed-book.entity';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DataSource } from 'typeorm';

@Injectable()
export class CronService {

    private daysBack: number = 30;
    private daysBackForFees = new Date(new Date().setDate(new Date().getDate() - this.daysBack))

    constructor(private dataSource: DataSource){}

    @Cron(CronExpression.EVERY_5_SECONDS )
    async calculateFees() {

        const borrowedBooks = await this.dataSource
            .createQueryBuilder()
            .select(["Id", "fees"])
            .from(BorrowedBookEntity, "BorrowedBookEntity")
            .where("borrowedAt < :daysBackForFees", {daysBackForFees: this.daysBackForFees})
            .execute()

        console.log(borrowedBooks)
    }
}
