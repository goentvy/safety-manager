import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './types/supabase';

@Injectable()
export class AppService {
  private supabase: SupabaseClient<Database>;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL')!;
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY')!;
    this.supabase = createClient<Database>(supabaseUrl, supabaseKey);
  }

  async getTestData(): Promise<Database['public']['Tables']['test_table']['Row'][]> {
    const { data, error } = await this.supabase.from('test_table').select('*');

    if (error) throw error;
    return data ?? [];
  }
}
