# safety-manager

건설현장에서 쉽게 산업안전보건법을 확인할수있는 웹앱입니다.

---

## 📘 프로젝트 소개
`safety-manager`는 건설현장에서 발생하는 불합리·위험 상황을 사전에 확인할수 있도록 산업안전보건법을 찾아보기위한 웹앱입니다.  
- 검색을 통해 `사다리`나 `말비계`와 같은 장비나 보호구 등에 대한 산업안전보건법을 손쉽게 알아볼수있습니다.

---

## 📂 프로젝트 구조
```text
safety-manager/ 
├── frontend/ # React
├── backend/ # Nest.js API 서버
└── README.md # 프로젝트 문서
```

---

## ⚙️ 개발 스택
**Frontend**
- **Framework**: React + Vite
- **Language**: JavaScript (ES6+)
- **UI Library**: TailwindCSS
- **State Management**: React Query / Zustand
- **Build Tool**: Vite

**Backend**
- **Framework**: Nest.js
- **Database**: Supabase(Postgres)
- **API**: RESTful API, Swagger(OpenAPI)

**Storage**
- AWS S3
- Supabase Storage
**DevOps**
- Docker
- GitHub Actions

---

## 🚀 배포 플로우
1. GitHub → 코드 푸시  
2. GitHub Actions → 빌드 & 테스트 (Jest)  
3. Docker → 이미지 빌드 & 저장
4. 배포는 고민중