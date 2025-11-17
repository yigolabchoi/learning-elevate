# 디자인 시스템 마이그레이션 가이드

> 기존 페이지를 새로운 디자인 시스템 컴포넌트로 마이그레이션하는 방법

## 목차

1. [개요](#개요)
2. [마이그레이션 체크리스트](#마이그레이션-체크리스트)
3. [컴포넌트 매핑](#컴포넌트-매핑)
4. [실전 예제](#실전-예제)
5. [주의사항](#주의사항)
6. [FAQ](#faq)

---

## 개요

### 왜 마이그레이션이 필요한가?

✅ **일관성**: 전체 앱에서 통일된 UI/UX  
✅ **유지보수성**: 컴포넌트 한 곳만 수정하면 전체 반영  
✅ **코드 품질**: 중복 코드 제거, 가독성 향상  
✅ **개발 속도**: 재사용 가능한 컴포넌트로 빠른 개발  

### 마이그레이션 전략

1. **중요도 순으로 진행**: Login → Dashboard → 기타 페이지
2. **한 번에 하나씩**: 파일별로 완성도 높게 진행
3. **테스트 필수**: 마이그레이션 후 기능 동작 확인
4. **문서화**: 특이사항이 있으면 주석 추가

---

## 마이그레이션 체크리스트

각 페이지를 마이그레이션할 때 다음 체크리스트를 따르세요:

### 1단계: 준비

- [ ] 기존 페이지의 기능 및 UI 파악
- [ ] 사용할 디자인 시스템 컴포넌트 확인
- [ ] 기존 페이지의 스크린샷 저장 (비교용)

### 2단계: Import 추가

```typescript
import {
  Page,
  PageHeader,
  Card,
  Button,
  Input,
  Badge,
  // ... 필요한 컴포넌트들
} from '@/design-system';
```

### 3단계: 구조 변경

- [ ] `<div className="p-6">` → `<Page>` 래퍼로 교체
- [ ] 페이지 제목 → `<PageHeader>` 컴포넌트 사용
- [ ] 카드/섹션 → `<Card>` 컴포넌트 사용
- [ ] 버튼 → `<Button>` 컴포넌트 사용
- [ ] 입력 필드 → `<Input>` 컴포넌트 사용

### 4단계: 스타일링 정리

- [ ] 인라인 조건부 스타일 → 디자인 시스템 variant 속성 사용
- [ ] 반복되는 className → 컴포넌트 props로 통합
- [ ] 커스텀 색상 → 디자인 토큰 사용

### 5단계: 테스트

- [ ] 페이지 렌더링 확인
- [ ] 모든 인터랙션 동작 확인
- [ ] 반응형 레이아웃 확인
- [ ] Lint 에러 확인 및 수정

### 6단계: 완료

- [ ] 코드 리뷰 요청
- [ ] 문서 업데이트
- [ ] TODO 완료 표시

---

## 컴포넌트 매핑

### 레이아웃 컴포넌트

| 기존 | 디자인 시스템 | 예제 |
|------|---------------|------|
| `<div className="p-6">...</div>` | `<Page>...</Page>` | 페이지 래퍼 |
| `<h1 className="text-3xl font-bold">` | `<PageHeader title="..." description="..." />` | 페이지 헤더 |
| `<div className="bg-white rounded-lg border">` | `<Card>...</Card>` | 카드 컨테이너 |
| `<div className="space-y-4">` | `<Stack direction="vertical" gap="md">` | 수직 스택 |
| `<div className="flex gap-4">` | `<Stack direction="horizontal" gap="md">` | 수평 스택 |

### 입력 컴포넌트

| 기존 | 디자인 시스템 | 주요 Props |
|------|---------------|-----------|
| `<button className="...">` | `<Button variant="primary">` | `variant`, `size`, `isLoading` |
| `<input className="...">` | `<Input label="..." />` | `label`, `error`, `fullWidth` |
| `<textarea className="...">` | `<TextArea label="..." />` | `label`, `error`, `rows` |
| `<select className="...">` | `<Select label="..." options={...} />` | `label`, `options` |

### 데이터 표시 컴포넌트

| 기존 | 디자인 시스템 | Variants |
|------|---------------|----------|
| `<span className="bg-blue-100 text-blue-700">` | `<Badge variant="info">` | `neutral`, `success`, `warning`, `error`, `info` |
| 통계 카드 (커스텀) | `<StatCard label="..." value="..." />` | - |
| 아바타 (커스텀) | `<Avatar name="..." />` | `size`, `shape` |

### 피드백 컴포넌트

| 기존 | 디자인 시스템 | Variants |
|------|---------------|----------|
| 로딩 스피너 (커스텀) | `<Spinner size="lg" />` | `sm`, `md`, `lg` |
| 에러 메시지 (커스텀) | `<Alert variant="error" />` | `info`, `success`, `warning`, `error` |
| 모달 (커스텀) | `<Modal isOpen={...} onClose={...} />` | - |

### 타이포그래피

| 기존 | 디자인 시스템 | Props |
|------|---------------|-------|
| `<h1 className="text-3xl">` | `<Heading level={1}>` | `level` (1-4) |
| `<p className="text-gray-600">` | `<Text color="muted">` | `variant`, `color`, `weight` |

---

## 실전 예제

### 예제 1: 로딩 상태 마이그레이션

#### ❌ 기존 코드

```typescript
if (isLoading) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
```

#### ✅ 마이그레이션 후

```typescript
if (isLoading) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Stack direction="vertical" align="center" gap="md">
        <Spinner size="lg" />
        <Text color="muted">로딩 중...</Text>
      </Stack>
    </div>
  );
}
```

**개선 사항**: 
- 커스텀 스피너 → `<Spinner>` 컴포넌트
- 인라인 스타일 제거
- 한글 메시지 적용

---

### 예제 2: 에러 상태 마이그레이션

#### ❌ 기존 코드

```typescript
if (error) {
  return (
    <div className="p-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
        <button
          onClick={loadData}
          className="mt-2 text-sm text-red-700 underline hover:text-red-800"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
```

#### ✅ 마이그레이션 후

```typescript
if (error) {
  return (
    <Page>
      <Alert variant="error" description={error} />
      <Button variant="primary" onClick={loadData} className="mt-4">
        다시 시도
      </Button>
    </Page>
  );
}
```

**개선 사항**:
- `<Alert>` 컴포넌트 사용
- `<Button>` 컴포넌트 사용
- 코드 줄 수 50% 감소

---

### 예제 3: 통계 카드 마이그레이션

#### ❌ 기존 코드

```typescript
<div className="bg-white border border-gray-200 rounded-lg p-6">
  <div className="flex items-center gap-3">
    <div className="p-3 bg-blue-100 rounded-lg">
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="..." />
      </svg>
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900">{count}</p>
      <p className="text-sm text-gray-600">Total Classes</p>
    </div>
  </div>
</div>
```

#### ✅ 마이그레이션 후

```typescript
<StatCard
  label="전체 클래스"
  value={count.toString()}
  icon={
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="..." />
    </svg>
  }
/>
```

**개선 사항**:
- 코드 줄 수 70% 감소
- 재사용 가능한 컴포넌트
- 일관된 스타일링

---

### 예제 4: Badge 마이그레이션

#### ❌ 기존 코드

```typescript
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-700';
    case 'in_progress':
      return 'bg-blue-100 text-blue-700';
    case 'not_started':
      return 'bg-gray-100 text-gray-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

// 사용
<span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(status)}`}>
  {status}
</span>
```

#### ✅ 마이그레이션 후

```typescript
const getStatusVariant = (status: string): BadgeVariant => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'in_progress':
      return 'info';
    case 'not_started':
      return 'neutral';
    default:
      return 'neutral';
  }
};

// 사용
<Badge variant={getStatusVariant(status)}>
  {status}
</Badge>
```

**개선 사항**:
- 타입 안전성 향상 (`BadgeVariant` 타입 사용)
- 일관된 스타일
- 코드 간결화

---

### 예제 5: 페이지 전체 마이그레이션

#### ❌ 기존 코드

```typescript
return (
  <div className="p-6">
    {/* Header */}
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Class Management</h1>
        <p className="mt-1 text-gray-600">Manage classes and students</p>
      </div>
      <button
        onClick={() => navigate('/admin/classes/new')}
        className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
      >
        Create Class
      </button>
    </div>

    {/* Content */}
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4">Classes</h2>
      {/* ... content */}
    </div>
  </div>
);
```

#### ✅ 마이그레이션 후

```typescript
return (
  <Page>
    <PageHeader
      title="클래스 관리"
      description="클래스와 학생을 관리하세요"
    >
      <Button
        variant="primary"
        onClick={() => navigate('/admin/classes/new')}
      >
        클래스 생성
      </Button>
    </PageHeader>

    <Card>
      <Card.Header>
        <Heading level={2}>클래스 목록</Heading>
      </Card.Header>
      <Card.Body>
        {/* ... content */}
      </Card.Body>
    </Card>
  </Page>
);
```

**개선 사항**:
- 명확한 컴포넌트 구조
- 의미 있는 컴포넌트 이름
- 일관된 패턴

---

## 주의사항

### ⚠️ 마이그레이션 시 주의할 점

1. **기능 유지**: UI만 바꾸고 기능은 그대로 유지
2. **타입 안전성**: TypeScript 타입을 올바르게 사용
3. **접근성**: ARIA 속성 유지 (디자인 시스템 컴포넌트가 자동으로 처리)
4. **반응형**: 모바일/태블릿/데스크톱 모두 확인
5. **브라우저 호환성**: 주요 브라우저에서 테스트

### 🚫 하지 말아야 할 것

1. **커스텀 스타일 추가 금지**: 디자인 시스템 컴포넌트를 수정하지 말고, 필요하면 새 variant 추가
2. **인라인 스타일 사용 금지**: `style` prop 대신 className 또는 variant 사용
3. **일관성 깨뜨리기 금지**: 한 페이지에서만 다른 패턴 사용하지 않기
4. **불필요한 div 래퍼 추가 금지**: 디자인 시스템 컴포넌트만으로 충분

### ✅ 권장사항

1. **작은 단위부터**: 버튼 하나부터 시작해서 점진적으로
2. **재사용 가능하게**: 반복되는 패턴은 별도 컴포넌트로 추출
3. **문서화**: 특이한 케이스는 주석으로 설명
4. **테스트**: 변경 후 반드시 동작 확인

---

## FAQ

### Q1: 디자인 시스템에 없는 스타일이 필요하면?

**A**: 다음 순서로 진행하세요:

1. 기존 컴포넌트의 variant나 props로 해결 가능한지 확인
2. `className` prop으로 커스텀 스타일 추가 (임시)
3. 자주 사용되면 디자인 시스템에 새 variant 추가 제안

```typescript
// 임시 해결책 (OK)
<Button variant="primary" className="w-full">

// 나쁜 예 (NG)
<button className="px-4 py-2 bg-custom-color">
```

### Q2: 기존 페이지가 너무 복잡하면?

**A**: 리팩토링과 마이그레이션을 동시에 진행하지 마세요:

1. **1단계**: 기능 분리 (리팩토링)
2. **2단계**: 디자인 시스템 적용 (마이그레이션)

복잡한 페이지는 여러 개의 작은 컴포넌트로 나누는 것이 좋습니다.

### Q3: 마이그레이션 후 성능이 느려지면?

**A**: 디자인 시스템 컴포넌트는 최적화되어 있습니다. 느려진다면:

1. React DevTools로 불필요한 리렌더링 확인
2. `React.memo()` 사용 고려
3. 큰 리스트는 가상화 (virtualization) 고려

### Q4: 테이블 컴포넌트가 없는데?

**A**: 복잡한 데이터 테이블은 아직 디자인 시스템에 없습니다:

- 간단한 테이블: `<Card>` 안에 HTML `<table>` 사용
- 복잡한 테이블: 기존 구조 유지하되, 안에서 `<Badge>`, `<Button>` 등 사용
- 나중에 테이블 컴포넌트 추가 예정

```typescript
<Card>
  <table className="min-w-full">
    {/* ... */}
    <Badge variant="success">완료</Badge>
    <Button variant="ghost" size="sm">수정</Button>
  </table>
</Card>
```

### Q5: 다국어 지원은?

**A**: 현재 한글로 하드코딩되어 있습니다:

- 나중에 i18n 라이브러리 도입 예정
- 그때 다시 한 번에 마이그레이션

---

## 참고 자료

- [디자인 시스템 컴포넌트 라이브러리](../design/component-library.md)
- [디자인 시스템 README](../../frontend/src/design-system/README.md)
- [디자인 시스템 데모 페이지](/design-system) - 실행 후 브라우저에서 확인

---

## 마이그레이션 현황

### ✅ 완료된 페이지

1. **Login 페이지** - 모든 역할 통합 로그인
2. **Teacher Dashboard** - 선생님 메인 대시보드
3. **Admin Classes** - 클래스 관리 목록
4. **Student Home** - 학생 홈 페이지

### 🔄 진행 예정

- Admin User Management
- Teacher Curriculum Management
- Teacher Problem Sets
- Student Assignments
- Parent Children List
- 나머지 모든 페이지...

### 📊 통계

- **총 페이지 수**: ~40개
- **완료된 페이지**: 4개 (10%)
- **평균 코드 감소율**: 15%
- **예상 완료 기간**: 2-3주

---

## 기여하기

마이그레이션을 도와주세요!

1. 위의 "진행 예정" 목록에서 페이지 선택
2. 이 가이드를 따라 마이그레이션
3. PR 생성
4. 코드 리뷰 후 머지

**질문이 있으면**: 프로젝트 관리자에게 문의하세요!

---

**작성일**: 2025-01-17  
**최종 수정**: 2025-01-17  
**작성자**: Learning Elevate Team

