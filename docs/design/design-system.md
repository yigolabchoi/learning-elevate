# Learning Elevate – 디자인 시스템

## 📋 문서 정보

- **작성일**: 2025-11-17
- **버전**: 0.1.0
- **상태**: 초안

---

## 목차

1. [디자인 원칙](#1-디자인-원칙)
2. [색상 시스템](#2-색상-시스템)
3. [타이포그래피](#3-타이포그래피)
4. [간격 및 레이아웃](#4-간격-및-레이아웃)
5. [아이콘](#5-아이콘)
6. [그림자 및 깊이](#6-그림자-및-깊이)
7. [애니메이션](#7-애니메이션)

---

## 1. 디자인 원칙

### 1-1. 핵심 가치

**명확성 (Clarity)**
- 교육 서비스의 특성상 정보 전달이 명확해야 함
- 복잡한 데이터를 직관적으로 시각화
- 사용자가 다음 행동을 쉽게 예측할 수 있어야 함

**신뢰성 (Trust)**
- 전문적이고 안정적인 느낌
- 교사와 학부모가 신뢰할 수 있는 디자인
- 일관된 경험 제공

**친근함 (Friendliness)**
- 학생들이 부담 없이 사용할 수 있는 UI
- 긍정적인 학습 경험 제공
- 성취감을 주는 비주얼 피드백

### 1-2. 사용자별 디자인 고려사항

| 사용자 | 디자인 방향 | 주요 요소 |
|--------|------------|----------|
| **교사** | 전문적, 효율적 | 데이터 시각화, 대시보드, 빠른 액션 |
| **학생** | 친근한, 동기부여 | 게임화 요소, 즉각적 피드백, 밝은 색상 |
| **학부모** | 신뢰감, 투명성 | 명확한 리포트, 차트, 전문적 톤 |

---

## 2. 색상 시스템

### 2-1. 브랜드 컬러

#### Primary Color (주색상)
```css
--color-primary-50:  #E3F2FD;
--color-primary-100: #BBDEFB;
--color-primary-200: #90CAF9;
--color-primary-300: #64B5F6;
--color-primary-400: #42A5F5;
--color-primary-500: #2196F3;  /* Main */
--color-primary-600: #1E88E5;
--color-primary-700: #1976D2;
--color-primary-800: #1565C0;
--color-primary-900: #0D47A1;
```

**사용처**:
- 주요 액션 버튼
- 링크
- 진행 상태 표시
- 선택된 항목

#### Secondary Color (보조색상)
```css
--color-secondary-50:  #F3E5F5;
--color-secondary-100: #E1BEE7;
--color-secondary-200: #CE93D8;
--color-secondary-300: #BA68C8;
--color-secondary-400: #AB47BC;
--color-secondary-500: #9C27B0;  /* Main */
--color-secondary-600: #8E24AA;
--color-secondary-700: #7B1FA2;
--color-secondary-800: #6A1B9A;
--color-secondary-900: #4A148C;
```

**사용처**:
- 강조 요소
- 배지
- 특별한 알림

### 2-2. 시맨틱 컬러

#### Success (성공)
```css
--color-success-50:  #E8F5E9;
--color-success-100: #C8E6C9;
--color-success-500: #4CAF50;  /* Main */
--color-success-700: #388E3C;
--color-success-900: #1B5E20;
```

**사용처**: 정답, 완료, 성공 메시지

#### Error (오류)
```css
--color-error-50:  #FFEBEE;
--color-error-100: #FFCDD2;
--color-error-500: #F44336;  /* Main */
--color-error-700: #D32F2F;
--color-error-900: #B71C1C;
```

**사용처**: 오답, 에러 메시지, 경고

#### Warning (경고)
```css
--color-warning-50:  #FFF3E0;
--color-warning-100: #FFE0B2;
--color-warning-500: #FF9800;  /* Main */
--color-warning-700: #F57C00;
--color-warning-900: #E65100;
```

**사용처**: 주의 필요, 마감 임박

#### Info (정보)
```css
--color-info-50:  #E1F5FE;
--color-info-100: #B3E5FC;
--color-info-500: #03A9F4;  /* Main */
--color-info-700: #0288D1;
--color-info-900: #01579B;
```

**사용처**: 도움말, 정보 메시지

### 2-3. 중립 컬러 (Gray Scale)

```css
--color-gray-50:  #FAFAFA;
--color-gray-100: #F5F5F5;
--color-gray-200: #EEEEEE;
--color-gray-300: #E0E0E0;
--color-gray-400: #BDBDBD;
--color-gray-500: #9E9E9E;
--color-gray-600: #757575;
--color-gray-700: #616161;
--color-gray-800: #424242;
--color-gray-900: #212121;
```

**사용처**:
- 텍스트 (700, 800, 900)
- 배경 (50, 100, 200)
- 테두리 (300, 400)
- 비활성 요소 (400, 500)

### 2-4. 배경 컬러

```css
--color-bg-primary:   #FFFFFF;
--color-bg-secondary: #F8F9FA;
--color-bg-tertiary:  #F1F3F5;
--color-bg-overlay:   rgba(0, 0, 0, 0.5);
```

### 2-5. 텍스트 컬러

```css
--color-text-primary:   #212121;  /* 주요 텍스트 */
--color-text-secondary: #616161;  /* 보조 텍스트 */
--color-text-disabled:  #9E9E9E;  /* 비활성 텍스트 */
--color-text-inverse:   #FFFFFF;  /* 어두운 배경 위 텍스트 */
```

---

## 3. 타이포그래피

### 3-1. 폰트 패밀리

```css
/* 한글 + 영문 */
--font-family-primary: 'Pretendard', -apple-system, BlinkMacSystemFont, 
                       'Segoe UI', Roboto, 'Helvetica Neue', Arial, 
                       sans-serif;

/* 코드/숫자 */
--font-family-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
```

### 3-2. 폰트 크기

```css
--font-size-xs:   0.75rem;   /* 12px */
--font-size-sm:   0.875rem;  /* 14px */
--font-size-base: 1rem;      /* 16px */
--font-size-lg:   1.125rem;  /* 18px */
--font-size-xl:   1.25rem;   /* 20px */
--font-size-2xl:  1.5rem;    /* 24px */
--font-size-3xl:  1.875rem;  /* 30px */
--font-size-4xl:  2.25rem;   /* 36px */
--font-size-5xl:  3rem;      /* 48px */
```

### 3-3. 폰트 굵기

```css
--font-weight-light:    300;
--font-weight-regular:  400;
--font-weight-medium:   500;
--font-weight-semibold: 600;
--font-weight-bold:     700;
```

### 3-4. 행간 (Line Height)

```css
--line-height-tight:  1.25;
--line-height-normal: 1.5;
--line-height-loose:  1.75;
```

### 3-5. 타이포그래피 스케일

#### Heading
```css
.heading-1 {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: -0.02em;
}

.heading-2 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

.heading-3 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
}

.heading-4 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
}
```

#### Body
```css
.body-large {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
}

.body-base {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
}

.body-small {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
}
```

#### Caption
```css
.caption {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  color: var(--color-text-secondary);
}
```

---

## 4. 간격 및 레이아웃

### 4-1. 간격 시스템 (8px 기반)

```css
--spacing-0:  0;
--spacing-1:  0.25rem;  /* 4px */
--spacing-2:  0.5rem;   /* 8px */
--spacing-3:  0.75rem;  /* 12px */
--spacing-4:  1rem;     /* 16px */
--spacing-5:  1.25rem;  /* 20px */
--spacing-6:  1.5rem;   /* 24px */
--spacing-8:  2rem;     /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
```

### 4-2. 컨테이너

```css
--container-xs: 480px;
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

### 4-3. 브레이크포인트

```css
/* Mobile First */
--breakpoint-sm: 640px;   /* Tablet */
--breakpoint-md: 768px;   /* Tablet Landscape */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large Desktop */
--breakpoint-2xl: 1536px; /* Extra Large Desktop */
```

### 4-4. 테두리 반경 (Border Radius)

```css
--radius-none: 0;
--radius-sm:   0.25rem;  /* 4px */
--radius-base: 0.5rem;   /* 8px */
--radius-md:   0.75rem;  /* 12px */
--radius-lg:   1rem;     /* 16px */
--radius-xl:   1.5rem;   /* 24px */
--radius-full: 9999px;   /* 완전한 원형 */
```

---

## 5. 아이콘

### 5-1. 아이콘 라이브러리

**추천**: [Lucide Icons](https://lucide.dev/) 또는 [Heroicons](https://heroicons.com/)

**특징**:
- 깔끔하고 모던한 디자인
- 다양한 크기 지원
- React/Vue 컴포넌트 제공

### 5-2. 아이콘 크기

```css
--icon-xs: 16px;
--icon-sm: 20px;
--icon-md: 24px;
--icon-lg: 32px;
--icon-xl: 48px;
```

### 5-3. 주요 아이콘 사용처

| 아이콘 | 사용처 | 이름 |
|--------|--------|------|
| ✅ | 정답, 완료 | CheckCircle |
| ❌ | 오답, 에러 | XCircle |
| ⚠️ | 경고 | AlertTriangle |
| ℹ️ | 정보 | Info |
| 📊 | 통계, 리포트 | BarChart |
| 📝 | 과제, 문제 | FileText |
| 👤 | 사용자 | User |
| 🏠 | 홈 | Home |
| ⚙️ | 설정 | Settings |
| 🔔 | 알림 | Bell |

---

## 6. 그림자 및 깊이

### 6-1. 그림자 (Elevation)

```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
             0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
             0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
             0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
             0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### 6-2. 사용 가이드

| 레벨 | 사용처 | 예시 |
|------|--------|------|
| xs | 미세한 구분 | 입력 필드 테두리 |
| sm | 카드, 버튼 | 기본 카드 |
| md | 드롭다운, 팝오버 | 메뉴 |
| lg | 모달 | 다이얼로그 |
| xl | 중요한 모달 | 확인 팝업 |
| 2xl | 전체 화면 오버레이 | 이미지 뷰어 |

---

## 7. 애니메이션

### 7-1. 트랜지션 속도

```css
--duration-fast:   150ms;
--duration-base:   200ms;
--duration-slow:   300ms;
--duration-slower: 500ms;
```

### 7-2. 이징 (Easing)

```css
--ease-in:     cubic-bezier(0.4, 0, 1, 1);
--ease-out:    cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### 7-3. 애니메이션 원칙

**부드러움 (Smoothness)**
- 모든 상태 변화는 애니메이션 적용
- 갑작스러운 변화 지양

**빠른 반응 (Responsiveness)**
- 사용자 액션에 즉각 반응 (150ms 이내)
- 로딩 상태는 명확하게 표시

**의미 있는 모션 (Meaningful Motion)**
- 사용자의 주의를 적절히 유도
- 과도한 애니메이션 지양

### 7-4. 주요 애니메이션

#### Fade In/Out
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
```

#### Slide In/Out
```css
@keyframes slideInUp {
  from { 
    transform: translateY(20px);
    opacity: 0;
  }
  to { 
    transform: translateY(0);
    opacity: 1;
  }
}
```

#### Scale
```css
@keyframes scaleIn {
  from { 
    transform: scale(0.95);
    opacity: 0;
  }
  to { 
    transform: scale(1);
    opacity: 1;
  }
}
```

---

## 8. 접근성 (Accessibility)

### 8-1. 색상 대비

- **WCAG 2.1 AA 준수**: 텍스트와 배경의 대비 비율 최소 4.5:1
- **대형 텍스트**: 3:1 이상

### 8-2. 포커스 표시

```css
--focus-ring: 0 0 0 3px rgba(33, 150, 243, 0.3);

*:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}
```

### 8-3. 키보드 네비게이션

- 모든 인터랙티브 요소는 키보드로 접근 가능
- Tab 순서는 논리적 흐름을 따름
- 포커스 표시는 명확하게

---

## 9. 다크 모드 (향후 지원)

```css
/* 다크 모드 색상 (향후 버전) */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: #1A1A1A;
    --color-bg-secondary: #2D2D2D;
    --color-text-primary: #FFFFFF;
    --color-text-secondary: #B0B0B0;
  }
}
```

---

## 10. 관련 문서

- [컴포넌트 라이브러리](./component-library.md)
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

