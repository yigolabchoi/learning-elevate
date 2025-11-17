# Learning Elevate – 컴포넌트 라이브러리

## 📋 문서 정보

- **작성일**: 2025-11-17
- **버전**: 0.1.0
- **상태**: 초안

---

## 목차

1. [버튼 (Button)](#1-버튼-button)
2. [입력 필드 (Input)](#2-입력-필드-input)
3. [카드 (Card)](#3-카드-card)
4. [모달 (Modal)](#4-모달-modal)
5. [알림 (Alert)](#5-알림-alert)
6. [배지 (Badge)](#6-배지-badge)
7. [진행 바 (Progress)](#7-진행-바-progress)
8. [테이블 (Table)](#8-테이블-table)
9. [네비게이션 (Navigation)](#9-네비게이션-navigation)
10. [피드백 컴포넌트](#10-피드백-컴포넌트)

---

## 1. 버튼 (Button)

### 1-1. 버튼 변형

#### Primary Button
```tsx
<Button variant="primary" size="md">
  제출하기
</Button>
```

**사용처**: 주요 액션 (제출, 저장, 확인 등)

#### Secondary Button
```tsx
<Button variant="secondary" size="md">
  취소
</Button>
```

**사용처**: 보조 액션 (취소, 뒤로가기 등)

#### Outline Button
```tsx
<Button variant="outline" size="md">
  미리보기
</Button>
```

**사용처**: 덜 중요한 액션

#### Ghost Button
```tsx
<Button variant="ghost" size="md">
  건너뛰기
</Button>
```

**사용처**: 최소한의 강조가 필요한 액션

#### Danger Button
```tsx
<Button variant="danger" size="md">
  삭제
</Button>
```

**사용처**: 위험한 액션 (삭제, 초기화 등)

### 1-2. 버튼 크기

```tsx
<Button size="sm">작은 버튼</Button>
<Button size="md">중간 버튼</Button>
<Button size="lg">큰 버튼</Button>
```

### 1-3. 버튼 상태

```tsx
<Button disabled>비활성</Button>
<Button loading>로딩 중...</Button>
<Button icon={<CheckIcon />}>아이콘 포함</Button>
```

### 1-4. 스타일 명세

```css
/* Primary Button */
.btn-primary {
  background-color: var(--color-primary-500);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-base);
  font-weight: var(--font-weight-medium);
  transition: all var(--duration-base) var(--ease-out);
}

.btn-primary:hover {
  background-color: var(--color-primary-600);
  box-shadow: var(--shadow-md);
}

.btn-primary:active {
  background-color: var(--color-primary-700);
}

.btn-primary:disabled {
  background-color: var(--color-gray-300);
  cursor: not-allowed;
}
```

---

## 2. 입력 필드 (Input)

### 2-1. 텍스트 입력

```tsx
<Input
  type="text"
  label="이름"
  placeholder="이름을 입력하세요"
  helperText="한글 또는 영문으로 입력"
/>
```

### 2-2. 입력 상태

#### 기본 상태
```tsx
<Input label="이메일" type="email" />
```

#### 에러 상태
```tsx
<Input
  label="비밀번호"
  type="password"
  error="비밀번호는 8자 이상이어야 합니다"
/>
```

#### 성공 상태
```tsx
<Input
  label="사용자명"
  value="chulsoo"
  success="사용 가능한 이름입니다"
/>
```

#### 비활성 상태
```tsx
<Input label="이메일" value="user@example.com" disabled />
```

### 2-3. 텍스트 영역

```tsx
<Textarea
  label="학습 목표"
  placeholder="학습 목표를 입력하세요"
  rows={4}
/>
```

### 2-4. 선택 필드

```tsx
<Select label="학년">
  <option value="1">중학교 1학년</option>
  <option value="2">중학교 2학년</option>
  <option value="3">중학교 3학년</option>
</Select>
```

### 2-5. 체크박스 & 라디오

```tsx
<Checkbox label="이용약관에 동의합니다" />
<Radio name="level" value="beginner" label="초급" />
```

---

## 3. 카드 (Card)

### 3-1. 기본 카드

```tsx
<Card>
  <CardHeader>
    <CardTitle>현재완료 시제</CardTitle>
    <CardDescription>10문제 · 예상 15분</CardDescription>
  </CardHeader>
  <CardContent>
    <p>현재완료 시제의 개념을 이해하고 활용할 수 있습니다.</p>
  </CardContent>
  <CardFooter>
    <Button>시작하기</Button>
  </CardFooter>
</Card>
```

### 3-2. 인터랙티브 카드

```tsx
<Card clickable hover>
  <CardContent>
    <h3>과제 제목</h3>
    <p>마감: 2일 후</p>
  </CardContent>
</Card>
```

### 3-3. 스타일 변형

```css
.card {
  background: var(--color-bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-6);
  transition: all var(--duration-base) var(--ease-out);
}

.card-hover:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card-clickable {
  cursor: pointer;
}
```

---

## 4. 모달 (Modal)

### 4-1. 기본 모달

```tsx
<Modal open={isOpen} onClose={handleClose}>
  <ModalHeader>
    <ModalTitle>과제 제출</ModalTitle>
  </ModalHeader>
  <ModalContent>
    <p>정말 제출하시겠습니까?</p>
  </ModalContent>
  <ModalFooter>
    <Button variant="secondary" onClick={handleClose}>
      취소
    </Button>
    <Button variant="primary" onClick={handleSubmit}>
      제출
    </Button>
  </ModalFooter>
</Modal>
```

### 4-2. 크기 변형

```tsx
<Modal size="sm">작은 모달</Modal>
<Modal size="md">중간 모달</Modal>
<Modal size="lg">큰 모달</Modal>
<Modal size="full">전체 화면 모달</Modal>
```

### 4-3. 확인 다이얼로그

```tsx
<ConfirmDialog
  title="삭제 확인"
  message="정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
  confirmText="삭제"
  cancelText="취소"
  onConfirm={handleDelete}
  onCancel={handleCancel}
  variant="danger"
/>
```

---

## 5. 알림 (Alert)

### 5-1. 알림 유형

#### Success
```tsx
<Alert variant="success">
  <AlertIcon />
  <AlertTitle>성공</AlertTitle>
  <AlertDescription>과제가 성공적으로 제출되었습니다.</AlertDescription>
</Alert>
```

#### Error
```tsx
<Alert variant="error">
  <AlertIcon />
  <AlertTitle>오류</AlertTitle>
  <AlertDescription>제출 중 오류가 발생했습니다.</AlertDescription>
</Alert>
```

#### Warning
```tsx
<Alert variant="warning">
  <AlertIcon />
  <AlertTitle>주의</AlertTitle>
  <AlertDescription>마감일이 1일 남았습니다.</AlertDescription>
</Alert>
```

#### Info
```tsx
<Alert variant="info">
  <AlertIcon />
  <AlertTitle>안내</AlertTitle>
  <AlertDescription>새로운 과제가 배정되었습니다.</AlertDescription>
</Alert>
```

### 5-2. 토스트 알림

```tsx
toast.success('저장되었습니다');
toast.error('오류가 발생했습니다');
toast.warning('주의가 필요합니다');
toast.info('새로운 알림이 있습니다');
```

---

## 6. 배지 (Badge)

### 6-1. 배지 변형

```tsx
<Badge variant="primary">새로운</Badge>
<Badge variant="success">완료</Badge>
<Badge variant="error">오답</Badge>
<Badge variant="warning">대기 중</Badge>
<Badge variant="info">진행 중</Badge>
<Badge variant="gray">비활성</Badge>
```

### 6-2. 배지 크기

```tsx
<Badge size="sm">작은</Badge>
<Badge size="md">중간</Badge>
<Badge size="lg">큰</Badge>
```

### 6-3. 점 배지 (Dot Badge)

```tsx
<Badge dot variant="error">
  알림
</Badge>
```

---

## 7. 진행 바 (Progress)

### 7-1. 선형 진행 바

```tsx
<Progress value={75} max={100} />
<Progress value={75} max={100} showLabel />
```

### 7-2. 원형 진행 바

```tsx
<CircularProgress value={75} size="md" />
<CircularProgress value={75} size="lg" showLabel />
```

### 7-3. 단계 진행 표시

```tsx
<Steps current={2}>
  <Step title="커리큘럼 등록" />
  <Step title="문제 생성" />
  <Step title="과제 배정" />
  <Step title="검토 및 컨펌" />
</Steps>
```

---

## 8. 테이블 (Table)

### 8-1. 기본 테이블

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>학생명</TableHead>
      <TableHead>점수</TableHead>
      <TableHead>제출일</TableHead>
      <TableHead>상태</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>김철수</TableCell>
      <TableCell>75점</TableCell>
      <TableCell>2025-11-15</TableCell>
      <TableCell><Badge variant="success">완료</Badge></TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### 8-2. 정렬 가능 테이블

```tsx
<Table sortable>
  <TableHeader>
    <TableHead sortKey="name">학생명</TableHead>
    <TableHead sortKey="score">점수</TableHead>
  </TableHeader>
</Table>
```

### 8-3. 선택 가능 테이블

```tsx
<Table selectable>
  <TableBody>
    <TableRow selectable>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell>김철수</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

## 9. 네비게이션 (Navigation)

### 9-1. 사이드바

```tsx
<Sidebar>
  <SidebarHeader>
    <Logo />
  </SidebarHeader>
  <SidebarNav>
    <NavItem icon={<HomeIcon />} href="/" active>
      대시보드
    </NavItem>
    <NavItem icon={<BookIcon />} href="/curriculum">
      커리큘럼
    </NavItem>
    <NavItem icon={<UsersIcon />} href="/students">
      학생 관리
    </NavItem>
  </SidebarNav>
</Sidebar>
```

### 9-2. 탭

```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">개요</TabsTrigger>
    <TabsTrigger value="analysis">분석</TabsTrigger>
    <TabsTrigger value="history">이력</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    개요 내용
  </TabsContent>
  <TabsContent value="analysis">
    분석 내용
  </TabsContent>
</Tabs>
```

### 9-3. 브레드크럼

```tsx
<Breadcrumb>
  <BreadcrumbItem href="/">홈</BreadcrumbItem>
  <BreadcrumbItem href="/curriculum">커리큘럼</BreadcrumbItem>
  <BreadcrumbItem active>현재완료 시제</BreadcrumbItem>
</Breadcrumb>
```

---

## 10. 피드백 컴포넌트

### 10-1. 정답/오답 표시

```tsx
<AnswerFeedback type="correct">
  <AnswerIcon />
  <AnswerTitle>정답입니다!</AnswerTitle>
  <AnswerDescription>
    잘했어요. 현재완료 시제를 정확히 이해하고 있습니다.
  </AnswerDescription>
</AnswerFeedback>

<AnswerFeedback type="incorrect">
  <AnswerIcon />
  <AnswerTitle>틀렸습니다</AnswerTitle>
  <AnswerDescription>
    현재완료 시제는 "have/has + 과거분사" 형태로 사용됩니다.
  </AnswerDescription>
  <AnswerExample>
    정답: have lived
  </AnswerExample>
</AnswerFeedback>
```

### 10-2. 학습 통계 카드

```tsx
<StatCard
  icon={<TrendingUpIcon />}
  title="평균 점수"
  value="75%"
  change="+5%"
  trend="up"
/>
```

### 10-3. 약점 분석 카드

```tsx
<WeaknessCard
  concept="현재완료 시제"
  accuracy={35}
  attemptCount={10}
  priority="high"
  onPractice={handlePractice}
/>
```

---

## 11. 로딩 상태

### 11-1. 스피너

```tsx
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
```

### 11-2. 스켈레톤

```tsx
<Skeleton width="100%" height="20px" />
<Skeleton circle width="40px" height="40px" />
```

### 11-3. 로딩 오버레이

```tsx
<LoadingOverlay visible={isLoading}>
  <Spinner />
  <p>문제를 생성하고 있습니다...</p>
</LoadingOverlay>
```

---

## 12. 빈 상태 (Empty State)

```tsx
<EmptyState
  icon={<InboxIcon />}
  title="과제가 없습니다"
  description="아직 배정된 과제가 없습니다. 새로운 과제를 만들어보세요."
  action={
    <Button onClick={handleCreate}>
      과제 만들기
    </Button>
  }
/>
```

---

## 13. 관련 문서

- [디자인 시스템](./design-system.md)
- [화면 설계서](./screen-design.md)
- [개발 가이드](../development/setup-guide.md)

---

## 변경 이력

| 날짜 | 버전 | 변경 내용 | 작성자 |
|------|------|----------|--------|
| 2025-11-17 | 0.1.0 | 초안 작성 | Design Team |

---

**문서 상태**: 🟡 초안 (Draft)  
**다음 리뷰 예정**: 2025-11-24

