# AWS S3 정적 웹사이트 호스팅 설정 가이드

## 1. AWS S3 버킷 생성

### 1-1. AWS Console 로그인
1. https://console.aws.amazon.com 접속
2. S3 서비스로 이동

### 1-2. 버킷 생성
1. **"버킷 만들기"** 클릭
2. 버킷 설정:
   - **버킷 이름**: `learning-elevate-frontend` (고유한 이름)
   - **AWS 리전**: `ap-northeast-2` (서울)
   - **퍼블릭 액세스 차단 설정**: 
     - ✅ "모든 퍼블릭 액세스 차단" **체크 해제**
     - ⚠️ 경고 확인 체크박스 선택
3. **"버킷 만들기"** 클릭

## 2. 버킷 정책 설정 (퍼블릭 읽기 권한)

### 2-1. 버킷 선택 후 "권한" 탭

### 2-2. "버킷 정책" 섹션에서 "편집" 클릭

### 2-3. 다음 정책 붙여넣기:

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

⚠️ **중요**: `learning-elevate-frontend`를 실제 버킷 이름으로 변경하세요!

### 2-4. "변경 사항 저장" 클릭

## 3. 정적 웹사이트 호스팅 활성화

### 3-1. 버킷 선택 후 "속성" 탭

### 3-2. 맨 아래 "정적 웹 사이트 호스팅" 섹션에서 "편집" 클릭

### 3-3. 설정:
- **정적 웹 사이트 호스팅**: 활성화
- **호스팅 유형**: 정적 웹 사이트 호스팅
- **인덱스 문서**: `index.html`
- **오류 문서**: `index.html` (SPA 라우팅을 위해 동일하게 설정)

### 3-4. "변경 사항 저장" 클릭

### 3-5. 웹사이트 엔드포인트 확인
- 저장 후 표시되는 **"버킷 웹 사이트 엔드포인트"** URL 복사
- 예: `http://learning-elevate-frontend.s3-website.ap-northeast-2.amazonaws.com`

## 4. CORS 설정 (API 호출을 위해)

### 4-1. "권한" 탭 → "CORS(Cross-Origin Resource Sharing)" 섹션

### 4-2. "편집" 클릭 후 다음 설정 붙여넣기:

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

### 4-3. "변경 사항 저장" 클릭

---

## 5. IAM 사용자 생성 (GitHub Actions용)

### 5-1. IAM 서비스로 이동

### 5-2. "사용자" → "사용자 추가" 클릭

### 5-3. 사용자 세부 정보:
- **사용자 이름**: `github-actions-deploy`
- **액세스 유형**: 
  - ✅ **프로그래밍 방식 액세스** 선택

### 5-4. 권한 설정:
- **"기존 정책 직접 연결"** 선택
- **`AmazonS3FullAccess`** 검색 후 선택
  - (또는 보안을 위해 특정 버킷만 접근 가능한 커스텀 정책 생성)

### 5-5. 태그 추가 (선택사항):
- Key: `Purpose`, Value: `GitHub Actions Deployment`

### 5-6. 검토 후 "사용자 만들기" 클릭

### 5-7. **중요: 액세스 키 저장**
- ✅ **액세스 키 ID** 복사 (예: `AKIAIOSFODNN7EXAMPLE`)
- ✅ **비밀 액세스 키** 복사 (예: `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`)
- ⚠️ **이 키는 다시 확인할 수 없으므로 안전한 곳에 보관!**

---

## 6. 커스텀 정책 생성 (선택사항 - 보안 강화)

### 6-1. IAM → 정책 → "정책 생성" 클릭

### 6-2. JSON 탭에서 다음 정책 붙여넣기:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::learning-elevate-frontend",
        "arn:aws:s3:::learning-elevate-frontend/*"
      ]
    }
  ]
}
```

⚠️ **중요**: `learning-elevate-frontend`를 실제 버킷 이름으로 변경!

### 6-3. 정책 이름: `GitHubActionsS3DeployPolicy`

### 6-4. "정책 생성" 클릭

### 6-5. IAM 사용자에 이 정책 연결
- IAM → 사용자 → `github-actions-deploy` 선택
- "권한 추가" → "기존 정책 직접 연결"
- `GitHubActionsS3DeployPolicy` 선택 후 추가

---

## 7. CloudFront 설정 (선택사항 - CDN 및 HTTPS)

### 7-1. CloudFront 서비스로 이동

### 7-2. "배포 만들기" 클릭

### 7-3. 설정:
- **원본 도메인**: S3 버킷 엔드포인트 선택
- **뷰어 프로토콜 정책**: HTTP를 HTTPS로 리다이렉션
- **캐시 정책**: CachingOptimized
- **기본 루트 객체**: `index.html`

### 7-4. 오류 페이지 설정 (SPA 라우팅):
- **오류 코드**: 403, 404
- **응답 페이지 경로**: `/index.html`
- **HTTP 응답 코드**: 200

### 7-5. "배포 만들기" 클릭

### 7-6. CloudFront 도메인 이름 복사
- 예: `d111111abcdef8.cloudfront.net`

---

## 8. 최종 확인 사항

✅ **체크리스트**:
- [ ] S3 버킷 생성 완료
- [ ] 버킷 정책으로 퍼블릭 읽기 권한 설정
- [ ] 정적 웹사이트 호스팅 활성화
- [ ] CORS 설정 완료
- [ ] IAM 사용자 생성 및 액세스 키 저장
- [ ] (선택) CloudFront 배포 생성

✅ **저장해야 할 정보**:
- S3 버킷 이름: `___________________`
- S3 웹사이트 엔드포인트: `___________________`
- AWS 리전: `___________________`
- IAM 액세스 키 ID: `___________________`
- IAM 비밀 액세스 키: `___________________`
- (선택) CloudFront 도메인: `___________________`

---

## 다음 단계

이제 GitHub에 저장소를 생성하고 GitHub Actions를 설정할 차례입니다!
→ `github-actions-setup.md` 참고

