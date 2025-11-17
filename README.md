# Learning Elevate

> AI 기반 맞춤형 학습 플랫폼

Learning Elevate는 선생님/강사를 위한 AI 기반 학습 향상 플랫폼으로,
교사가 정의한 커리큘럼을 바탕으로 학생 수준에 맞는 문제를 자동 생성하고,
학생 답안을 AI가 분석하여 취약 영역을 설명·보완하며,
교사는 이를 검토·컨펌만 하는 구조의 서비스입니다.

## 🚀 빠른 시작

### Frontend 개발 서버 실행

```bash
cd frontend
npm install
npm run dev
```

브라우저에서 http://localhost:5173 으로 접속하세요.

### 테스트 계정

- **교사**: teacher@example.com / password123
- **학생**: student@example.com / password123
- **학부모**: parent@example.com / password123

## 🛠 기술 스택

### Frontend (현재 개발 중)
- **React 19** - UI 라이브러리
- **Vite** - 빌드 도구
- **React Router 7** - 라우팅
- **Tailwind CSS 4** - 스타일링
- **Zustand 5** - 상태 관리
- **Axios** - API 통신

### Backend (향후 개발 예정)
- **Node.js 18+** - 런타임
- **Express 4** - 웹 프레임워크
- **PostgreSQL** - 데이터베이스
- **Prisma** - ORM

## 📁 프로젝트 구조

```
Learning/
├── frontend/              # React 프론트엔드
│   ├── src/
│   │   ├── pages/        # 페이지 컴포넌트
│   │   ├── components/   # 재사용 컴포넌트
│   │   ├── lib/          # 유틸리티 및 API
│   │   ├── store/        # 상태 관리
│   │   └── types/        # TypeScript 타입
│   ├── public/           # 정적 파일
│   └── package.json
├── backend/              # Express 백엔드 (향후)
├── docs/                 # 📚 프로젝트 문서
│   ├── planning/        # 기획 문서
│   ├── design/          # 디자인 문서
│   ├── development/     # 개발 문서
│   └── api/             # API 문서
├── .cursorrules         # Cursor AI 개발 규칙
├── .gitignore
└── README.md
```

## 📚 문서

모든 프로젝트 문서는 [`docs/`](./docs/) 폴더에서 확인할 수 있습니다.

### 시작하기

- **기획자/PM**: [서비스 기획서](./docs/planning/service-plan.md)부터 시작하세요
- **디자이너**: [디자인 시스템](./docs/design/design-system.md)을 참고하세요
- **개발자**: [개발 환경 설정](./docs/development/setup-guide.md)으로 시작하세요

### 주요 문서

#### 📋 기획 문서
- [서비스 기획서](./docs/planning/service-plan.md) - 서비스 개요 및 핵심 가치
- [기능 명세서](./docs/planning/feature-specification.md) - 상세 기능 정의
- [사용자 시나리오](./docs/planning/user-scenarios.md) - 사용자별 시나리오

#### 🎨 디자인 문서
- [디자인 시스템](./docs/design/design-system.md) - 색상, 타이포그래피, 간격 등
- [컴포넌트 라이브러리](./docs/design/component-library.md) - 재사용 가능한 UI 컴포넌트
- [화면 설계서](./docs/design/screen-design.md) - 주요 화면 구조 및 IA

#### 💻 개발 문서
- [개발 환경 설정](./docs/development/setup-guide.md) - 로컬 개발 환경 구축
- [프로젝트 구조](./docs/development/project-structure.md) - 폴더 구조 및 파일 구성
- [코딩 컨벤션](./docs/development/coding-conventions.md) - 코드 작성 규칙
- [데이터베이스 스키마](./docs/development/database-schema.md) - DB 설계 및 ERD

#### 🔌 API 문서
- [API 명세서](./docs/api/api-specification.md) - RESTful API 엔드포인트 정의

## 🎯 핵심 기능

### MVP (Phase 1) - 현재 개발 중

- ✅ 교사 커리큘럼 등록 (웹 폼 기반)
- ✅ 단원별 문제 자동 생성 (객관식 + 단답형)
- ✅ 학생 문제 풀이 및 자동 채점
- ✅ AI 기본 피드백 (정오 설명 + 정답 예시)
- ✅ 교사 검토/컨펌 기능
- ✅ 학생별 학습 기록 및 약점 태그
- ✅ 학부모용 요약 리포트

### 구현된 화면 (Mock 데이터)

- ✅ 로그인 페이지
- ✅ 교사 대시보드
- ✅ 학생 대시보드
- ✅ 학부모 대시보드

### 향후 계획

- 📝 커리큘럼 관리 페이지
- 📝 문제 생성 및 관리 페이지
- 📝 과제 배정 페이지
- 📝 학생 관리 페이지
- 📝 답안 검토 페이지
- 📝 학습 분석 페이지

## 👥 사용자 유형

- **교사/강사**: 커리큘럼 관리 및 학생 학습 감독
- **학생**: 문제 풀이 및 학습 수행
- **학부모**: 자녀 학습 현황 모니터링
- **운영자**: 시스템 관리 및 데이터 분석

## 🤝 개발 가이드

### 1. 문서 우선 개발

새로운 기능을 개발하기 전에 반드시 문서를 확인하세요:

```
1. 기능 명세서에서 해당 기능의 요구사항 확인
2. 화면 설계서에서 UI/UX 구조 확인
3. 디자인 시스템에서 사용할 컴포넌트 및 스타일 확인
4. 코딩 컨벤션 준수
```

### 2. Cursor에서 개발하기

`.cursorrules` 파일이 자동으로 적용되어 문서 기반 개발 가이드를 제공합니다:

```
"docs/planning/feature-specification.md의 커리큘럼 등록 기능을 구현해줘"
"docs/design/component-library.md의 Button 컴포넌트를 만들어줘"
```

### 3. 코딩 컨벤션

- TypeScript/React 표준 준수
- Tailwind CSS로 스타일링
- 컴포넌트 재사용 최대화
- 문서와 코드 동시 업데이트

자세한 내용은 [코딩 컨벤션](./docs/development/coding-conventions.md)을 참고하세요.

## 📝 Git 커밋 메시지

Conventional Commits 준수:

```bash
feat(curriculum): add curriculum creation form
fix(auth): resolve login redirect issue
docs(api): update API documentation
```

## 🔧 문제 해결

### 포트 충돌

```bash
npm run dev -- --port 3000
```

### 의존성 문제

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### 환경 변수

`frontend/.env.local` 파일을 생성하세요. 자세한 내용은 [ENV_SETUP.md](./frontend/ENV_SETUP.md)를 참고하세요.

## 📞 문의

프로젝트 관련 문의사항은 프로젝트 관리자에게 연락하세요.

---

**Version**: 0.1.0  
**Last Updated**: 2025-11-17  
**Status**: 🟢 Frontend Development in Progress
