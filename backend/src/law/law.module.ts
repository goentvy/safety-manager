import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LawService } from './law.service';
import { LawController } from './law.controller';

@Module({
  imports: [HttpModule],
  controllers: [LawController],
  providers: [LawService],
})
export class LawModule {}
