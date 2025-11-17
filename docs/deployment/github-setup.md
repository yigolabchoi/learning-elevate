# GitHub 저장소 생성 및 연동 가이드

## 1. GitHub 저장소 생성

### 1-1. GitHub 웹사이트 접속
1. https://github.com 로그인
2. 우측 상단 **"+"** 아이콘 클릭
3. **"New repository"** 선택

### 1-2. 저장소 설정
- **Repository name**: `learning-elevate`
- **Description**: `AI-powered learning management platform for teachers and students`
- **Visibility**: 
  - ✅ **Public** (공개) 또는
  - ✅ **Private** (비공개)
- **Initialize repository**: 
  - ❌ **체크하지 않음** (로컬에 이미 프로젝트가 있으므로)

### 1-3. "Create repository" 클릭

---

## 2. 로컬 프로젝트 Git 초기화

### 2-1. 터미널에서 프로젝트 루트로 이동

```bash
cd "/Users/hyojoonchoi/Hyojoon Drive/Cursor-Project/Learning"
```

### 2-2. Git 초기화 (이미 되어있지 않다면)

```bash
# Git 저장소 초기화
git init

# 현재 상태 확인
git status
```

### 2-3. .gitignore 파일 확인

프로젝트 루트에 `.gitignore` 파일이 있는지 확인하고, 없다면 생성:

```bash
# .gitignore 내용 확인
cat .gitignore

# 없다면 생성 (다음 섹션 참고)
```

---

## 3. GitHub Secrets 설정 (AWS 자격 증명)

### 3-1. GitHub 저장소 페이지에서 Settings 이동

### 3-2. 좌측 메뉴에서 "Secrets and variables" → "Actions" 클릭

### 3-3. "New repository secret" 클릭하여 다음 secrets 추가:

#### Secret 1: AWS_ACCESS_KEY_ID
- **Name**: `AWS_ACCESS_KEY_ID`
- **Value**: IAM 사용자의 액세스 키 ID (예: `AKIAIOSFODNN7EXAMPLE`)
- "Add secret" 클릭

#### Secret 2: AWS_SECRET_ACCESS_KEY
- **Name**: `AWS_SECRET_ACCESS_KEY`
- **Value**: IAM 사용자의 비밀 액세스 키
- "Add secret" 클릭

#### Secret 3: AWS_S3_BUCKET
- **Name**: `AWS_S3_BUCKET`
- **Value**: S3 버킷 이름 (예: `learning-elevate-frontend`)
- "Add secret" 클릭

#### Secret 4: AWS_REGION
- **Name**: `AWS_REGION`
- **Value**: AWS 리전 (예: `ap-northeast-2`)
- "Add secret" 클릭

#### (선택) Secret 5: AWS_CLOUDFRONT_DISTRIBUTION_ID
CloudFront를 사용하는 경우:
- **Name**: `AWS_CLOUDFRONT_DISTRIBUTION_ID`
- **Value**: CloudFront 배포 ID (예: `E1234567890ABC`)
- "Add secret" 클릭

---

## 4. 로컬 Git 연동

### 4-1. GitHub 저장소 URL 복사
- GitHub 저장소 페이지에서 "Code" 버튼 클릭
- HTTPS 또는 SSH URL 복사
  - HTTPS: `https://github.com/your-username/learning-elevate.git`
  - SSH: `git@github.com:your-username/learning-elevate.git`

### 4-2. 로컬에서 원격 저장소 추가

```bash
# 원격 저장소 추가
git remote add origin https://github.com/your-username/learning-elevate.git

# 원격 저장소 확인
git remote -v
```

### 4-3. 모든 파일 스테이징

```bash
# 모든 파일 추가
git add .

# 상태 확인
git status
```

### 4-4. 첫 커밋

```bash
# 커밋 메시지와 함께 커밋
git commit -m "Initial commit: Learning Elevate platform with refactored codebase"
```

### 4-5. 메인 브랜치 설정 및 푸시

```bash
# 브랜치 이름을 main으로 변경 (필요한 경우)
git branch -M main

# GitHub에 푸시
git push -u origin main
```

---

## 5. 푸시 완료 확인

### 5-1. GitHub 저장소 페이지 새로고침
- 모든 파일이 업로드되었는지 확인

### 5-2. Actions 탭 확인
- "Actions" 탭으로 이동
- GitHub Actions 워크플로우가 자동으로 실행되는지 확인

---

## 6. 일상적인 Git 사용 흐름

### 6-1. 코드 수정 후 배포

```bash
# 1. 변경사항 확인
git status

# 2. 변경된 파일 스테이징
git add .

# 3. 커밋
git commit -m "feat: add new feature"

# 4. 푸시 (자동 배포 트리거!)
git push
```

### 6-2. 커밋 메시지 컨벤션 (권장)

```bash
# 새 기능
git commit -m "feat: add student dashboard"

# 버그 수정
git commit -m "fix: resolve login redirect issue"

# 문서
git commit -m "docs: update API documentation"

# 스타일
git commit -m "style: format code with prettier"

# 리팩토링
git commit -m "refactor: improve API client structure"

# 테스트
git commit -m "test: add unit tests for auth"

# 빌드/배포
git commit -m "build: update dependencies"
```

---

## 7. 문제 해결

### 7-1. 푸시가 거부되는 경우

```bash
# 강제 푸시 (주의: 협업 시 사용 금지!)
git push -f origin main
```

### 7-2. 원격 저장소와 동기화

```bash
# 원격 변경사항 가져오기
git pull origin main
```

### 7-3. Git 사용자 정보 설정

```bash
# 이름 설정
git config --global user.name "Your Name"

# 이메일 설정
git config --global user.email "your.email@example.com"

# 확인
git config --global --list
```

---

## 8. 배포 확인

### 8-1. GitHub Actions 로그 확인
1. GitHub 저장소 → Actions 탭
2. 최근 워크플로우 실행 클릭
3. 각 단계의 로그 확인

### 8-2. S3 버킷 확인
1. AWS S3 콘솔로 이동
2. 버킷에 파일이 업로드되었는지 확인

### 8-3. 웹사이트 접속
- S3 웹사이트 엔드포인트로 접속하여 배포 확인
- 예: `http://learning-elevate-frontend.s3-website.ap-northeast-2.amazonaws.com`

---

## 다음 단계

✅ GitHub 저장소 생성 완료
✅ GitHub Secrets 설정 완료
✅ 로컬 Git 연동 완료

이제 GitHub Actions 워크플로우를 설정할 차례입니다!
→ `github-actions-setup.md` 참고

