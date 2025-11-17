# Learning Elevate – 데이터베이스 스키마

## 📋 문서 정보

- **작성일**: 2025-11-17
- **버전**: 0.1.0
- **상태**: 초안

---

## 목차

1. [ERD 개요](#1-erd-개요)
2. [테이블 정의](#2-테이블-정의)
3. [관계 설명](#3-관계-설명)
4. [인덱스 전략](#4-인덱스-전략)
5. [마이그레이션](#5-마이그레이션)

---

## 1. ERD 개요

### 1-1. 주요 엔티티

```
Users (사용자)
├── Teachers (교사)
├── Students (학생)
└── Parents (학부모)

Curriculum (커리큘럼)
└── Units (단원)
    └── Concepts (개념)

Questions (문제)
└── QuestionSets (문제 세트)

Assignments (과제)
└── Attempts (시도)
    └── Answers (답안)

Analytics (분석)
├── WeaknessSummary (약점 요약)
└── LearningHistory (학습 이력)
```

### 1-2. 관계 다이어그램

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   Teachers  │──1:N──│ Curriculum  │──1:N──│    Units    │
└─────────────┘       └─────────────┘       └─────────────┘
       │                                            │
       │                                            │
       │1:N                                         │1:N
       │                                            │
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│ Assignments │──1:N──│  Attempts   │──1:N──│   Answers   │
└─────────────┘       └─────────────┘       └─────────────┘
       │                      │
       │N:1                   │N:1
       │                      │
┌─────────────┐       ┌─────────────┐
│  Students   │──1:N──│  Learning   │
│             │       │   History   │
└─────────────┘       └─────────────┘
       │
       │N:1
       │
┌─────────────┐
│   Parents   │
└─────────────┘
```

---

## 2. 테이블 정의

### 2-1. Users (사용자)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('teacher', 'student', 'parent', 'admin')),
  avatar_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

### 2-2. Teachers (교사)

```sql
CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(50) NOT NULL,
  school_name VARCHAR(200),
  grade_levels TEXT[], -- ['middle_1', 'middle_2', 'middle_3']
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_teachers_user_id ON teachers(user_id);
```

### 2-3. Students (학생)

```sql
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES teachers(id) ON DELETE SET NULL,
  parent_id UUID REFERENCES parents(id) ON DELETE SET NULL,
  grade_level VARCHAR(50) NOT NULL,
  current_level INTEGER DEFAULT 1 CHECK (current_level BETWEEN 1 AND 10),
  enrolled_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_teacher_id ON students(teacher_id);
CREATE INDEX idx_students_parent_id ON students(parent_id);
```

### 2-4. Parents (학부모)

```sql
CREATE TABLE parents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_parents_user_id ON parents(user_id);
```

### 2-5. Curriculum (커리큘럼)

```sql
CREATE TABLE curriculum (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  subject VARCHAR(50) NOT NULL,
  grade_level VARCHAR(50) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_curriculum_teacher_id ON curriculum(teacher_id);
CREATE INDEX idx_curriculum_subject ON curriculum(subject);
```

### 2-6. Units (단원)

```sql
CREATE TABLE units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  curriculum_id UUID NOT NULL REFERENCES curriculum(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  order_index INTEGER NOT NULL,
  learning_objectives TEXT[],
  difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_duration INTEGER, -- minutes
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(curriculum_id, order_index)
);

CREATE INDEX idx_units_curriculum_id ON units(curriculum_id);
```

### 2-7. Concepts (개념/태그)

```sql
CREATE TABLE concepts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  subject VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(name, subject)
);

CREATE TABLE unit_concepts (
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
  concept_id UUID REFERENCES concepts(id) ON DELETE CASCADE,
  PRIMARY KEY (unit_id, concept_id)
);

CREATE INDEX idx_concepts_subject ON concepts(subject);
CREATE INDEX idx_unit_concepts_unit_id ON unit_concepts(unit_id);
CREATE INDEX idx_unit_concepts_concept_id ON unit_concepts(concept_id);
```

### 2-8. Questions (문제)

```sql
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('multiple_choice', 'short_answer', 'essay', 'listening')),
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 10),
  question_text TEXT NOT NULL,
  question_data JSONB, -- 추가 데이터 (선택지, 이미지 URL 등)
  correct_answer TEXT NOT NULL,
  alternative_answers TEXT[], -- 인정되는 다른 답안들
  explanation TEXT,
  hint TEXT,
  created_by VARCHAR(20) DEFAULT 'ai', -- 'ai' or 'teacher'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_concepts (
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  concept_id UUID REFERENCES concepts(id) ON DELETE CASCADE,
  PRIMARY KEY (question_id, concept_id)
);

CREATE INDEX idx_questions_unit_id ON questions(unit_id);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_question_concepts_question_id ON question_concepts(question_id);
```

### 2-9. Question Sets (문제 세트)

```sql
CREATE TABLE question_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  question_ids UUID[] NOT NULL, -- 순서가 있는 문제 ID 배열
  total_questions INTEGER NOT NULL,
  estimated_duration INTEGER, -- minutes
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_question_sets_unit_id ON question_sets(unit_id);
CREATE INDEX idx_question_sets_teacher_id ON question_sets(teacher_id);
```

### 2-10. Assignments (과제)

```sql
CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  question_set_id UUID NOT NULL REFERENCES question_sets(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  assigned_to TEXT NOT NULL, -- 'all', 'group:group_id', 'student:student_id'
  due_date TIMESTAMP,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_assignments_teacher_id ON assignments(teacher_id);
CREATE INDEX idx_assignments_question_set_id ON assignments(question_set_id);
CREATE INDEX idx_assignments_due_date ON assignments(due_date);
```

### 2-11. Attempts (시도)

```sql
CREATE TABLE attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  submitted_at TIMESTAMP,
  score INTEGER,
  total_questions INTEGER NOT NULL,
  correct_count INTEGER,
  accuracy_rate DECIMAL(5,2),
  time_spent INTEGER, -- seconds
  status VARCHAR(20) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'submitted', 'reviewed', 'confirmed')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_attempts_assignment_id ON attempts(assignment_id);
CREATE INDEX idx_attempts_student_id ON attempts(student_id);
CREATE INDEX idx_attempts_status ON attempts(status);
```

### 2-12. Answers (답안)

```sql
CREATE TABLE answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  student_answer TEXT,
  is_correct BOOLEAN,
  partial_score DECIMAL(3,2), -- 0.00 ~ 1.00
  time_spent INTEGER, -- seconds
  ai_feedback TEXT,
  teacher_feedback TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(attempt_id, question_id)
);

CREATE INDEX idx_answers_attempt_id ON answers(attempt_id);
CREATE INDEX idx_answers_question_id ON answers(question_id);
CREATE INDEX idx_answers_is_correct ON answers(is_correct);
```

### 2-13. Weakness Summary (약점 요약)

```sql
CREATE TABLE weakness_summary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  concept_id UUID NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
  accuracy_rate DECIMAL(5,2) NOT NULL,
  attempt_count INTEGER NOT NULL,
  last_attempt_date TIMESTAMP,
  priority VARCHAR(20) CHECK (priority IN ('high', 'medium', 'low')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(student_id, concept_id)
);

CREATE INDEX idx_weakness_summary_student_id ON weakness_summary(student_id);
CREATE INDEX idx_weakness_summary_concept_id ON weakness_summary(concept_id);
CREATE INDEX idx_weakness_summary_priority ON weakness_summary(priority);
```

### 2-14. Learning History (학습 이력)

```sql
CREATE TABLE learning_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL, -- 'assignment', 'practice', 'review'
  activity_id UUID NOT NULL, -- attempt_id or other activity id
  score INTEGER,
  duration INTEGER, -- seconds
  concepts_practiced UUID[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_learning_history_student_id ON learning_history(student_id);
CREATE INDEX idx_learning_history_created_at ON learning_history(created_at);
```

---

## 3. 관계 설명

### 3-1. 사용자 관계

- **Users ↔ Teachers/Students/Parents**: 1:1 관계
  - 각 역할은 별도 테이블로 관리
  - `user_id`로 연결

- **Teachers ↔ Students**: 1:N 관계
  - 한 교사는 여러 학생 담당
  - `teacher_id` 외래키

- **Parents ↔ Students**: 1:N 관계
  - 한 학부모는 여러 자녀 가능
  - `parent_id` 외래키

### 3-2. 커리큘럼 관계

- **Teachers ↔ Curriculum**: 1:N 관계
  - 한 교사는 여러 커리큘럼 생성 가능

- **Curriculum ↔ Units**: 1:N 관계
  - 한 커리큘럼은 여러 단원 포함

- **Units ↔ Concepts**: N:M 관계
  - 한 단원은 여러 개념 포함
  - 한 개념은 여러 단원에서 사용
  - `unit_concepts` 조인 테이블

### 3-3. 문제 관계

- **Units ↔ Questions**: 1:N 관계
  - 한 단원은 여러 문제 포함

- **Questions ↔ Concepts**: N:M 관계
  - 한 문제는 여러 개념 테스트
  - `question_concepts` 조인 테이블

- **Units ↔ Question Sets**: 1:N 관계
  - 한 단원은 여러 문제 세트 가능

### 3-4. 과제 및 학습 관계

- **Assignments ↔ Attempts**: 1:N 관계
  - 한 과제는 여러 학생의 시도 포함

- **Attempts ↔ Answers**: 1:N 관계
  - 한 시도는 여러 답안 포함

- **Students ↔ Weakness Summary**: 1:N 관계
  - 한 학생은 여러 약점 개념 보유

---

## 4. 인덱스 전략

### 4-1. 주요 쿼리 패턴

**교사 대시보드**
```sql
-- 검토 대기 목록
SELECT * FROM attempts 
WHERE status = 'submitted' 
AND assignment_id IN (SELECT id FROM assignments WHERE teacher_id = ?)
ORDER BY submitted_at DESC;
```

**학생 약점 분석**
```sql
-- 학생 약점 TOP 5
SELECT c.name, ws.accuracy_rate, ws.attempt_count
FROM weakness_summary ws
JOIN concepts c ON ws.concept_id = c.id
WHERE ws.student_id = ?
ORDER BY ws.priority DESC, ws.accuracy_rate ASC
LIMIT 5;
```

**학습 이력 조회**
```sql
-- 최근 30일 학습 이력
SELECT * FROM learning_history
WHERE student_id = ?
AND created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;
```

### 4-2. 복합 인덱스

```sql
-- 과제 검토 쿼리 최적화
CREATE INDEX idx_attempts_status_assignment ON attempts(status, assignment_id);

-- 학생 학습 이력 조회 최적화
CREATE INDEX idx_learning_history_student_date ON learning_history(student_id, created_at DESC);

-- 약점 분석 최적화
CREATE INDEX idx_weakness_summary_student_priority ON weakness_summary(student_id, priority, accuracy_rate);
```

---

## 5. 마이그레이션

### 5-1. Prisma Schema 예시

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  passwordHash  String    @map("password_hash")
  name          String
  role          Role
  avatarUrl     String?   @map("avatar_url")
  isActive      Boolean   @default(true) @map("is_active")
  emailVerified Boolean   @default(false) @map("email_verified")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")
  lastLoginAt   DateTime? @map("last_login_at")

  teacher Teacher?
  student Student?
  parent  Parent?

  @@index([email])
  @@index([role])
  @@map("users")
}

enum Role {
  teacher
  student
  parent
  admin
}

model Teacher {
  id          String   @id @default(uuid())
  userId      String   @unique @map("user_id")
  subject     String
  schoolName  String?  @map("school_name")
  gradeLevels String[] @map("grade_levels")
  bio         String?
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  user        User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  curriculum  Curriculum[]
  assignments Assignment[]
  students    Student[]

  @@index([userId])
  @@map("teachers")
}

// ... 나머지 모델들
```

### 5-2. 마이그레이션 명령

```bash
# 마이그레이션 생성
npx prisma migrate dev --name init

# 마이그레이션 적용
npx prisma migrate deploy

# 스키마 동기화
npx prisma db push

# Prisma Client 생성
npx prisma generate
```

---

## 6. 관련 문서

- [개발 환경 설정](./setup-guide.md)
- [프로젝트 구조](./project-structure.md)
- [API 명세서](../api/api-specification.md)

---

## 변경 이력

| 날짜 | 버전 | 변경 내용 | 작성자 |
|------|------|----------|--------|
| 2025-11-17 | 0.1.0 | 초안 작성 | Dev Team |

---

**문서 상태**: 🟢 활성 (Active)  
**다음 리뷰 예정**: 2025-12-01

