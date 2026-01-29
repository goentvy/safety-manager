import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LawController } from './law/law.controller';
import { LawService } from './law/law.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
  ],
  controllers: [LawController],
  providers: [LawService],
})
export class AppModule {}
