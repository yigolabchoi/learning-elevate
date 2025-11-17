# Learning Elevate – 개발 환경 설정 가이드

## 📋 문서 정보

- **작성일**: 2025-11-17
- **버전**: 1.0.0
- **상태**: 활성

---

## 목차

1. [시스템 요구사항](#1-시스템-요구사항)
2. [개발 환경 구성](#2-개발-환경-구성)
3. [프로젝트 클론 및 설치](#3-프로젝트-클론-및-설치)
4. [환경 변수 설정](#4-환경-변수-설정)
5. [개발 서버 실행](#5-개발-서버-실행)
6. [문제 해결](#6-문제-해결)

---

## 1. 시스템 요구사항

### 1-1. 기술 스택

**Frontend (현재 개발 중)**
- React 18.x
- Vite 5.x (빌드 도구)
- React Router 6.x (라우팅)
- Tailwind CSS 3.x (스타일링)
- Axios (API 통신)
- Zustand (상태 관리)

**Backend (향후 개발 예정)**
- Node.js 18.x
- Express 4.x
- PostgreSQL (DB)
- Prisma (ORM)

### 1-2. 필수 소프트웨어

- **Node.js**: v18.x 이상
- **npm** 또는 **yarn**
- **Git**

### 1-3. 권장 개발 도구

- **IDE**: Visual Studio Code
- **VS Code 확장**:
  - ESLint
  - Prettier - Code formatter
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets
  - Auto Rename Tag
  - GitLens

---

## 2. 개발 환경 구성

### 2-1. Node.js 설치

#### macOS (Homebrew)
```bash
brew install node@18
node --version  # v18.x.x 확인
npm --version   # 9.x.x 확인
```

#### Windows
1. [Node.js 공식 사이트](https://nodejs.org/)에서 LTS 버전 다운로드
2. 설치 후 버전 확인:
```bash
node --version
npm --version
```

### 2-2. VS Code 확장 설치

1. VS Code 실행
2. Extensions (Cmd/Ctrl + Shift + X) 열기
3. 다음 확장 설치:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - ES7+ React/Redux/React-Native snippets

---

## 3. 프로젝트 클론 및 설치

### 3-1. 프로젝트 구조 확인

```
Learning/
├── frontend/           # React 앱
├── backend/           # Express API (향후)
├── docs/              # 문서
├── .cursorrules
└── README.md
```

### 3-2. 의존성 설치

```bash
# 프로젝트 루트로 이동
cd Learning

# Frontend 의존성 설치
cd frontend
npm install
```

### 3-3. 설치된 주요 패키지

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "axios": "^1.7.7",
    "zustand": "^4.5.5",
    "clsx": "^2.1.1",
    "lucide-react": "^0.445.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.2",
    "vite": "^5.4.8",
    "tailwindcss": "^3.4.13",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "eslint": "^9.11.1",
    "prettier": "^3.3.3"
  }
}
```

---

## 4. 환경 변수 설정

### 4-1. 환경 변수 파일 생성

```bash
cd frontend
cp .env.example .env.local
```

### 4-2. 환경 변수 설정

```env
# .env.local

# API URL (현재는 Mock 데이터 사용, 추후 백엔드 연동)
VITE_API_BASE_URL=http://localhost:4000/api/v1

# 환경
VITE_ENV=development

# AI API (추후 설정)
# VITE_OPENAI_API_KEY=your-api-key
```

---

## 5. 개발 서버 실행

### 5-1. 개발 서버 시작

```bash
cd frontend
npm run dev
```

### 5-2. 접속 확인

브라우저에서 다음 URL로 접속:
- **로컬**: http://localhost:5173

### 5-3. 사용 가능한 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 린트 검사
npm run lint

# 코드 포맷팅
npm run format
```

---

## 6. 프로젝트 구조

```
frontend/
├── src/
│   ├── pages/                 # 페이지 컴포넌트
│   │   ├── auth/             # 인증 페이지
│   │   ├── teacher/          # 교사용 페이지
│   │   ├── student/          # 학생용 페이지
│   │   └── parent/           # 학부모용 페이지
│   ├── components/           # 재사용 컴포넌트
│   │   ├── ui/              # 기본 UI 컴포넌트
│   │   ├── features/        # 기능별 컴포넌트
│   │   └── layout/          # 레이아웃 컴포넌트
│   ├── lib/                  # 라이브러리 및 유틸리티
│   │   ├── api/             # API 클라이언트
│   │   ├── hooks/           # 커스텀 훅
│   │   ├── utils/           # 유틸리티 함수
│   │   └── constants/       # 상수
│   ├── store/               # Zustand 스토어
│   ├── types/               # TypeScript 타입
│   ├── styles/              # 스타일
│   ├── App.tsx              # 앱 루트
│   └── main.tsx             # 엔트리 포인트
├── public/                   # 정적 파일
├── .env.example             # 환경 변수 예시
├── .env.local               # 로컬 환경 변수
├── index.html               # HTML 템플릿
├── vite.config.ts           # Vite 설정
├── tailwind.config.js       # Tailwind 설정
├── tsconfig.json            # TypeScript 설정
└── package.json
```

---

## 7. 개발 가이드

### 7-1. 새로운 페이지 추가

1. `src/pages/` 아래 페이지 컴포넌트 생성
2. `src/App.tsx`에 라우트 추가
3. 문서의 화면 설계서 참고

```tsx
// src/pages/teacher/Dashboard.tsx
export const TeacherDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="heading-1">교사 대시보드</h1>
    </div>
  );
};
```

### 7-2. 새로운 컴포넌트 추가

1. 먼저 `docs/design/component-library.md` 확인
2. 기존 컴포넌트 재사용 검토
3. 필요시 `src/components/ui/` 아래 생성

```tsx
// src/components/ui/Button.tsx
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button = ({ 
  children, 
  variant = 'primary',
  onClick 
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg font-medium transition-colors',
        variant === 'primary' && 'bg-primary-500 text-white hover:bg-primary-600',
        variant === 'secondary' && 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### 7-3. API 통신 (Mock 데이터)

현재는 백엔드가 없으므로 Mock 데이터 사용:

```tsx
// src/lib/api/mock/curriculum.ts
export const mockCurriculumData = [
  {
    id: '1',
    name: '2025 중1 영어 기초',
    subject: 'english',
    unitCount: 10,
  },
];

// src/lib/api/curriculum.ts
import { mockCurriculumData } from './mock/curriculum';

export const curriculumApi = {
  getList: async () => {
    // 추후 실제 API 호출로 대체
    return Promise.resolve(mockCurriculumData);
  },
};
```

### 7-4. 상태 관리 (Zustand)

```tsx
// src/store/authStore.ts
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

// 사용
import { useAuthStore } from '@/store/authStore';

const { user, login } = useAuthStore();
```

---

## 8. 문제 해결

### 8-1. 포트 충돌

```bash
# 다른 포트로 실행
npm run dev -- --port 3000
```

### 8-2. 의존성 충돌

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

### 8-3. Tailwind 클래스 인식 안됨

1. VS Code에서 Tailwind CSS IntelliSense 확장 설치 확인
2. `tailwind.config.js`의 content 경로 확인

### 8-4. 환경 변수 인식 안됨

- Vite에서는 환경 변수 앞에 `VITE_` 접두사 필요
- 변경 후 개발 서버 재시작 필요

---

## 9. 다음 단계

1. ✅ [프로젝트 구조](./project-structure.md) 이해하기
2. ✅ [코딩 컨벤션](./coding-conventions.md) 숙지하기
3. ✅ [디자인 시스템](../design/design-system.md) 참고하여 개발
4. ✅ [화면 설계서](../design/screen-design.md) 보고 페이지 구현

---

## 10. 관련 문서

- [프로젝트 구조](./project-structure.md)
- [코딩 컨벤션](./coding-conventions.md)
- [디자인 시스템](../design/design-system.md)
- [컴포넌트 라이브러리](../design/component-library.md)
- [화면 설계서](../design/screen-design.md)

---

## 변경 이력

| 날짜 | 버전 | 변경 내용 | 작성자 |
|------|------|----------|--------|
| 2025-11-17 | 1.0.0 | React + Vite 기반 초기 셋팅 완료 | Dev Team |

---

**문서 상태**: 🟢 활성 (Active)  
**다음 업데이트**: 백엔드 개발 시작 시
