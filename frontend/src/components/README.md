# Components 폴더

> 도메인별 특수 컴포넌트 모음

## ⚠️ 중요 공지

### 디자인 시스템 사용 필수

**2025-01-17부터 모든 새로운 UI 개발은 디자인 시스템을 사용해야 합니다.**

```typescript
// ✅ 권장 (디자인 시스템)
import { Button, Card, Input } from '@/design-system';

// ❌ 사용 금지 (기존 UI 컴포넌트)
import { Button } from '@/components/ui/Button';
```

### 디자인 시스템 위치

```
frontend/src/design-system/
├── tokens/          # 디자인 토큰 (색상, 타이포그래피 등)
├── theme/           # 테마 프로바이더
└── components/      # 재사용 가능한 UI 컴포넌트
    ├── primitives/  # Box, Stack, Flex, Text, Heading
    ├── inputs/      # Button, Input, TextArea, Select 등
    ├── data-display/# Card, Badge, Tag, Avatar 등
    ├── layout/      # Page, PageHeader, Section 등
    ├── feedback/    # Alert, Spinner, Modal
    └── navigation/  # Tabs, Breadcrumbs
```

**참고 문서**:
- [디자인 시스템 README](../design-system/README.md)
- [마이그레이션 가이드](../../docs/development/design-system-migration-guide.md)
- [데모 페이지](/design-system) - 앱 실행 후 확인

---

## 폴더 구조

### `/ui/` (Deprecated ⚠️)

**상태**: 더 이상 사용되지 않음 (Deprecated)

기존 UI 컴포넌트들입니다. **새로운 개발에 사용하지 마세요.**

- `Button.tsx` ❌ → 대신 `@/design-system`의 `Button` 사용
- `Card.tsx` ❌ → 대신 `@/design-system`의 `Card` 사용
- `Input.tsx` ❌ → 대신 `@/design-system`의 `Input` 사용

**삭제 예정**: 2025-02-01  
**마이그레이션 완료 후 삭제될 예정입니다.**

---

### `/admin/` ✅

**관리자 전용 도메인 컴포넌트**

특정 도메인 로직을 포함한 복잡한 컴포넌트들입니다.

#### `ClassForm.tsx`

클래스 생성/수정 폼 컴포넌트

```typescript
import { ClassForm } from '@/components/admin/ClassForm';

<ClassForm
  mode="create" // or "edit"
  initialData={classData}
  onSubmit={handleSubmit}
  onCancel={handleCancel}
/>
```

**특징**:
- Create/Edit 모드 지원
- 선생님 배정
- 학생 다중 선택
- 폼 검증

#### `UserFormDrawer.tsx`

사용자(선생님/학생/학부모) 생성/수정 사이드 드로어

```typescript
import { UserFormDrawer } from '@/components/admin/UserFormDrawer';

<UserFormDrawer
  isOpen={isOpen}
  onClose={handleClose}
  mode="create" // or "edit"
  userRole="teacher" // "student", "parent"
  initialData={userData}
  onSave={handleSave}
/>
```

**특징**:
- 역할별 다른 필드 표시
- 사이드 드로어 UI
- 폼 검증

---

### `/teacher/` ✅

**선생님 전용 도메인 컴포넌트**

#### `CurriculumForm.tsx`

커리큘럼 생성/수정 폼 컴포넌트

```typescript
import { CurriculumForm } from '@/components/teacher/CurriculumForm';

<CurriculumForm
  mode="create" // or "edit"
  initialData={curriculumData}
  onSubmit={handleSubmit}
  onCancel={handleCancel}
/>
```

**특징**:
- 다중 Unit 추가/삭제
- 컨셉 태그 입력
- 예제 문장/질문 관리
- 동적 폼 필드

#### `SubmissionDetailModal.tsx`

학생 제출물 상세 검토 모달

```typescript
import { SubmissionDetailModal } from '@/components/teacher/SubmissionDetailModal';

<SubmissionDetailModal
  isOpen={isOpen}
  onClose={handleClose}
  submissionId={submissionId}
  onConfirm={handleConfirm}
/>
```

**특징**:
- 문제별 상세 답안 표시
- AI 피드백 확인
- 선생님 코멘트 추가
- 최종 확인

---

### `/features/` (비어있음)

**피처별 컴포넌트**

향후 기능별로 구조화된 컴포넌트가 추가될 예정입니다.

예상 구조:
```
features/
├── authentication/
├── curriculum/
├── assignments/
└── analytics/
```

---

## 컴포넌트 작성 가이드

### 1. 어디에 넣을까?

**결정 트리**:

```
UI 컴포넌트인가?
├─ Yes → 디자인 시스템(/design-system/)에 추가
└─ No → 도메인 컴포넌트인가?
    ├─ Admin 전용 → /components/admin/
    ├─ Teacher 전용 → /components/teacher/
    ├─ Student 전용 → /components/student/ (추가 예정)
    ├─ Parent 전용 → /components/parent/ (추가 예정)
    └─ 공통 비즈니스 로직 → /components/features/
```

### 2. 작성 원칙

✅ **DO**:
- 디자인 시스템 컴포넌트를 기반으로 작성
- 명확한 Props 인터페이스 정의
- TypeScript 타입 사용
- 주석으로 사용 예제 추가
- 단일 책임 원칙 준수

❌ **DON'T**:
- 기존 `ui/` 컴포넌트 사용
- 인라인 스타일 사용
- 너무 많은 책임 가진 컴포넌트 작성
- Props drilling (Context 사용 고려)

### 3. 예제 템플릿

```typescript
/**
 * MyDomainComponent
 * 
 * 이 컴포넌트의 목적을 간단히 설명
 * 
 * @example
 * ```tsx
 * <MyDomainComponent
 *   prop1="value"
 *   onAction={handleAction}
 * />
 * ```
 */

import { useState } from 'react';
import { Card, Button, Input } from '@/design-system';

interface MyDomainComponentProps {
  prop1: string;
  onAction: () => void;
}

export const MyDomainComponent = ({
  prop1,
  onAction,
}: MyDomainComponentProps) => {
  // 로직
  
  return (
    <Card>
      <Card.Header>
        <h2>{prop1}</h2>
      </Card.Header>
      <Card.Body>
        {/* 내용 */}
      </Card.Body>
      <Card.Footer>
        <Button onClick={onAction}>실행</Button>
      </Card.Footer>
    </Card>
  );
};
```

---

## FAQ

### Q: 새로운 버튼을 만들어야 하는데 어디에?

**A**: 버튼은 UI 컴포넌트이므로 **디자인 시스템**에서 사용하세요.

```typescript
import { Button } from '@/design-system';

<Button variant="primary" size="lg">
  클릭
</Button>
```

커스텀 스타일이 필요하면 `className` prop 사용:

```typescript
<Button variant="primary" className="w-full">
  전체 너비 버튼
</Button>
```

### Q: 특정 페이지에서만 사용하는 컴포넌트는?

**A**: 페이지 파일과 같은 폴더에 생성하거나, 페이지 폴더 아래 `components/` 폴더 생성:

```
pages/
└── Teacher/
    └── Curricula/
        ├── CurriculaList.tsx
        ├── CurriculumDetail.tsx
        └── components/
            └── UnitCard.tsx  ← 이 페이지에서만 사용
```

### Q: 여러 페이지에서 사용하는 도메인 컴포넌트는?

**A**: `/components/` 아래 적절한 도메인 폴더에 추가:

- Admin 관련 → `/components/admin/`
- Teacher 관련 → `/components/teacher/`
- 공통 비즈니스 로직 → `/components/features/`

---

## 참고 자료

- [디자인 시스템 README](../design-system/README.md)
- [마이그레이션 가이드](../../docs/development/design-system-migration-guide.md)
- [코딩 컨벤션](../../docs/development/coding-conventions.md)
- [프로젝트 구조](../../docs/development/project-structure.md)

---

**최종 수정**: 2025-01-17  
**작성자**: Learning Elevate Team

