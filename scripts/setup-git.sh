#!/bin/bash

# Learning Elevate - Git 설정 및 GitHub 연동 스크립트
# 이 스크립트는 로컬 프로젝트를 GitHub 저장소에 연동합니다.

echo "🚀 Learning Elevate - Git 설정 시작"
echo "======================================"
echo ""

# 색상 정의
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# GitHub 사용자 정보 입력
echo "📝 GitHub 정보 입력"
echo "-------------------"
read -p "GitHub Username: " GITHUB_USERNAME
read -p "Repository Name (기본값: learning-elevate): " REPO_NAME
REPO_NAME=${REPO_NAME:-learning-elevate}

echo ""
echo "${YELLOW}GitHub 저장소 URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME.git${NC}"
echo ""
read -p "계속하시겠습니까? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ]; then
    echo "${RED}❌ 취소되었습니다.${NC}"
    exit 1
fi

echo ""
echo "🔧 Git 설정 중..."

# Git 초기화 확인
if [ ! -d ".git" ]; then
    echo "📦 Git 저장소 초기화 중..."
    git init
    echo "${GREEN}✅ Git 초기화 완료${NC}"
else
    echo "${YELLOW}⚠️  이미 Git 저장소가 초기화되어 있습니다.${NC}"
fi

# Git 사용자 정보 설정 확인
GIT_USER_NAME=$(git config user.name)
GIT_USER_EMAIL=$(git config user.email)

if [ -z "$GIT_USER_NAME" ] || [ -z "$GIT_USER_EMAIL" ]; then
    echo ""
    echo "📝 Git 사용자 정보 설정"
    read -p "이름 (Name): " USER_NAME
    read -p "이메일 (Email): " USER_EMAIL
    
    git config --global user.name "$USER_NAME"
    git config --global user.email "$USER_EMAIL"
    
    echo "${GREEN}✅ Git 사용자 정보 설정 완료${NC}"
else
    echo "${GREEN}✅ Git 사용자 정보 이미 설정됨${NC}"
    echo "   이름: $GIT_USER_NAME"
    echo "   이메일: $GIT_USER_EMAIL"
fi

echo ""
echo "🔗 원격 저장소 연결 중..."

# 기존 원격 저장소 확인
EXISTING_REMOTE=$(git remote get-url origin 2>/dev/null)

if [ -n "$EXISTING_REMOTE" ]; then
    echo "${YELLOW}⚠️  기존 원격 저장소가 있습니다: $EXISTING_REMOTE${NC}"
    read -p "기존 원격 저장소를 제거하고 새로 설정하시겠습니까? (y/n): " REMOVE_REMOTE
    
    if [ "$REMOVE_REMOTE" = "y" ]; then
        git remote remove origin
        echo "${GREEN}✅ 기존 원격 저장소 제거 완료${NC}"
    else
        echo "${RED}❌ 취소되었습니다.${NC}"
        exit 1
    fi
fi

# 새 원격 저장소 추가
GITHUB_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
git remote add origin $GITHUB_URL

echo "${GREEN}✅ 원격 저장소 연결 완료${NC}"
echo "   URL: $GITHUB_URL"

echo ""
echo "📦 파일 스테이징 중..."

# 모든 파일 추가
git add .

echo "${GREEN}✅ 파일 스테이징 완료${NC}"

echo ""
echo "💾 커밋 생성 중..."

# 커밋 생성
git commit -m "Initial commit: Learning Elevate with CI/CD setup"

if [ $? -eq 0 ]; then
    echo "${GREEN}✅ 커밋 생성 완료${NC}"
else
    echo "${YELLOW}⚠️  커밋할 변경사항이 없거나 이미 커밋되었습니다.${NC}"
fi

echo ""
echo "🌿 메인 브랜치 설정 중..."

# 메인 브랜치로 변경
git branch -M main

echo "${GREEN}✅ 메인 브랜치 설정 완료${NC}"

echo ""
echo "======================================"
echo "${GREEN}🎉 Git 설정이 완료되었습니다!${NC}"
echo "======================================"
echo ""
echo "다음 단계:"
echo "1. GitHub에서 저장소를 생성하세요:"
echo "   https://github.com/new"
echo ""
echo "2. 저장소 이름: ${YELLOW}$REPO_NAME${NC}"
echo ""
echo "3. GitHub Secrets를 설정하세요:"
echo "   - AWS_ACCESS_KEY_ID"
echo "   - AWS_SECRET_ACCESS_KEY"
echo "   - AWS_S3_BUCKET"
echo "   - AWS_REGION"
echo ""
echo "4. 다음 명령어로 푸시하세요:"
echo "   ${YELLOW}git push -u origin main${NC}"
echo ""
echo "5. GitHub Actions에서 자동 배포를 확인하세요:"
echo "   https://github.com/$GITHUB_USERNAME/$REPO_NAME/actions"
echo ""
echo "자세한 내용은 docs/deployment/DEPLOYMENT_GUIDE.md를 참고하세요."
echo ""

