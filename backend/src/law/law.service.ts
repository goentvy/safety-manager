import { Injectable } from '@nestjs/common';
import { LawItem, LawResponse } from './law.types';

@Injectable()
export class LawService {
  async searchLaw(query: string): Promise<{ items: LawItem[] }> {
    const apiKey = process.env.API_KEY;
    const url = `https://apis.data.go.kr/B552468/lawSmartSearch/getLawSmartSearch?serviceKey=${apiKey}&search=${encodeURIComponent(query)}&type=json`;

    const res = await fetch(url);
    const text = await res.text();
    console.log(text);
    const data = (await res.json()) as LawResponse;

    const items = data?.response?.body?.items?.item ?? [];

    return { items };
  }
}
