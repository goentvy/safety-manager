import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './types/supabase';

@Injectable()
export class AppService {
  private supabase: SupabaseClient<Database>;

  constructor() {
    this.supabase = createClient<Database>(
      process.env.SUPABASE_URL ?? '',
      process.env.SUPABASE_KEY ?? '',
    );
  }

  async getHello(): Promise<{ message: string }> {
    const { data, error } = await this.supabase.from('test_table').select('*');
    console.log(data);

    if (error) {
      console.error('Supabase 에러:', error);
      return { message: 'Supabase 연결 실패' };
    }

    return { message: `Supabase 연결 성공: ${data?.length ?? 0}개 항목` };
  }
}
