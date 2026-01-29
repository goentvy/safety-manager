import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { LawItem, LawResponse } from './law.types';

@Injectable()
export class LawService {
  constructor(private readonly httpService: HttpService) {}

  async searchLaw(query: string): Promise<{ items: LawItem[] }> {
    const apiKey = process.env.API_KEY;
    const url = 'https://apis.data.go.kr/B552468/srch/smartSearch';
    const params = new URLSearchParams({
      serviceKey: apiKey,
      pageNo: '1',
      numOfRows: '10',
      searchValue: query,
      category: '5',
    });

    try {
      // ✅ Axios 응답 타입을 명시적으로 지정
      const { data }: { data: LawResponse } = await this.httpService.axiosRef.get<LawResponse>(
        `${url}?${params.toString()}`,
      );

      const items: LawItem[] = data?.response?.body?.items?.item ?? [];
      return { items };
    } catch (err) {
      // ✅ AxiosError로 캐스팅하여 안전하게 접근
      const error = err as AxiosError;
      const message: string =
        (error.response?.data as string) || error.message || '법령 검색 API 호출 실패';

      throw new HttpException({ items: [], error: message }, HttpStatus.BAD_GATEWAY);
    }
  }
}
