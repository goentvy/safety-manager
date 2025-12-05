import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Database } from './types/supabase';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 간단한 헬스체크
  @Get()
  getHello(): string {
    return 'NestJS + Supabase 연결 테스트 중!';
  }

  // Supabase에서 데이터 읽기 테스트
  @Get('supabase-test')
  async getSupabaseTest(): Promise<Database['public']['Tables']['test_table']['Row'][]> {
    return this.appService.getTestData();
  }
}
