import { useState } from "react";
import SearchResultCard from "../components/common/SearchResultCard";

interface LawItem {
  title: string;
  content: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<LawItem[]>([]);

  const handleSearch = async () => {
    // const apiKey = import.meta.env.VITE_API_KEY;
    // const url = `https://apis.data.go.kr/B552468/lawSmartSearch/getLawSmartSearch?serviceKey=${apiKey}&search=${encodeURIComponent(query)}&type=json`;

    const res = await fetch('http://localhost:4000/law/search?q=테스트', {
      method: 'GET',
      credentials: 'include',
    });
    const data = await res.json();
    const items: LawItem[] = data.response.body.items.item || [];
    setResults(items);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">산업안전보건법 스마트검색</h1>
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="검색어 입력 (예: 말비계)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
        >
          검색
        </button>
      </div>

      {results.length > 0 ? (
        results.map((item, idx) => (
          <SearchResultCard key={idx} title={item.title} content={item.content} />
        ))
      ) : (
        <p className="text-gray-500">검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
