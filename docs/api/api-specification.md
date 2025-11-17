# Learning Elevate – API 명세서

## 📋 문서 정보

- **작성일**: 2025-11-17
- **버전**: 0.1.0
- **상태**: 초안
- **Base URL**: `https://api.learning-elevate.com/v1` (예시)

---

## 목차

1. [인증 API](#1-인증-api)
2. [커리큘럼 API](#2-커리큘럼-api)
3. [문제 API](#3-문제-api)
4. [과제 API](#4-과제-api)
5. [학생 API](#5-학생-api)
6. [분석 API](#6-분석-api)
7. [에러 코드](#7-에러-코드)

---

## API 공통 사항

### 인증 방식

**Bearer Token (JWT)**
```http
Authorization: Bearer <access_token>
```

### 응답 형식

#### 성공 응답
```json
{
  "success": true,
  "data": { ... },
  "message": "Success"
}
```

#### 에러 응답
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": { ... }
  }
}
```

### 페이지네이션

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

---

## 1. 인증 API

### 1-1. 회원가입

**POST** `/auth/signup`

#### Request Body
```json
{
  "email": "teacher@example.com",
  "password": "securePassword123!",
  "name": "김영희",
  "role": "teacher",
  "additionalInfo": {
    "subject": "english",
    "schoolName": "서울중학교"
  }
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "teacher@example.com",
      "name": "김영희",
      "role": "teacher"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### 1-2. 로그인

**POST** `/auth/login`

#### Request Body
```json
{
  "email": "teacher@example.com",
  "password": "securePassword123!"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "teacher@example.com",
      "name": "김영희",
      "role": "teacher"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### 1-3. 토큰 갱신

**POST** `/auth/refresh`

#### Request Body
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

## 2. 커리큘럼 API

### 2-1. 커리큘럼 목록 조회

**GET** `/curriculum`

#### Query Parameters
- `teacherId` (optional): 교사 ID
- `subject` (optional): 과목 필터
- `page` (optional): 페이지 번호 (default: 1)
- `limit` (optional): 페이지 크기 (default: 20)

#### Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "2025 중1 영어 기초",
      "subject": "english",
      "gradeLevel": "middle_1",
      "unitCount": 10,
      "isActive": true,
      "createdAt": "2025-11-17T00:00:00Z",
      "updatedAt": "2025-11-17T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "totalPages": 1
  }
}
```

### 2-2. 커리큘럼 생성

**POST** `/curriculum`

#### Request Body
```json
{
  "name": "2025 중1 영어 기초",
  "subject": "english",
  "gradeLevel": "middle_1",
  "description": "중학교 1학년 영어 기초 커리큘럼",
  "units": [
    {
      "name": "현재완료 시제",
      "orderIndex": 1,
      "learningObjectives": [
        "현재완료 시제의 개념을 이해한다",
        "현재완료 시제를 활용하여 문장을 만들 수 있다"
      ],
      "difficulty": "intermediate",
      "concepts": ["present_perfect", "have_has", "past_participle"]
    }
  ]
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "2025 중1 영어 기초",
    "subject": "english",
    "gradeLevel": "middle_1",
    "description": "중학교 1학년 영어 기초 커리큘럼",
    "units": [
      {
        "id": "uuid",
        "name": "현재완료 시제",
        "orderIndex": 1,
        "learningObjectives": [...],
        "difficulty": "intermediate",
        "concepts": [...]
      }
    ],
    "createdAt": "2025-11-17T00:00:00Z"
  }
}
```

### 2-3. 커리큘럼 상세 조회

**GET** `/curriculum/:id`

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "2025 중1 영어 기초",
    "subject": "english",
    "gradeLevel": "middle_1",
    "description": "중학교 1학년 영어 기초 커리큘럼",
    "teacher": {
      "id": "uuid",
      "name": "김영희"
    },
    "units": [
      {
        "id": "uuid",
        "name": "현재완료 시제",
        "orderIndex": 1,
        "learningObjectives": [...],
        "difficulty": "intermediate",
        "concepts": [...],
        "questionCount": 50
      }
    ],
    "createdAt": "2025-11-17T00:00:00Z",
    "updatedAt": "2025-11-17T00:00:00Z"
  }
}
```

---

## 3. 문제 API

### 3-1. 문제 자동 생성

**POST** `/questions/generate`

#### Request Body
```json
{
  "unitId": "uuid",
  "count": 10,
  "difficulty": 5,
  "types": ["multiple_choice", "short_answer"],
  "typeRatio": {
    "multiple_choice": 0.5,
    "short_answer": 0.5
  }
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "id": "uuid",
        "type": "multiple_choice",
        "difficulty": 5,
        "questionText": "다음 문장의 빈칸에 알맞은 것은?",
        "questionData": {
          "sentence": "I ___ in Seoul for 5 years.",
          "choices": [
            { "id": "a", "text": "lived" },
            { "id": "b", "text": "have lived" },
            { "id": "c", "text": "am living" },
            { "id": "d", "text": "will live" }
          ]
        },
        "correctAnswer": "b",
        "explanation": "현재완료 시제는 'have/has + 과거분사' 형태로...",
        "concepts": ["present_perfect", "duration"]
      }
    ],
    "totalGenerated": 10
  }
}
```

### 3-2. 문제 세트 생성

**POST** `/question-sets`

#### Request Body
```json
{
  "unitId": "uuid",
  "name": "현재완료 시제 연습 세트",
  "description": "기본 개념 확인용",
  "questionIds": ["uuid1", "uuid2", "uuid3", ...],
  "estimatedDuration": 15
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "unitId": "uuid",
    "name": "현재완료 시제 연습 세트",
    "description": "기본 개념 확인용",
    "totalQuestions": 10,
    "estimatedDuration": 15,
    "createdAt": "2025-11-17T00:00:00Z"
  }
}
```

---

## 4. 과제 API

### 4-1. 과제 생성

**POST** `/assignments`

#### Request Body
```json
{
  "questionSetId": "uuid",
  "title": "현재완료 시제 과제",
  "description": "11월 20일까지 제출",
  "assignedTo": "all", // or "group:uuid" or "student:uuid"
  "dueDate": "2025-11-20T23:59:59Z"
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "현재완료 시제 과제",
    "description": "11월 20일까지 제출",
    "questionSet": {
      "id": "uuid",
      "name": "현재완료 시제 연습 세트",
      "totalQuestions": 10
    },
    "assignedTo": "all",
    "dueDate": "2025-11-20T23:59:59Z",
    "isPublished": false,
    "createdAt": "2025-11-17T00:00:00Z"
  }
}
```

### 4-2. 과제 목록 조회 (학생용)

**GET** `/assignments/student`

#### Query Parameters
- `status` (optional): `pending`, `completed`, `overdue`

#### Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "현재완료 시제 과제",
      "description": "11월 20일까지 제출",
      "dueDate": "2025-11-20T23:59:59Z",
      "status": "pending",
      "questionSet": {
        "totalQuestions": 10,
        "estimatedDuration": 15
      },
      "attempt": null // or attempt object if started
    }
  ]
}
```

### 4-3. 과제 시작

**POST** `/assignments/:id/start`

#### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "attemptId": "uuid",
    "assignmentId": "uuid",
    "questions": [
      {
        "id": "uuid",
        "type": "multiple_choice",
        "questionText": "...",
        "questionData": { ... }
      }
    ],
    "startedAt": "2025-11-17T10:00:00Z"
  }
}
```

### 4-4. 답안 제출

**POST** `/attempts/:attemptId/submit`

#### Request Body
```json
{
  "answers": [
    {
      "questionId": "uuid",
      "answer": "have lived",
      "timeSpent": 45
    }
  ]
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "attemptId": "uuid",
    "score": 7,
    "totalQuestions": 10,
    "accuracyRate": 70,
    "timeSpent": 450,
    "status": "submitted",
    "submittedAt": "2025-11-17T10:15:00Z",
    "results": [
      {
        "questionId": "uuid",
        "studentAnswer": "have lived",
        "correctAnswer": "have lived",
        "isCorrect": true,
        "aiFeedback": "정답입니다! 잘했어요."
      },
      {
        "questionId": "uuid2",
        "studentAnswer": "lived",
        "correctAnswer": "have lived",
        "isCorrect": false,
        "aiFeedback": "현재완료 시제는 'have/has + 과거분사' 형태로..."
      }
    ]
  }
}
```

---

## 5. 학생 API

### 5-1. 학생 목록 조회 (교사용)

**GET** `/students`

#### Query Parameters
- `teacherId` (optional): 교사 ID
- `search` (optional): 이름 검색

#### Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "김철수",
      "email": "chulsoo@example.com",
      "gradeLevel": "middle_1",
      "currentLevel": 5,
      "enrolledDate": "2025-09-01",
      "stats": {
        "totalAttempts": 15,
        "averageScore": 72,
        "recentActivity": "2025-11-17T10:00:00Z"
      }
    }
  ]
}
```

### 5-2. 학생 상세 조회

**GET** `/students/:id`

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "김철수",
    "email": "chulsoo@example.com",
    "gradeLevel": "middle_1",
    "currentLevel": 5,
    "enrolledDate": "2025-09-01",
    "teacher": {
      "id": "uuid",
      "name": "김영희"
    },
    "parent": {
      "id": "uuid",
      "name": "김OO",
      "email": "parent@example.com"
    },
    "stats": {
      "totalAttempts": 15,
      "totalQuestions": 150,
      "averageScore": 72,
      "totalStudyTime": 1800,
      "recentActivity": "2025-11-17T10:00:00Z"
    }
  }
}
```

---

## 6. 분석 API

### 6-1. 학생 약점 분석

**GET** `/analytics/students/:id/weaknesses`

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "studentId": "uuid",
    "weakConcepts": [
      {
        "concept": {
          "id": "uuid",
          "name": "현재완료 시제",
          "category": "tense"
        },
        "accuracyRate": 35,
        "attemptCount": 10,
        "lastAttemptDate": "2025-11-17T10:00:00Z",
        "priority": "high",
        "recommendedActions": [
          "기본 개념 복습",
          "추가 연습 문제 풀이"
        ]
      }
    ],
    "strongConcepts": [
      {
        "concept": {
          "id": "uuid",
          "name": "기본 시제",
          "category": "tense"
        },
        "accuracyRate": 90,
        "attemptCount": 12
      }
    ]
  }
}
```

### 6-2. 학습 이력 조회

**GET** `/analytics/students/:id/history`

#### Query Parameters
- `startDate` (optional): 시작 날짜
- `endDate` (optional): 종료 날짜
- `limit` (optional): 결과 수 제한

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "studentId": "uuid",
    "period": {
      "startDate": "2025-10-17",
      "endDate": "2025-11-17"
    },
    "summary": {
      "totalDays": 18,
      "totalQuestions": 156,
      "averageScore": 72,
      "totalStudyTime": 30240
    },
    "dailyStats": [
      {
        "date": "2025-11-17",
        "questionsCompleted": 10,
        "averageScore": 70,
        "studyTime": 900
      }
    ],
    "conceptProgress": [
      {
        "concept": "현재완료 시제",
        "initialAccuracy": 35,
        "currentAccuracy": 45,
        "improvement": 10
      }
    ]
  }
}
```

### 6-3. 학부모용 리포트

**GET** `/analytics/students/:id/parent-report`

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "student": {
      "id": "uuid",
      "name": "김철수",
      "gradeLevel": "middle_1",
      "currentLevel": 5
    },
    "period": {
      "startDate": "2025-10-17",
      "endDate": "2025-11-17"
    },
    "summary": {
      "studyDays": 18,
      "totalQuestions": 156,
      "averageScore": 72,
      "totalStudyTime": 30240,
      "levelProgress": {
        "from": 4,
        "to": 5,
        "improvement": 1
      }
    },
    "strengths": [
      "기본 시제 (90% 정답률)",
      "조동사 (85% 정답률)"
    ],
    "weaknesses": [
      "현재완료 시제 (35% 정답률)",
      "전치사 (45% 정답률)"
    ],
    "teacherComment": "철수 학생은 기본 문법은 잘 이해하고 있으나...",
    "aiSummary": "철수 학생은 지난 한 달간 꾸준히 학습하고 있으며...",
    "recommendations": [
      "현재완료 시제 집중 학습 권장",
      "주 3회, 회당 30분 학습 권장"
    ]
  }
}
```

---

## 7. 에러 코드

### 7-1. HTTP 상태 코드

| 코드 | 의미 | 설명 |
|------|------|------|
| 200 | OK | 성공 |
| 201 | Created | 생성 성공 |
| 400 | Bad Request | 잘못된 요청 |
| 401 | Unauthorized | 인증 실패 |
| 403 | Forbidden | 권한 없음 |
| 404 | Not Found | 리소스 없음 |
| 409 | Conflict | 충돌 (중복 등) |
| 422 | Unprocessable Entity | 유효성 검증 실패 |
| 500 | Internal Server Error | 서버 오류 |

### 7-2. 커스텀 에러 코드

```json
{
  "AUTH_001": "Invalid credentials",
  "AUTH_002": "Token expired",
  "AUTH_003": "Invalid token",
  "AUTH_004": "Email already exists",
  
  "USER_001": "User not found",
  "USER_002": "Invalid user role",
  
  "CURRICULUM_001": "Curriculum not found",
  "CURRICULUM_002": "Invalid curriculum data",
  
  "QUESTION_001": "Question not found",
  "QUESTION_002": "Failed to generate questions",
  
  "ASSIGNMENT_001": "Assignment not found",
  "ASSIGNMENT_002": "Assignment already submitted",
  "ASSIGNMENT_003": "Assignment not started",
  
  "VALIDATION_001": "Required field missing",
  "VALIDATION_002": "Invalid format",
  "VALIDATION_003": "Value out of range"
}
```

---

## 8. 관련 문서

- [데이터베이스 스키마](../development/database-schema.md)
- [개발 환경 설정](../development/setup-guide.md)
- [기능 명세서](../planning/feature-specification.md)

---

## 변경 이력

| 날짜 | 버전 | 변경 내용 | 작성자 |
|------|------|----------|--------|
| 2025-11-17 | 0.1.0 | 초안 작성 | Dev Team |

---

**문서 상태**: 🟢 활성 (Active)  
**다음 리뷰 예정**: 2025-12-01

---

## 📝 Postman Collection

API 테스트를 위한 Postman Collection은 별도로 제공됩니다.

```bash
# Postman Collection 다운로드
curl -o learning-elevate.postman_collection.json \
  https://api.learning-elevate.com/docs/postman
```

