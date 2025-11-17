# Learning Elevate – 코딩 컨벤션

## 📋 문서 정보

- **작성일**: 2025-11-17
- **버전**: 0.1.0
- **상태**: 초안

---

## 목차

1. [일반 원칙](#1-일반-원칙)
2. [TypeScript/JavaScript](#2-typescriptjavascript)
3. [React/Next.js](#3-reactnextjs)
4. [CSS/Styling](#4-cssstyling)
5. [Git 컨벤션](#5-git-컨벤션)
6. [코드 리뷰](#6-코드-리뷰)

---

## 1. 일반 원칙

### 1-1. 코드 품질 원칙

**SOLID 원칙**
- Single Responsibility: 하나의 함수/클래스는 하나의 책임만
- Open/Closed: 확장에는 열려있고 수정에는 닫혀있게
- Liskov Substitution: 하위 타입은 상위 타입을 대체 가능
- Interface Segregation: 인터페이스는 작고 구체적으로
- Dependency Inversion: 추상화에 의존, 구체화에 의존하지 않음

**DRY (Don't Repeat Yourself)**
- 중복 코드 최소화
- 재사용 가능한 함수/컴포넌트 작성

**KISS (Keep It Simple, Stupid)**
- 단순하고 명확한 코드 작성
- 과도한 추상화 지양

**YAGNI (You Aren't Gonna Need It)**
- 필요한 기능만 구현
- 미래를 위한 과도한 준비 지양

### 1-2. 가독성

- 명확하고 의미 있는 변수/함수명 사용
- 적절한 주석 (Why, not What)
- 일관된 코드 스타일 유지

---

## 2. TypeScript/JavaScript

### 2-1. 네이밍 컨벤션

#### 변수 및 함수
```typescript
// ✅ Good: camelCase
const userName = 'John';
const isActive = true;
const getUserData = () => {};

// ❌ Bad
const UserName = 'John';
const is_active = true;
```

#### 클래스 및 타입
```typescript
// ✅ Good: PascalCase
class UserService {}
interface UserProfile {}
type ApiResponse = {};

// ❌ Bad
class userService {}
interface user_profile {}
```

#### 상수
```typescript
// ✅ Good: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_COUNT = 3;

// ❌ Bad
const apiBaseUrl = 'https://api.example.com';
```

#### Boolean 변수
```typescript
// ✅ Good: is/has/should 접두사
const isLoading = true;
const hasError = false;
const shouldUpdate = true;

// ❌ Bad
const loading = true;
const error = false;
```

### 2-2. 타입 정의

#### 명시적 타입 사용
```typescript
// ✅ Good
function calculateScore(correct: number, total: number): number {
  return (correct / total) * 100;
}

// ❌ Bad
function calculateScore(correct, total) {
  return (correct / total) * 100;
}
```

#### Interface vs Type
```typescript
// ✅ Good: 확장 가능한 객체는 interface
interface User {
  id: string;
  name: string;
}

interface Teacher extends User {
  subject: string;
}

// ✅ Good: Union, Tuple 등은 type
type Status = 'pending' | 'completed' | 'failed';
type Coordinates = [number, number];
```

#### 제네릭 사용
```typescript
// ✅ Good
function getFirstItem<T>(items: T[]): T | undefined {
  return items[0];
}

// ❌ Bad
function getFirstItem(items: any[]): any {
  return items[0];
}
```

### 2-3. 함수 작성

#### 화살표 함수 vs 일반 함수
```typescript
// ✅ Good: 화살표 함수 (콜백, 짧은 함수)
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);

// ✅ Good: 일반 함수 (메서드, 긴 함수)
function calculateStudentScore(student: Student): number {
  // 복잡한 로직...
  return score;
}
```

#### 함수 길이
```typescript
// ✅ Good: 한 함수는 20줄 이내 권장
function processData(data: Data): Result {
  const validated = validateData(data);
  const transformed = transformData(validated);
  return formatResult(transformed);
}

// ❌ Bad: 너무 긴 함수는 분리
function processData(data: Data): Result {
  // 100줄 이상의 코드...
}
```

#### Early Return
```typescript
// ✅ Good
function getUserName(user: User | null): string {
  if (!user) return 'Guest';
  if (!user.name) return 'Unknown';
  return user.name;
}

// ❌ Bad
function getUserName(user: User | null): string {
  let name = 'Guest';
  if (user) {
    if (user.name) {
      name = user.name;
    } else {
      name = 'Unknown';
    }
  }
  return name;
}
```

### 2-4. 에러 처리

```typescript
// ✅ Good: 명시적 에러 처리
async function fetchUserData(userId: string): Promise<User> {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error('Failed to fetch user', { userId, error });
      throw new UserNotFoundError(userId);
    }
    throw error;
  }
}

// ❌ Bad: 에러 무시
async function fetchUserData(userId: string): Promise<User | null> {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    return null; // 에러 정보 손실
  }
}
```

---

## 3. React/Next.js

### 3-1. 컴포넌트 작성

#### 함수형 컴포넌트
```tsx
// ✅ Good: 화살표 함수 + 타입 정의
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

#### Props 구조 분해
```tsx
// ✅ Good
const UserCard = ({ name, email, avatar }: UserCardProps) => {
  return <div>...</div>;
};

// ❌ Bad
const UserCard = (props: UserCardProps) => {
  return <div>{props.name}</div>;
};
```

#### 조건부 렌더링
```tsx
// ✅ Good: 명확한 조건
{isLoading && <Spinner />}
{error && <ErrorMessage error={error} />}
{data && <DataTable data={data} />}

// ✅ Good: 복잡한 조건은 별도 함수
const renderContent = () => {
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <EmptyState />;
  return <DataTable data={data} />;
};

return <div>{renderContent()}</div>;

// ❌ Bad: 중첩 삼항 연산자
{isLoading ? <Spinner /> : error ? <Error /> : data ? <Table /> : null}
```

### 3-2. Hooks 사용

#### 커스텀 훅
```tsx
// ✅ Good: use 접두사
function useUserData(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser(userId).then(setUser).finally(() => setLoading(false));
  }, [userId]);
  
  return { user, loading };
}

// 사용
const { user, loading } = useUserData('123');
```

#### useEffect 의존성
```tsx
// ✅ Good: 모든 의존성 명시
useEffect(() => {
  fetchData(userId, filter);
}, [userId, filter]);

// ❌ Bad: 의존성 누락
useEffect(() => {
  fetchData(userId, filter);
}, []); // eslint-disable-line
```

### 3-3. 상태 관리

#### 로컬 상태 vs 전역 상태
```tsx
// ✅ Good: 로컬 상태 (컴포넌트 내부)
const [isOpen, setIsOpen] = useState(false);

// ✅ Good: 전역 상태 (여러 컴포넌트에서 사용)
const user = useStore(state => state.user);
```

#### 상태 업데이트
```tsx
// ✅ Good: 함수형 업데이트
setCount(prev => prev + 1);

// ❌ Bad: 직접 참조 (비동기 문제 가능)
setCount(count + 1);
```

---

## 4. CSS/Styling

### 4-1. Tailwind CSS (사용 시)

```tsx
// ✅ Good: 명확한 클래스 순서
// 1. Layout (display, position)
// 2. Box Model (width, height, padding, margin)
// 3. Typography (font, text)
// 4. Visual (background, border, shadow)
// 5. Misc (cursor, transition)

<div className="
  flex items-center justify-between
  w-full h-12 px-4 py-2
  text-base font-medium
  bg-white border border-gray-200 rounded-lg shadow-sm
  hover:bg-gray-50 transition-colors
">
  Content
</div>

// ✅ Good: 조건부 클래스
<button className={cn(
  'btn',
  variant === 'primary' && 'btn-primary',
  variant === 'secondary' && 'btn-secondary',
  disabled && 'opacity-50 cursor-not-allowed'
)}>
  Click
</button>
```

### 4-2. CSS Modules (사용 시)

```tsx
// ✅ Good: 명확한 클래스명
import styles from './Button.module.css';

<button className={styles.button}>
  Click
</button>

// Button.module.css
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

.button:hover {
  background-color: var(--color-primary-600);
}
```

---

## 5. Git 컨벤션

### 5-1. 브랜치 전략

```
main (production)
  ├── develop (development)
  │   ├── feature/curriculum-management
  │   ├── feature/ai-integration
  │   └── feature/student-dashboard
  ├── hotfix/critical-bug
  └── release/v1.0.0
```

#### 브랜치 네이밍
```
feature/기능명       # 새로운 기능
bugfix/버그명        # 버그 수정
hotfix/긴급수정명    # 긴급 수정
release/버전         # 릴리스 준비
```

### 5-2. 커밋 메시지

#### Conventional Commits
```
<type>(<scope>): <subject>

<body>

<footer>
```

#### 타입
```
feat:     새로운 기능
fix:      버그 수정
docs:     문서 변경
style:    코드 포맷팅 (기능 변경 없음)
refactor: 코드 리팩토링
test:     테스트 추가/수정
chore:    빌드 설정, 패키지 등
perf:     성능 개선
```

#### 예시
```bash
# ✅ Good
feat(curriculum): add curriculum creation form
fix(auth): resolve login redirect issue
docs(api): update API documentation

# ❌ Bad
update
fix bug
WIP
```

### 5-3. Pull Request

#### PR 제목
```
[Feature] 커리큘럼 관리 기능 추가
[Fix] 로그인 리다이렉트 오류 수정
[Refactor] API 클라이언트 구조 개선
```

#### PR 설명 템플릿
```markdown
## 변경 사항
- 커리큘럼 생성 폼 추가
- 단원 추가/편집/삭제 기능 구현

## 테스트
- [ ] 단위 테스트 작성
- [ ] E2E 테스트 확인
- [ ] 수동 테스트 완료

## 스크린샷
(필요시 첨부)

## 관련 이슈
Closes #123
```

---

## 6. 코드 리뷰

### 6-1. 리뷰 체크리스트

**기능**
- [ ] 요구사항을 충족하는가?
- [ ] 엣지 케이스를 고려했는가?
- [ ] 에러 처리가 적절한가?

**코드 품질**
- [ ] 가독성이 좋은가?
- [ ] 중복 코드가 없는가?
- [ ] 네이밍이 명확한가?

**성능**
- [ ] 불필요한 리렌더링이 없는가?
- [ ] 메모리 누수 가능성이 없는가?

**테스트**
- [ ] 테스트가 작성되었는가?
- [ ] 테스트 커버리지가 충분한가?

**보안**
- [ ] 입력 검증이 되는가?
- [ ] 민감한 정보가 노출되지 않는가?

### 6-2. 리뷰 코멘트 예시

```markdown
# ✅ Good: 건설적인 피드백
💡 Suggestion: `getUserData` 함수를 `useMemo`로 감싸면 성능이 개선될 것 같습니다.

❓ Question: 이 함수가 null을 반환하는 경우는 어떤 경우인가요?

🐛 Issue: 여기서 에러가 발생하면 전체 앱이 크래시될 수 있습니다. try-catch 추가를 권장합니다.

# ❌ Bad: 비건설적인 코멘트
이 코드는 별로입니다.
왜 이렇게 짰나요?
```

---

## 7. 관련 문서

- [개발 환경 설정](./setup-guide.md)
- [프로젝트 구조](./project-structure.md)
- [데이터베이스 스키마](./database-schema.md)

---

## 변경 이력

| 날짜 | 버전 | 변경 내용 | 작성자 |
|------|------|----------|--------|
| 2025-11-17 | 0.1.0 | 초안 작성 | Dev Team |

---

**문서 상태**: 🟢 활성 (Active)  
**다음 리뷰 예정**: 2025-12-01

