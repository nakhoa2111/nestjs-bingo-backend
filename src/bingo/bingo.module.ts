import { Module } from '@nestjs/common';
import { BingoService } from './bingo.service';

@Module({
  providers: [BingoService],
})
export class BingoModule {}
