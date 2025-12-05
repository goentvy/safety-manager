import { Controller, Get, Query } from '@nestjs/common';
import { LawService } from './law.service';
import { LawItem } from './law.types';

@Controller('law')
export class LawController {
  constructor(private readonly lawService: LawService) {}

  @Get('search')
  async search(@Query('q') q: string): Promise<{ items: LawItem[] }> {
    return this.lawService.searchLaw(q);
  }
}
