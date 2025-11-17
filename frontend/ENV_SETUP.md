# 환경 변수 설정 가이드

## .env.local 파일 생성

프로젝트 루트(`frontend/`)에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# API URL (추후 백엔드 연동 시 사용)
VITE_API_BASE_URL=http://localhost:4000/api/v1

# 환경
VITE_ENV=development

# AI API (추후 설정)
# VITE_OPENAI_API_KEY=your-api-key
```

## 환경 변수 사용법

Vite에서는 환경 변수에 `VITE_` 접두사가 필요합니다.

```typescript
// 환경 변수 사용 예시
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const env = import.meta.env.VITE_ENV;
```

## 주의사항

- `.env.local` 파일은 Git에 커밋하지 마세요 (.gitignore에 포함됨)
- 환경 변수 변경 후에는 개발 서버를 재시작해야 합니다
- 프로덕션 빌드 시에는 `.env.production` 파일을 사용하세요

## 백엔드 연동 시

백엔드 서버가 준비되면 `VITE_API_BASE_URL`을 실제 API 주소로 변경하세요.

현재는 Mock 데이터를 사용하므로 백엔드 없이도 프론트엔드 개발이 가능합니다.

