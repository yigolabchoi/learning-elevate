# 🚀 Learning Elevate - GitHub + AWS S3 자동 배포 가이드

## 📋 목차

1. [개요](#개요)
2. [사전 준비사항](#사전-준비사항)
3. [단계별 설정 가이드](#단계별-설정-가이드)
4. [자동 배포 테스트](#자동-배포-테스트)
5. [문제 해결](#문제-해결)

---

## 개요

이 가이드는 Learning Elevate 프론트엔드를 GitHub에 push하면 자동으로 AWS S3에 배포되는 CI/CD 파이프라인을 구축하는 방법을 안내합니다.

### 🎯 목표
```
코드 수정 → git push → GitHub Actions 자동 실행 → 빌드 → S3 배포 → 웹사이트 업데이트
```

### ⏱️ 예상 소요 시간
- AWS 설정: 20분
- GitHub 설정: 10분
- 테스트: 5분
- **총 35분**

---

## 사전 준비사항

### ✅ 필수 계정
- [ ] AWS 계정 (https://aws.amazon.com)
- [ ] GitHub 계정 (https://github.com)
- [ ] 신용카드 (AWS 무료 티어 사용 가능)

### ✅ 필수 도구
- [ ] Git 설치 확인: `git --version`
- [ ] Node.js 설치 확인: `node --version`
- [ ] 터미널/명령 프롬프트 접근 권한

### ✅ 프로젝트 상태
- [ ] 로컬에 프로젝트 코드 존재
- [ ] 프론트엔드 빌드 가능 (`cd frontend && npm run build`)

---

## 단계별 설정 가이드

## 🔴 **STEP 1: AWS S3 설정** (20분)

### 1-1. S3 버킷 생성

**AWS Console** → **S3** → **버킷 만들기**

```
버킷 이름: learning-elevate-frontend
AWS 리전: ap-northeast-2 (서울)
퍼블릭 액세스 차단: ❌ 체크 해제 (모든 항목)
```

⚠️ **중요**: 버킷 이름은 전 세계에서 고유해야 합니다!

### 1-2. 버킷 정책 설정 (퍼블릭 읽기 권한)

**버킷 선택** → **권한** → **버킷 정책** → **편집**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::learning-elevate-frontend/*"
    }
  ]
}
```

⚠️ `learning-elevate-frontend`를 실제 버킷 이름으로 변경!

### 1-3. 정적 웹사이트 호스팅 활성화

**버킷 선택** → **속성** → **정적 웹 사이트 호스팅** → **편집**

```
정적 웹 사이트 호스팅: 활성화
인덱스 문서: index.html
오류 문서: index.html
```

**저장 후 엔드포인트 URL 복사**:
```
http://learning-elevate-frontend.s3-website.ap-northeast-2.amazonaws.com
```

### 1-4. CORS 설정

**버킷 선택** → **권한** → **CORS** → **편집**

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3000
  }
]
```

### 1-5. IAM 사용자 생성 (GitHub Actions용)

**IAM** → **사용자** → **사용자 추가**

```
사용자 이름: github-actions-deploy
액세스 유형: ✅ 프로그래밍 방식 액세스
권한: AmazonS3FullAccess
```

**✅ 중요: 액세스 키 저장!**
```
액세스 키 ID: AKIAIOSFODNN7EXAMPLE
비밀 액세스 키: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

⚠️ **이 키는 다시 확인할 수 없으므로 안전한 곳에 보관!**

---

## 🟢 **STEP 2: GitHub 저장소 생성** (5분)

### 2-1. GitHub에서 새 저장소 생성

**GitHub** → **New repository**

```
Repository name: learning-elevate
Description: AI-powered learning management platform
Visibility: Public 또는 Private
Initialize: ❌ 체크하지 않음
```

### 2-2. 저장소 URL 복사

```
https://github.com/YOUR_USERNAME/learning-elevate.git
```

---

## 🟡 **STEP 3: GitHub Secrets 설정** (5분)

**GitHub 저장소** → **Settings** → **Secrets and variables** → **Actions**

### 3-1. 필수 Secrets 추가

**"New repository secret"** 클릭하여 다음 4개 추가:

#### Secret 1: AWS_ACCESS_KEY_ID
```
Name: AWS_ACCESS_KEY_ID
Value: [Step 1-5에서 받은 액세스 키 ID]
```

#### Secret 2: AWS_SECRET_ACCESS_KEY
```
Name: AWS_SECRET_ACCESS_KEY
Value: [Step 1-5에서 받은 비밀 액세스 키]
```

#### Secret 3: AWS_S3_BUCKET
```
Name: AWS_S3_BUCKET
Value: learning-elevate-frontend
```

#### Secret 4: AWS_REGION
```
Name: AWS_REGION
Value: ap-northeast-2
```

### 3-2. 선택 Secret (API 서버가 있는 경우)

#### Secret 5: VITE_API_BASE_URL
```
Name: VITE_API_BASE_URL
Value: https://api.learning-elevate.com/api
```

---

## 🔵 **STEP 4: 로컬 Git 연동** (5분)

### 4-1. 터미널 열기

```bash
# 프로젝트 디렉토리로 이동
cd "/Users/hyojoonchoi/Hyojoon Drive/Cursor-Project/Learning"
```

### 4-2. Git 초기화 (이미 되어있지 않다면)

```bash
# Git 저장소 초기화
git init

# 현재 상태 확인
git status
```

### 4-3. GitHub 원격 저장소 추가

```bash
# 원격 저장소 추가 (YOUR_USERNAME 변경!)
git remote add origin https://github.com/YOUR_USERNAME/learning-elevate.git

# 확인
git remote -v
```

### 4-4. 모든 파일 커밋

```bash
# 모든 파일 스테이징
git add .

# 커밋
git commit -m "Initial commit: Learning Elevate with CI/CD setup"

# 메인 브랜치 설정
git branch -M main
```

### 4-5. GitHub에 푸시 (자동 배포 시작!)

```bash
# 첫 푸시
git push -u origin main
```

🎉 **푸시 완료 시 GitHub Actions가 자동으로 실행됩니다!**

---

## 자동 배포 테스트

### ✅ STEP 5: 배포 확인 (5분)

### 5-1. GitHub Actions 로그 확인

**GitHub 저장소** → **Actions** 탭

- 새로운 워크플로우 실행 확인
- 각 단계 클릭하여 로그 확인
- ✅ 모든 단계가 초록색이면 성공!

### 5-2. S3 버킷 확인

**AWS S3** → **버킷 선택**

- `dist/` 폴더의 파일들이 업로드되었는지 확인
- `index.html`, `assets/` 등 확인

### 5-3. 웹사이트 접속

브라우저에서 S3 엔드포인트 접속:
```
http://learning-elevate-frontend.s3-website.ap-northeast-2.amazonaws.com
```

🎉 **Learning Elevate가 표시되면 성공!**

---

## 🔄 일상적인 배포 흐름

### 코드 수정 → 자동 배포

```bash
# 1. 코드 수정...

# 2. 변경사항 확인
git status

# 3. 스테이징
git add .

# 4. 커밋
git commit -m "feat: add new feature"

# 5. 푸시 (자동 배포 트리거!)
git push

# 6. GitHub Actions에서 자동 빌드 & 배포
# 7. 2-3분 후 웹사이트 자동 업데이트 완료!
```

---

## 문제 해결

### ❌ 문제 1: GitHub Actions 실패 - "AWS credentials not found"

**원인**: GitHub Secrets가 제대로 설정되지 않음

**해결**:
1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. 다음 4개 Secrets가 모두 있는지 확인:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_S3_BUCKET`
   - `AWS_REGION`
3. 없다면 추가, 잘못되었다면 수정

---

### ❌ 문제 2: S3 접속 시 403 Forbidden

**원인**: 버킷 정책이 제대로 설정되지 않음

**해결**:
1. AWS S3 → 버킷 선택 → 권한 탭
2. "퍼블릭 액세스 차단" 모두 해제 확인
3. "버킷 정책"에 퍼블릭 읽기 권한 추가 (Step 1-2 참고)

---

### ❌ 문제 3: 빌드 실패 - "npm ci failed"

**원인**: package-lock.json 불일치

**해결**:
```bash
# 로컬에서 재설치
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build

# 다시 커밋 & 푸시
git add .
git commit -m "fix: update package-lock.json"
git push
```

---

### ❌ 문제 4: 웹사이트 로드 후 404 Not Found (SPA 라우팅)

**원인**: S3가 클라이언트 사이드 라우팅을 처리하지 못함

**해결**:
1. AWS S3 → 버킷 선택 → 속성 → 정적 웹 사이트 호스팅
2. **오류 문서**를 `index.html`로 설정
3. 저장

---

### ❌ 문제 5: 푸시 후 변경사항이 반영되지 않음

**원인**: 브라우저 캐시

**해결**:
1. 브라우저에서 **Ctrl + Shift + R** (캐시 무시 새로고침)
2. 또는 시크릿/프라이빗 모드로 접속

---

## 📊 배포 워크플로우 개요

```
┌─────────────────────────────────────────────────────────────┐
│                    개발자 로컬 환경                            │
│  1. 코드 수정                                                  │
│  2. git add . && git commit -m "message"                     │
│  3. git push origin main                                     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                       GitHub                                 │
│  4. Push 이벤트 감지                                          │
│  5. GitHub Actions 워크플로우 트리거                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   GitHub Actions                             │
│  6. 코드 체크아웃                                             │
│  7. Node.js 설치                                             │
│  8. npm ci (의존성 설치)                                     │
│  9. 환경 변수 파일 생성                                       │
│ 10. npm run build (프로덕션 빌드)                           │
│ 11. AWS 자격 증명 설정                                       │
│ 12. aws s3 sync (S3에 파일 업로드)                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                       AWS S3                                 │
│ 13. 파일 업로드 완료                                          │
│ 14. 정적 웹사이트 호스팅                                      │
│ 15. 웹사이트 URL로 접속 가능                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 💰 비용 예상

### AWS S3 (무료 티어 기준)

**무료 티어 (12개월)**:
- 5GB 스토리지
- 20,000 GET 요청
- 2,000 PUT 요청

**예상 비용**:
- 소규모 프로젝트: **$0 - $1/월**
- 중규모 트래픽: **$1 - $5/월**

### GitHub Actions

**무료 티어**:
- Public 저장소: 무제한
- Private 저장소: 월 2,000분

**예상 비용**:
- 일반적인 사용: **$0/월**

---

## 🎯 다음 단계 (선택사항)

### 1️⃣ CloudFront CDN 추가 (HTTPS + 빠른 속도)
- 전 세계 CDN으로 콘텐츠 배포
- HTTPS 지원
- 커스텀 도메인 연결 가능

### 2️⃣ 커스텀 도메인 연결
- Route 53으로 도메인 구매/연결
- 예: `https://learning-elevate.com`

### 3️⃣ 환경별 배포 (Staging/Production)
- `develop` 브랜치 → Staging S3
- `main` 브랜치 → Production S3

### 4️⃣ 배포 알림 (Slack/Discord)
- GitHub Actions에서 배포 완료 시 알림

---

## 📚 참고 자료

### 상세 가이드
- [AWS S3 설정](./aws-s3-setup.md)
- [GitHub 설정](./github-setup.md)
- [GitHub Actions 워크플로우](./.github/workflows/deploy.yml)

### 외부 문서
- [AWS S3 정적 웹사이트 호스팅](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)

---

## ✅ 최종 체크리스트

### AWS 설정
- [ ] S3 버킷 생성 완료
- [ ] 버킷 정책 설정 (퍼블릭 읽기)
- [ ] 정적 웹사이트 호스팅 활성화
- [ ] CORS 설정 완료
- [ ] IAM 사용자 생성 및 키 저장

### GitHub 설정
- [ ] GitHub 저장소 생성 완료
- [ ] GitHub Secrets 설정 (4개 필수)
- [ ] 로컬 Git 연동 완료
- [ ] 첫 푸시 완료

### 배포 확인
- [ ] GitHub Actions 워크플로우 성공
- [ ] S3 버킷에 파일 업로드 확인
- [ ] 웹사이트 URL 접속 가능
- [ ] 로그인/주요 기능 동작 확인

---

## 🎉 축하합니다!

Learning Elevate가 성공적으로 배포되었습니다!

**웹사이트 URL**: 
```
http://YOUR-BUCKET-NAME.s3-website.ap-northeast-2.amazonaws.com
```

이제 코드를 수정하고 `git push`만 하면 자동으로 배포됩니다! 🚀

