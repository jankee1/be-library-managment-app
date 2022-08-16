import { DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } from './../settings';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowedBookModule } from './borrowed-book/borrowed-book.module';
import { CronModule } from './cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [UserModule, BookModule, AdminModule, 
    TypeOrmModule.forRoot({
    type: DB_TYPE,
    host : DB_HOST,
    port: DB_PORT,
    username : DB_USERNAME,
    password: DB_PASSWORD,
    database : DB_NAME,
    entities: ["dist/**/**.entity{.ts,.js}"],
    bigNumberStrings: false,
    logging: false,
    synchronize : true,
  }), BorrowedBookModule, CronModule,
  ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
