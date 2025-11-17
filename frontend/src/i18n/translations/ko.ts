/**
 * 한국어 번역
 */

export const ko = {
  // 공통
  common: {
    appName: 'Learning Elevate',
    login: '로그인',
    logout: '로그아웃',
    submit: '제출',
    cancel: '취소',
    save: '저장',
    edit: '편집',
    delete: '삭제',
    create: '생성',
    search: '검색',
    filter: '필터',
    back: '뒤로',
    next: '다음',
    previous: '이전',
    loading: '로딩 중...',
    noData: '데이터가 없습니다',
    error: '오류가 발생했습니다',
    success: '성공했습니다',
    confirm: '확인',
    backToHome: '처음으로',
    copyright: '© 2025 Learning Elevate. All rights reserved.',
  },

  // 랜딩 페이지
  landing: {
    title: 'Learning Elevate',
    subtitle: 'AI 기반 맞춤형 학습 관리 플랫폼',
    selectPortal: '포털 선택',
    selectPortalDesc: '원하시는 포털을 선택해주세요',
    
    school: {
      title: '교육기관용 포털',
      subtitle: '관리자 · 선생님',
      description: '학원·학교 관리자와 선생님을 위한 전문 관리 도구',
      feature1: '학생 및 반 관리',
      feature2: '커리큘럼 및 문제 생성',
      feature3: '과제 배정 및 평가',
      feature4: '학습 분석 및 리포트',
      button: '교육기관 포털 입장',
    },
    
    student: {
      title: '학습 포털',
      subtitle: '학생 · 학부모',
      description: '학생과 학부모를 위한 맞춤형 학습 관리 시스템',
      feature1: '과제 확인 및 문제 풀이',
      feature2: 'AI 기반 맞춤형 피드백',
      feature3: '학습 이력 및 성적 확인',
      feature4: '자녀 학습 현황 모니터링',
      button: '학습 포털 입장',
    },
  },

  // 로그인
  login: {
    title: '로그인',
    loginType: '로그인 유형',
    email: '이메일',
    password: '비밀번호',
    emailPlaceholder: 'email@school.com',
    passwordPlaceholder: '••••••••',
    forgotPassword: '비밀번호를 잊으셨나요?',
    loggingIn: '로그인 중...',
    
    schoolPortal: '교육기관용 포털',
    learningPortal: '학습 포털',
    
    roles: {
      admin: '관리자',
      teacher: '선생님',
      student: '학생',
      parent: '학부모',
    },
    
    demo: {
      title: '데모 계정',
      admin: '관리자',
      teacher: '선생님',
      student: '학생',
      parent: '학부모',
    },
    
    dev: {
      title: '개발자 모드',
      badge: 'DEV',
    },
    
    errors: {
      emailRequired: '이메일 주소를 입력해주세요',
      passwordRequired: '비밀번호를 입력해주세요',
      passwordTooShort: '비밀번호는 최소 6자 이상이어야 합니다',
      invalidCredentials: '이메일 또는 비밀번호가 올바르지 않습니다',
      loginFailed: '로그인에 실패했습니다',
    },
  },

  // 헤더
  header: {
    schoolPortal: '교육기관 포털',
    learningPortal: '학습 포털',
    switchRole: '역할 전환',
    devMode: '개발 모드',
  },

  // 네비게이션
  nav: {
    dashboard: '대시보드',
    students: '학생 관리',
    classes: '반 관리',
    users: '사용자 관리',
    curricula: '커리큘럼',
    problemSets: '문제 세트',
    assignments: '과제',
    submissions: '제출물',
    home: '홈',
    practice: '연습',
    history: '학습 이력',
    profile: '프로필',
    myChildren: '자녀 목록',
    notifications: '알림',
    settings: '설정',
  },

  // 대시보드
  dashboard: {
    teacher: {
      title: '선생님 대시보드',
      myClasses: '내 반',
      todayAssignments: '오늘의 과제',
      pendingConfirmations: '확인 대기 중인 제출물',
      students: '명',
      classReport: '반 리포트 보기',
      dueDate: '마감일',
      completed: '완료',
      pending: '대기',
      viewAssignments: '과제 보기',
      viewSubmissions: '제출물 보기',
      noClasses: '배정된 반이 없습니다',
      noAssignments: '오늘 마감인 과제가 없습니다',
      noPendingSubmissions: '확인 대기 중인 제출물이 없습니다',
    },
  },

  // 반 관리 (Admin)
  classes: {
    title: '반 관리',
    createClass: '반 생성',
    className: '반 이름',
    gradeLevel: '학년',
    subject: '과목',
    teacher: '담당 선생님',
    students: '학생',
    studentsCount: '학생 수',
    actions: '작업',
    noClasses: '생성된 반이 없습니다',
    
    form: {
      title: '반 정보',
      classNameLabel: '반 이름',
      classNamePlaceholder: '예: 중1-A',
      gradeLevelLabel: '학년',
      gradeLevelPlaceholder: '예: 중1',
      subjectLabel: '과목',
      subjectPlaceholder: '예: 영어',
      teacherLabel: '담당 선생님',
      teacherPlaceholder: '선생님 선택',
      studentsLabel: '학생',
      studentsPlaceholder: '학생 선택',
      
      errors: {
        nameRequired: '반 이름을 입력해주세요',
      },
    },
  },

  // 사용자 관리 (Admin)
  users: {
    title: '사용자 관리',
    teachers: '선생님',
    students: '학생',
    parents: '학부모',
    
    name: '이름',
    email: '이메일',
    subjects: '담당 과목',
    class: '반',
    children: '자녀',
    active: '활성',
    inactive: '비활성',
    actions: '작업',
    
    addTeacher: '선생님 추가',
    addStudent: '학생 추가',
    addParent: '학부모 추가',
    
    noUsers: '사용자가 없습니다',
  },

  // 커리큘럼 (Teacher)
  curricula: {
    title: '커리큘럼 관리',
    createCurriculum: '커리큘럼 생성',
    name: '커리큘럼 이름',
    subject: '과목',
    level: '난이도',
    units: '단원',
    unitsCount: '단원 수',
    lastUpdated: '최종 수정',
    noCurricula: '생성된 커리큘럼이 없습니다',
    viewDetail: '상세 보기',
  },

  // 문제 세트 (Teacher)
  problemSets: {
    title: '문제 세트 관리',
    createProblemSet: '문제 세트 생성',
    name: '문제 세트 이름',
    curriculum: '커리큘럼',
    unit: '단원',
    difficulty: '난이도',
    questionCount: '문제 수',
    noProblemSets: '생성된 문제 세트가 없습니다',
  },

  // 과제 (Teacher)
  assignments: {
    title: '과제 관리',
    createAssignment: '과제 생성',
    assignmentTitle: '과제 제목',
    class: '반',
    problemSet: '문제 세트',
    dueDate: '마감일',
    status: '상태',
    active: '진행 중',
    closed: '마감',
    noAssignments: '생성된 과제가 없습니다',
  },

  // 제출물 (Teacher)
  submissions: {
    title: '제출물 관리',
    student: '학생',
    class: '반',
    assignment: '과제',
    submittedAt: '제출 시간',
    score: '점수',
    status: '상태',
    pending: '대기 중',
    confirmed: '확인 완료',
    actions: '작업',
    noSubmissions: '제출물이 없습니다',
  },

  // 학생 홈
  studentHome: {
    title: '학생 홈',
    upcomingAssignments: '다가오는 과제',
    quickStatus: '학습 현황',
    inProgress: '진행 중',
    completedThisWeek: '이번 주 완료',
    upcoming: '예정된 과제',
    assignments: '과제',
    dueDate: '마감일',
    notStarted: '시작 전',
    viewAll: '전체 보기',
    noAssignments: '과제가 없습니다',
  },

  // 학생 과제
  studentAssignments: {
    title: '과제 목록',
    allAssignments: '전체 과제',
    status: '상태',
    all: '전체',
    notStarted: '시작 전',
    inProgress: '진행 중',
    completed: '완료',
    sortBy: '정렬',
    dueDate: '마감일',
    class: '반',
    unit: '단원',
    score: '점수',
    noAssignments: '과제가 없습니다',
  },

  // 학생 과제 상세
  assignmentDetail: {
    title: '과제 상세',
    class: '반',
    unit: '단원',
    dueDate: '마감일',
    status: '상태',
    progress: '진행률',
    lastAttempt: '마지막 시도',
    score: '점수',
    feedback: '피드백',
    start: '과제 시작',
    continue: '계속하기',
    viewFeedback: '피드백 보기',
    notStarted: '시작 전',
    inProgress: '진행 중',
    completed: '완료',
  },

  // 학생 연습
  practice: {
    title: '연습 문제',
    recommended: '추천 연습',
    allSets: '전체 연습 세트',
    conceptTag: '개념',
    difficulty: '난이도',
    estimatedTime: '예상 시간',
    minutes: '분',
    status: '상태',
    notStarted: '시작 전',
    inProgress: '진행 중',
    completed: '완료',
    lastPracticed: '마지막 연습',
    start: '시작하기',
    continue: '계속하기',
    noPractice: '연습 세트가 없습니다',
  },

  // 학생 학습 이력
  history: {
    title: '학습 이력',
    period: '기간',
    last7days: '최근 7일',
    last30days: '최근 30일',
    all: '전체',
    assignment: '과제',
    class: '반',
    completedAt: '완료 시간',
    score: '점수',
    viewDetail: '상세 보기',
    noHistory: '학습 이력이 없습니다',
  },

  // 학부모 자녀 목록
  parentChildren: {
    title: '자녀 목록',
    name: '이름',
    grade: '학년',
    class: '반',
    level: '레벨',
    lastActive: '최근 활동',
    viewDashboard: '대시보드 보기',
    noChildren: '등록된 자녀가 없습니다',
  },

  // 학부모 자녀 대시보드
  childDashboard: {
    title: '자녀 대시보드',
    backToChildren: '자녀 목록으로',
    recentActivity: '최근 활동',
    studyDays: '학습 일수',
    assignmentsCompleted: '완료한 과제',
    averageScore: '평균 점수',
    days: '일',
    assignments: '과제',
    strengthsWeaknesses: '강점 & 약점',
    strengths: '강점',
    weaknesses: '약점',
    aiSummary: 'AI 요약',
    scoreTrend: '점수 추이',
    viewDetails: '상세 보기',
  },

  // 학부모 설정
  parentSettings: {
    title: '설정',
    profile: '프로필 정보',
    name: '이름',
    email: '이메일',
    phone: '전화번호',
    notifications: '알림 설정',
    emailNotifications: '이메일 알림',
    smsNotifications: 'SMS 알림',
    importantOnly: '중요 알림만',
    saveChanges: '변경사항 저장',
    saved: '저장되었습니다',
  },

  // 학부모 알림
  parentNotifications: {
    title: '알림',
    markAllRead: '모두 읽음으로 표시',
    new: '새 알림',
    noNotifications: '알림이 없습니다',
  },
};

