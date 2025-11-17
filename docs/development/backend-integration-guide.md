# Backend Integration Guide

## 📋 문서 정보

- **작성일**: 2025-11-17
- **버전**: 1.0.0
- **대상**: 백엔드 개발자 및 통합 담당자

---

## 목차

1. [개요](#1-개요)
2. [API 클라이언트 구조](#2-api-클라이언트-구조)
3. [환경 설정](#3-환경-설정)
4. [인증 시스템](#4-인증-시스템)
5. [API 엔드포인트 매핑](#5-api-엔드포인트-매핑)
6. [에러 핸들링](#6-에러-핸들링)
7. [Mock API → Real API 전환](#7-mock-api--real-api-전환)
8. [테스트 가이드](#8-테스트-가이드)

---

## 1. 개요

Learning Elevate 프론트엔드는 백엔드 통합을 위해 준비된 구조를 가지고 있습니다.

### 현재 상태
- ✅ Mock API 레이어 완성
- ✅ 통합 API 클라이언트 구성
- ✅ 타입 정의 완료
- ✅ 에러 핸들링 표준화

### 통합 단계
1. 환경 변수 설정
2. API 클라이언트 활성화
3. Mock 모드 비활성화
4. 엔드포인트별 테스트

---

## 2. API 클라이언트 구조

### 2-1. 파일 구조

```
frontend/src/lib/api/
├── client.ts           # 통합 API 클라이언트 (axios 기반)
├── endpoints/          # 실제 API 엔드포인트 함수들
│   ├── auth.ts
│   ├── classes.ts
│   ├── curricula.ts
│   ├── submissions.ts
│   └── ...
└── mock/               # Mock API (개발용)
    ├── auth.ts
    ├── classes.ts
    └── ...
```

### 2-2. API 클라이언트 사용법

```typescript
import { apiClient } from '@/lib/api/client';

// GET 요청
const data = await apiClient.get<User[]>('/users');

// POST 요청
const newUser = await apiClient.post<User>('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// PUT 요청
const updatedUser = await apiClient.put<User>(`/users/${userId}`, userData);

// DELETE 요청
await apiClient.delete(`/users/${userId}`);

// File Upload
const formData = new FormData();
formData.append('file', file);
const result = await apiClient.upload<UploadResult>('/upload', formData);
```

---

## 3. 환경 설정

### 3-1. 환경 변수 파일 생성

프론트엔드 루트에 `.env.local` 파일 생성:

```bash
# Development
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
VITE_USE_MOCK_API=false  # Mock 모드 비활성화

# Production
# VITE_API_BASE_URL=https://api.learning-elevate.com/v1
# VITE_USE_MOCK_API=false
```

### 3-2. 환경별 설정

**개발 환경 (.env.development)**
```bash
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCK_API=true
VITE_APP_ENV=development
```

**스테이징 환경 (.env.staging)**
```bash
VITE_API_BASE_URL=https://staging-api.learning-elevate.com/api
VITE_USE_MOCK_API=false
VITE_APP_ENV=staging
```

**프로덕션 환경 (.env.production)**
```bash
VITE_API_BASE_URL=https://api.learning-elevate.com/api
VITE_USE_MOCK_API=false
VITE_APP_ENV=production
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_REPORTING=true
```

---

## 4. 인증 시스템

### 4-1. 인증 흐름

```
1. 사용자 로그인
   → POST /auth/login
   → Response: { accessToken, refreshToken, user }

2. 토큰 저장
   → localStorage.setItem('accessToken', token)

3. API 요청 시 자동 헤더 추가
   → Authorization: Bearer <accessToken>

4. 토큰 만료 시 (401 응답)
   → 자동 로그아웃 처리
   → /login 페이지로 리다이렉트
```

### 4-2. 백엔드 요구사항

#### 로그인 API
```
POST /auth/login

Request:
{
  "email": "teacher@example.com",
  "password": "password123"
}

Response (200 OK):
{
  "success": true,
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "teacher@example.com",
      "name": "김영희",
      "role": "teacher"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### 토큰 갱신 API
```
POST /auth/refresh

Request:
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}

Response (200 OK):
{
  "success": true,
  "data": {
    "accessToken": "new-access-token",
    "refreshToken": "new-refresh-token"
  }
}
```

---

## 5. API 엔드포인트 매핑

### 5-1. 표준 응답 형식

모든 API는 다음 형식을 따라야 합니다:

#### 성공 응답
```typescript
{
  "success": true,
  "data": T,  // 실제 데이터
  "message": "Success (optional)"
}
```

#### 에러 응답
```typescript
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}  // Optional additional info
  }
}
```

### 5-2. 주요 엔드포인트

#### 인증
- `POST /auth/login` - 로그인
- `POST /auth/signup` - 회원가입
- `POST /auth/logout` - 로그아웃
- `POST /auth/refresh` - 토큰 갱신

#### 사용자 관리 (Admin)
- `GET /admin/users?role=teacher&page=1&limit=20` - 사용자 목록
- `POST /admin/users` - 사용자 생성
- `PUT /admin/users/:id` - 사용자 수정
- `DELETE /admin/users/:id` - 사용자 삭제

#### 클래스 관리
- `GET /admin/classes` - 클래스 목록
- `POST /admin/classes` - 클래스 생성
- `GET /admin/classes/:id` - 클래스 상세
- `PUT /admin/classes/:id` - 클래스 수정
- `DELETE /admin/classes/:id` - 클래스 삭제

#### 커리큘럼 (Teacher)
- `GET /teacher/curricula` - 커리큘럼 목록
- `POST /teacher/curricula` - 커리큘럼 생성
- `GET /teacher/curricula/:id` - 커리큘럼 상세
- `PUT /teacher/curricula/:id` - 커리큘럼 수정
- `DELETE /teacher/curricula/:id` - 커리큘럼 삭제

#### 문제 세트 (Teacher)
- `GET /teacher/problem-sets` - 문제 세트 목록
- `POST /teacher/problem-sets` - 문제 세트 생성
- `POST /teacher/problem-sets/generate` - AI 문제 생성
- `GET /teacher/problem-sets/:id` - 문제 세트 상세

#### 과제 (Teacher)
- `GET /teacher/assignments` - 과제 목록
- `POST /teacher/assignments` - 과제 생성
- `GET /teacher/assignments/:id` - 과제 상세

#### 제출물 (Teacher)
- `GET /teacher/submissions?classId=&assignmentId=&status=` - 제출물 목록
- `GET /teacher/submissions/:id` - 제출물 상세
- `PATCH /teacher/submissions/:id/confirm` - 제출물 확인
- `PATCH /teacher/submissions/:id/feedback` - 피드백 작성

#### 학생 과제
- `GET /student/assignments` - 내 과제 목록
- `GET /student/assignments/:id` - 과제 상세
- `GET /student/assignments/:id/questions` - 문제 가져오기
- `POST /student/assignments/:id/submit` - 과제 제출

#### 학생 이력
- `GET /student/history` - 학습 이력
- `GET /student/history/:id` - 상세 피드백

#### 학부모
- `GET /parent/children` - 자녀 목록
- `GET /parent/children/:id/dashboard` - 자녀 대시보드
- `GET /parent/children/:id/details?period=30` - 자녀 상세 리포트
- `GET /parent/notifications` - 알림 목록
- `PATCH /parent/notifications/:id/read` - 알림 읽음 처리

---

## 6. 에러 핸들링

### 6-1. HTTP 상태 코드

| 코드 | 의미 | 프론트엔드 처리 |
|------|------|----------------|
| 200 | OK | 성공 |
| 201 | Created | 생성 성공 |
| 400 | Bad Request | 입력 값 확인 요청 |
| 401 | Unauthorized | 로그아웃 & 로그인 페이지 이동 |
| 403 | Forbidden | 권한 없음 메시지 표시 |
| 404 | Not Found | 리소스 없음 메시지 표시 |
| 422 | Unprocessable Entity | 유효성 검증 실패 (필드별 에러 표시) |
| 500 | Internal Server Error | 일반 에러 메시지 표시 |

### 6-2. 커스텀 에러 코드

백엔드에서 다음 형식으로 에러 코드 전달:

```typescript
{
  "success": false,
  "error": {
    "code": "AUTH_001",
    "message": "Invalid credentials",
    "details": {
      "email": "User not found"
    }
  }
}
```

**권장 에러 코드:**
- `AUTH_001`: 잘못된 인증 정보
- `AUTH_002`: 토큰 만료
- `AUTH_003`: 권한 없음
- `VALIDATION_001`: 필수 필드 누락
- `VALIDATION_002`: 잘못된 형식
- `RESOURCE_001`: 리소스 없음
- `RESOURCE_002`: 중복된 리소스
- `SERVER_001`: 서버 내부 오류

---

## 7. Mock API → Real API 전환

### 7-1. 단계별 전환 프로세스

#### Step 1: 환경 변수 설정
```bash
# .env.local
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=http://localhost:3000/api
```

#### Step 2: API 엔드포인트 함수 작성

**예시: 실제 API 함수 작성**
```typescript
// frontend/src/lib/api/endpoints/classes.ts
import { apiClient } from '../client';
import { Class, ClassFormData } from '../../types';

export const classesApi = {
  getAll: async (): Promise<Class[]> => {
    return await apiClient.get<Class[]>('/admin/classes');
  },

  getById: async (id: string): Promise<Class> => {
    return await apiClient.get<Class>(`/admin/classes/${id}`);
  },

  create: async (data: ClassFormData): Promise<Class> => {
    return await apiClient.post<Class>('/admin/classes', data);
  },

  update: async (id: string, data: ClassFormData): Promise<Class> => {
    return await apiClient.put<Class>(`/admin/classes/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    return await apiClient.delete(`/admin/classes/${id}`);
  },
};
```

#### Step 3: Mock/Real API 스위칭

```typescript
// frontend/src/lib/api/index.ts
import { isMockMode } from './client';
import { classesApi as realClassesApi } from './endpoints/classes';
import { getClasses as mockGetClasses, ... } from './mock/classes';

export const classesApi = isMockMode() 
  ? {
      getAll: mockGetClasses,
      getById: mockGetClassById,
      // ... 나머지 mock 함수
    }
  : realClassesApi;
```

#### Step 4: 컴포넌트에서 사용

```typescript
// 컴포넌트 코드는 변경 없음
import { classesApi } from '@/lib/api';

const loadClasses = async () => {
  const classes = await classesApi.getAll();
  setClasses(classes);
};
```

### 7-2. 점진적 전환 전략

1. **인증 API부터 시작** (가장 중요)
   - 로그인/로그아웃
   - 토큰 관리

2. **CRUD 기본 기능**
   - 클래스 관리
   - 사용자 관리

3. **복잡한 기능**
   - AI 문제 생성
   - 제출물 채점
   - 리포트 생성

4. **실시간 기능** (추후)
   - 알림
   - 채팅

---

## 8. 테스트 가이드

### 8-1. API 테스트 체크리스트

#### 인증
- [ ] 로그인 성공
- [ ] 로그인 실패 (잘못된 비밀번호)
- [ ] 로그아웃
- [ ] 토큰 자동 포함 확인
- [ ] 토큰 만료 시 자동 로그아웃

#### CRUD 작업
- [ ] 목록 조회 (pagination 포함)
- [ ] 상세 조회
- [ ] 생성
- [ ] 수정
- [ ] 삭제

#### 에러 처리
- [ ] 400 Bad Request
- [ ] 401 Unauthorized
- [ ] 403 Forbidden
- [ ] 404 Not Found
- [ ] 422 Validation Error
- [ ] 500 Server Error
- [ ] Network Error

#### 파일 업로드
- [ ] 이미지 업로드
- [ ] PDF 업로드
- [ ] 파일 크기 제한
- [ ] 파일 형식 제한

### 8-2. 통합 테스트 시나리오

#### Teacher 시나리오
```
1. 로그인
2. 커리큘럼 생성
3. 문제 세트 생성
4. 과제 배정
5. 제출물 확인
6. 피드백 작성
```

#### Student 시나리오
```
1. 로그인
2. 과제 목록 확인
3. 과제 풀이
4. 제출
5. 피드백 확인
```

#### Parent 시나리오
```
1. 로그인
2. 자녀 목록 확인
3. 자녀 대시보드 조회
4. 상세 리포트 조회
```

---

## 9. 자주 묻는 질문 (FAQ)

### Q1: CORS 에러가 발생합니다
**A**: 백엔드에서 CORS 설정 필요:
```javascript
// Express 예시
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Q2: 토큰이 자동으로 전송되지 않습니다
**A**: API 클라이언트의 request interceptor 확인. `Authorization` 헤더가 자동으로 추가됩니다.

### Q3: Mock API와 Real API를 동시에 사용할 수 있나요?
**A**: 가능합니다. 엔드포인트별로 조건부로 사용:
```typescript
export const someApi = {
  getAll: isMockMode() ? mockGetAll : realGetAll,
  getById: realGetById, // 이 엔드포인트만 실제 API 사용
};
```

### Q4: API 응답 형식이 다를 경우 어떻게 하나요?
**A**: API 클라이언트의 response interceptor에서 변환:
```typescript
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답 형식 변환 로직
    return transformResponse(response);
  }
);
```

---

## 10. 추가 리소스

- [API 명세서](./api-specification.md)
- [데이터베이스 스키마](./database-schema.md)
- [프로젝트 구조](./project-structure.md)

---

## 문의

백엔드 통합 관련 문의사항은 개발팀에게 연락주세요.

