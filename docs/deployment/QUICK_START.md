# 🚀 빠른 시작 가이드 - GitHub + AWS S3 자동 배포

## 📌 5단계로 배포 완료하기 (35분)

---

## ✅ STEP 1: AWS S3 버킷 생성 (10분)

### 1. AWS Console 로그인
👉 https://console.aws.amazon.com

### 2. S3 → "버킷 만들기"

```
버킷 이름: learning-elevate-frontend-[고유번호]
리전: ap-northeast-2 (서울)
퍼블릭 액세스: ❌ 모두 해제
```

### 3. 버킷 정책 추가
**권한** → **버킷 정책** → 다음 붙여넣기:

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::learning-elevate-frontend-[고유번호]/*"
  }]
}
```

### 4. 정적 웹사이트 호스팅 활성화
**속성** → **정적 웹 사이트 호스팅**:
```
인덱스 문서: index.html
오류 문서: index.html
```

### 5. IAM 사용자 생성
**IAM** → **사용자 추가**:
```
이름: github-actions-deploy
권한: AmazonS3FullAccess
```

**✅ 액세스 키 저장!**
```
액세스 키 ID: AKIA...
비밀 액세스 키: wJal...
```

---

## ✅ STEP 2: GitHub 저장소 생성 (5분)

### 1. GitHub 로그인
👉 https://github.com

### 2. New repository

```
이름: learning-elevate
Public 또는 Private 선택
Initialize: ❌ 체크하지 않음
```

---

## ✅ STEP 3: GitHub Secrets 설정 (5분)

**Settings** → **Secrets and variables** → **Actions**

다음 4개 Secret 추가:

```
1. AWS_ACCESS_KEY_ID = [Step 1의 액세스 키 ID]
2. AWS_SECRET_ACCESS_KEY = [Step 1의 비밀 키]
3. AWS_S3_BUCKET = learning-elevate-frontend-[고유번호]
4. AWS_REGION = ap-northeast-2
```

---

## ✅ STEP 4: 로컬 Git 연동 (10분)

### 터미널 열기

```bash
# 프로젝트 디렉토리로 이동
cd "/Users/hyojoonchoi/Hyojoon Drive/Cursor-Project/Learning"

# 자동 설정 스크립트 실행 (권장)
bash scripts/setup-git.sh
```

### 또는 수동 설정:

```bash
# Git 초기화 (이미 되어있다면 생략)
git init

# 원격 저장소 추가
git remote add origin https://github.com/YOUR_USERNAME/learning-elevate.git

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit: Learning Elevate with CI/CD"

# 메인 브랜치 설정
git branch -M main
```

---

## ✅ STEP 5: 푸시 & 배포! (5분)

```bash
# GitHub에 푸시 (자동 배포 시작!)
git push -u origin main
```

### 배포 확인:

1. **GitHub Actions**
   👉 https://github.com/YOUR_USERNAME/learning-elevate/actions

2. **S3 버킷**
   👉 AWS S3 Console에서 파일 확인

3. **웹사이트 접속**
   👉 `http://learning-elevate-frontend-[고유번호].s3-website.ap-northeast-2.amazonaws.com`

---

## 🎉 완료!

이제 코드를 수정하고 `git push`만 하면 자동으로 배포됩니다!

---

## 🔄 일상적인 배포

```bash
# 1. 코드 수정...

# 2. 커밋 & 푸시
git add .
git commit -m "feat: add new feature"
git push

# 3. 2-3분 후 자동 배포 완료! ✅
```

---

## 🆘 문제 해결

### GitHub Actions 실패?
→ GitHub Secrets 4개 모두 설정되었는지 확인

### 403 Forbidden?
→ S3 버킷 정책 확인 (Step 1-3)

### 404 Not Found (SPA 라우팅)?
→ S3 오류 문서를 `index.html`로 설정 (Step 1-4)

### 변경사항 미반영?
→ 브라우저 캐시 삭제 (Ctrl + Shift + R)

---

## 📚 더 자세한 내용은?

👉 [전체 배포 가이드](./DEPLOYMENT_GUIDE.md)

---

## 📝 체크리스트

- [ ] AWS S3 버킷 생성
- [ ] 버킷 정책 설정
- [ ] 정적 웹사이트 호스팅 활성화
- [ ] IAM 사용자 & 키 생성
- [ ] GitHub 저장소 생성
- [ ] GitHub Secrets 4개 설정
- [ ] 로컬 Git 연동
- [ ] 첫 푸시 완료
- [ ] 웹사이트 접속 확인

---

**배포 성공을 축하합니다! 🎉**

