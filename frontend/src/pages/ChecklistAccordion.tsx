import { useState, type JSX } from "react";

interface Category {
  title: string;
  items: string[];
}

const categories: Category[] = [
  {
    title: "🦺 개인보호구",
    items: [
      "2-6) 개인보호구 미착용·미활용 (보안경, 방독마스크, 활선보호구 등)",
      "2-26) 건염성질환 관련 의료기관 소견서 미제출",
      "2-27) 유해위험성 검진 미실시 후 작업 투입",
    ],
  },
  {
    title: "🏗️ 작업환경·현장 관리",
    items: [
      "1-1) 추락 높이 2m 이상 장소에서 안전고리 미사용",
      "1-2) 통제구간 무단 진입 (양중, 밀폐, 상하동시 작업 등)",
      "2-1) 지정된 통로 미이용",
      "2-2) 작업 전/후 정리정돈 미실시",
      "2-15) 안전통로 미확보",
      "2-16) 조도 미확보 및 소음 발생",
      "2-18) 작업구역·통제구역 미설정",
      "2-22) 작업구간 내 현황판 미비치",
    ],
  },
  {
    title: "⚙️ 장비·도구",
    items: [
      "1-3) 장비 안전장치 해체",
      "1-4) 승인받지 않은 작업/도구 사용",
      "2-5) 안전장치 임의 해체",
      "2-17) 작업도구 부적합 (사다리, 말비계 등)",
      "2-23) 승인되지 않은 작업도구 사용",
      "2-24) 비계작업 시 안전난간 미설치",
      "2-30) 철재 사다리 임의 사용",
    ],
  },
  {
    title: "📋 작업 절차·문서",
    items: [
      "1-5) 점검표 허위 작성, 허가서 위조",
      "2-10) 작업계획서 미비치",
      "2-12) 공도구 매뉴얼 사용기준 미준수",
      "2-13) SOP, 위험성 평가 등 작업순서 미준수",
      "2-19) 재발방지대책 미준수",
      "2-20) One Sheet 안전기준 미준수",
      "2-21) 점검항목·교육사항 누락",
      "2-28) 작업중지 요청 시 조치기한 내 미제출",
      "2-29) 신규자/청년근로자/고위험군 상담 미참여",
    ],
  },
  {
    title: "🔒 보안·행동",
    items: [
      "1-6) 인명 피해 및 안전사고로 연결될 수 있는 행위",
      "1-7) 보안 기준 위반 (외부 저장매체 반입, MDM 미실행 등)",
      "2-11) 유도원/화재감시자 역할 불이행",
      "2-25) 장비물품 포장 규정 미표시",
      "2-31) 위험작업 중 스마트폰 사용 (3회 적발 시 적용)",
    ],
  },
];

export default function ChecklistAccordion(): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [report, setReport] = useState<string>("");

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleItem = (item: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  // ✅ 보고서 자동 생성 로직
  const generateReport = (): string => {
    const violations = Object.keys(checkedItems).filter((item) => checkedItems[item]);

    if (violations.length === 0) {
      return "위반 항목이 선택되지 않았습니다.";
    }

    // 오늘 날짜 MMDD 형식
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const dateLabel = `${month}${day}`;

    // 번호 정렬
    const sortedViolations = violations.sort((a, b) => {
      const matchA = a.match(/^(\d+)-(\d+)\)/);
      const matchB = b.match(/^(\d+)-(\d+)\)/);

      if (matchA && matchB) {
        const [, majorA, minorA] = matchA;
        const [, majorB, minorB] = matchB;
        const numMajorA = parseInt(majorA, 10);
        const numMinorA = parseInt(minorA, 10);
        const numMajorB = parseInt(majorB, 10);
        const numMinorB = parseInt(minorB, 10);

        if (numMajorA !== numMajorB) return numMajorA - numMajorB;
        return numMinorA - numMinorB;
      }
      return a.localeCompare(b);
    });

    return `
[ 부적합 현황공유 ] ${dateLabel} - 안전

1. 작성자 : (작성자 입력)
2. 협력사명 : (협력사 입력)
3. 위치 : (위치 입력)
4. 담당자
- 삼성물산 : (담당자 입력)
- 위반자 : (위반자 입력)
- 확인자 : (확인자 입력)
5. 해당팀장 : (팀장 입력)

6. 현장 불합리사항 :
체크리스트 점검 결과 위반사항 발생

7. 위반항목
${sortedViolations.map((v) => `- ${v}`).join("\n")}
    `;
  };

  // ✅ 클립보드 복사 기능
  const copyToClipboard = async () => {
    const reportText = generateReport();
    setReport(reportText.trim());
    try {
      await navigator.clipboard.writeText(reportText);
      alert("보고서가 클립보드에 복사되었습니다!");
    } catch (err) {
      alert("클립보드 복사에 실패했습니다.");
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
        산업안전보건법 체크리스트
      </h1>

      <div className="space-y-4">
        {categories.map((cat, index) => (
          <div key={index} className="border rounded-lg shadow-sm overflow-hidden">
            {/* 카테고리 버튼 */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 bg-blue-50 hover:bg-blue-100 font-semibold text-blue-800 border-b border-blue-200 flex justify-between items-center transition"
            >
              <span>{cat.title}</span>
              <span className="text-xs sm:text-sm text-gray-500">
                {openIndex === index ? "▲" : "▼"}
              </span>
            </button>
            {/* 체크리스트 */}
            {openIndex === index && (
              <div className="p-3 sm:p-4 bg-gray-50 space-y-2 sm:space-y-3 border-l-4 border-blue-300">
                {cat.items.map((item, i) => (
                  <label key={i} className="block">
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        checked={!!checkedItems[item]}
                        onChange={() => toggleItem(item)}
                        className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span
                        className={`text-gray-700 ${
                          checkedItems[item] ? "font-bold text-blue-600" : ""
                        }`}
                      >
                        {item}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 보고서 자동 생성 및 복사 버튼 */}
      <button
        onClick={copyToClipboard}
        className="mt-4 sm:mt-6 w-full bg-blue-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow hover:bg-blue-700 transition text-sm sm:text-base"
      >
        불합리 보고서 생성 및 클립보드 복사
      </button>

      {/* 생성된 보고서 미리보기 */}
      {report && (
        <div className="mt-4 sm:mt-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
            보고서 미리보기
          </h2>
          <pre className="p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-lg whitespace-pre-wrap text-xs sm:text-sm font-mono text-gray-700 overflow-x-auto">
            {report}
          </pre>
        </div>
      )}
    </div>
  );
}
