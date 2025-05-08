import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';

//TypeORM imports configuración
import { TypeOrmModule } from '@nestjs/typeorm';

import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BookResolver, BookService],
})
export class BookModule {}
