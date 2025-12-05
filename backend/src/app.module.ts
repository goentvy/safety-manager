import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LawController } from './law/law.controller';
import { LawService } from './law/law.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [LawController],
  providers: [LawService],
})
export class AppModule {}
