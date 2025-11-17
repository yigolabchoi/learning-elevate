/**
 * English translations
 */

export const en = {
  // Common
  common: {
    appName: 'Learning Elevate',
    login: 'Login',
    logout: 'Logout',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    create: 'Create',
    search: 'Search',
    filter: 'Filter',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    loading: 'Loading...',
    noData: 'No data available',
    error: 'An error occurred',
    success: 'Success',
    confirm: 'Confirm',
    backToHome: 'Back to Home',
    copyright: '© 2025 Learning Elevate. All rights reserved.',
  },

  // Landing Page
  landing: {
    title: 'Learning Elevate',
    subtitle: 'AI-Powered Personalized Learning Management Platform',
    selectPortal: 'Select Portal',
    selectPortalDesc: 'Please select your portal',
    
    school: {
      title: 'School Portal',
      subtitle: 'Admin · Teacher',
      description: 'Professional management tools for school administrators and teachers',
      feature1: 'Student & Class Management',
      feature2: 'Curriculum & Problem Generation',
      feature3: 'Assignment Distribution & Evaluation',
      feature4: 'Learning Analytics & Reports',
      button: 'Enter School Portal',
    },
    
    student: {
      title: 'Learning Portal',
      subtitle: 'Student · Parent',
      description: 'Personalized learning management system for students and parents',
      feature1: 'Assignment Check & Problem Solving',
      feature2: 'AI-Based Personalized Feedback',
      feature3: 'Learning History & Grade Check',
      feature4: 'Child Learning Progress Monitoring',
      button: 'Enter Learning Portal',
    },
  },

  // Login
  login: {
    title: 'Login',
    loginType: 'Login Type',
    email: 'Email',
    password: 'Password',
    emailPlaceholder: 'email@school.com',
    passwordPlaceholder: '••••••••',
    forgotPassword: 'Forgot password?',
    loggingIn: 'Logging in...',
    
    schoolPortal: 'School Portal',
    learningPortal: 'Learning Portal',
    
    roles: {
      admin: 'Admin',
      teacher: 'Teacher',
      student: 'Student',
      parent: 'Parent',
    },
    
    demo: {
      title: 'Demo Accounts',
      admin: 'Admin',
      teacher: 'Teacher',
      student: 'Student',
      parent: 'Parent',
    },
    
    dev: {
      title: 'Developer Mode',
      badge: 'DEV',
    },
    
    errors: {
      emailRequired: 'Please enter your email',
      passwordRequired: 'Please enter your password',
      passwordTooShort: 'Password must be at least 6 characters',
      invalidCredentials: 'Invalid email or password',
      loginFailed: 'Login failed',
    },
  },

  // Header
  header: {
    schoolPortal: 'School Portal',
    learningPortal: 'Learning Portal',
    switchRole: 'Switch Role',
    devMode: 'Dev Mode',
  },

  // Navigation
  nav: {
    dashboard: 'Dashboard',
    students: 'Students',
    classes: 'Classes',
    users: 'Users',
    curricula: 'Curricula',
    problemSets: 'Problem Sets',
    assignments: 'Assignments',
    submissions: 'Submissions',
    home: 'Home',
    practice: 'Practice',
    history: 'History',
    profile: 'Profile',
    myChildren: 'My Children',
    notifications: 'Notifications',
    settings: 'Settings',
  },

  // Dashboard
  dashboard: {
    teacher: {
      title: 'Teacher Dashboard',
      myClasses: 'My Classes',
      todayAssignments: "Today's Assignments",
      pendingConfirmations: 'Pending Confirmations',
      students: 'students',
      classReport: 'View Class Report',
      dueDate: 'Due Date',
      completed: 'Completed',
      pending: 'Pending',
      viewAssignments: 'View Assignments',
      viewSubmissions: 'View Submissions',
      noClasses: 'No classes assigned',
      noAssignments: 'No assignments due today',
      noPendingSubmissions: 'No pending submissions',
    },
  },

  // Classes (Admin)
  classes: {
    title: 'Class Management',
    createClass: 'Create Class',
    className: 'Class Name',
    gradeLevel: 'Grade Level',
    subject: 'Subject',
    teacher: 'Teacher',
    students: 'Students',
    studentsCount: 'Student Count',
    actions: 'Actions',
    noClasses: 'No classes created',
    
    form: {
      title: 'Class Information',
      classNameLabel: 'Class Name',
      classNamePlaceholder: 'e.g., Grade 7-A',
      gradeLevelLabel: 'Grade Level',
      gradeLevelPlaceholder: 'e.g., Grade 7',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'e.g., English',
      teacherLabel: 'Teacher',
      teacherPlaceholder: 'Select teacher',
      studentsLabel: 'Students',
      studentsPlaceholder: 'Select students',
      
      errors: {
        nameRequired: 'Please enter class name',
      },
    },
  },

  // Users (Admin)
  users: {
    title: 'User Management',
    teachers: 'Teachers',
    students: 'Students',
    parents: 'Parents',
    
    name: 'Name',
    email: 'Email',
    subjects: 'Subjects',
    class: 'Class',
    children: 'Children',
    active: 'Active',
    inactive: 'Inactive',
    actions: 'Actions',
    
    addTeacher: 'Add Teacher',
    addStudent: 'Add Student',
    addParent: 'Add Parent',
    
    noUsers: 'No users',
  },

  // Curricula (Teacher)
  curricula: {
    title: 'Curriculum Management',
    createCurriculum: 'Create Curriculum',
    name: 'Curriculum Name',
    subject: 'Subject',
    level: 'Level',
    units: 'Units',
    unitsCount: 'Unit Count',
    lastUpdated: 'Last Updated',
    noCurricula: 'No curricula created',
    viewDetail: 'View Details',
  },

  // Problem Sets (Teacher)
  problemSets: {
    title: 'Problem Set Management',
    createProblemSet: 'Create Problem Set',
    name: 'Problem Set Name',
    curriculum: 'Curriculum',
    unit: 'Unit',
    difficulty: 'Difficulty',
    questionCount: 'Question Count',
    noProblemSets: 'No problem sets created',
  },

  // Assignments (Teacher)
  assignments: {
    title: 'Assignment Management',
    createAssignment: 'Create Assignment',
    assignmentTitle: 'Assignment Title',
    class: 'Class',
    problemSet: 'Problem Set',
    dueDate: 'Due Date',
    status: 'Status',
    active: 'Active',
    closed: 'Closed',
    noAssignments: 'No assignments created',
  },

  // Submissions (Teacher)
  submissions: {
    title: 'Submission Management',
    student: 'Student',
    class: 'Class',
    assignment: 'Assignment',
    submittedAt: 'Submitted At',
    score: 'Score',
    status: 'Status',
    pending: 'Pending',
    confirmed: 'Confirmed',
    actions: 'Actions',
    noSubmissions: 'No submissions',
  },

  // Student Home
  studentHome: {
    title: 'Student Home',
    upcomingAssignments: 'Upcoming Assignments',
    quickStatus: 'Learning Status',
    inProgress: 'In Progress',
    completedThisWeek: 'Completed This Week',
    upcoming: 'Upcoming',
    assignments: 'Assignments',
    dueDate: 'Due Date',
    notStarted: 'Not Started',
    viewAll: 'View All',
    noAssignments: 'No assignments',
  },

  // Student Assignments
  studentAssignments: {
    title: 'Assignments',
    allAssignments: 'All Assignments',
    status: 'Status',
    all: 'All',
    notStarted: 'Not Started',
    inProgress: 'In Progress',
    completed: 'Completed',
    sortBy: 'Sort By',
    dueDate: 'Due Date',
    class: 'Class',
    unit: 'Unit',
    score: 'Score',
    noAssignments: 'No assignments',
  },

  // Assignment Detail
  assignmentDetail: {
    title: 'Assignment Details',
    class: 'Class',
    unit: 'Unit',
    dueDate: 'Due Date',
    status: 'Status',
    progress: 'Progress',
    lastAttempt: 'Last Attempt',
    score: 'Score',
    feedback: 'Feedback',
    start: 'Start Assignment',
    continue: 'Continue',
    viewFeedback: 'View Feedback',
    notStarted: 'Not Started',
    inProgress: 'In Progress',
    completed: 'Completed',
  },

  // Practice
  practice: {
    title: 'Practice',
    recommended: 'Recommended Practice',
    allSets: 'All Practice Sets',
    conceptTag: 'Concept',
    difficulty: 'Difficulty',
    estimatedTime: 'Estimated Time',
    minutes: 'min',
    status: 'Status',
    notStarted: 'Not Started',
    inProgress: 'In Progress',
    completed: 'Completed',
    lastPracticed: 'Last Practiced',
    start: 'Start',
    continue: 'Continue',
    noPractice: 'No practice sets',
  },

  // History
  history: {
    title: 'Learning History',
    period: 'Period',
    last7days: 'Last 7 Days',
    last30days: 'Last 30 Days',
    all: 'All',
    assignment: 'Assignment',
    class: 'Class',
    completedAt: 'Completed At',
    score: 'Score',
    viewDetail: 'View Details',
    noHistory: 'No learning history',
  },

  // Parent Children
  parentChildren: {
    title: 'My Children',
    name: 'Name',
    grade: 'Grade',
    class: 'Class',
    level: 'Level',
    lastActive: 'Last Active',
    viewDashboard: 'View Dashboard',
    noChildren: 'No children registered',
  },

  // Child Dashboard
  childDashboard: {
    title: 'Child Dashboard',
    backToChildren: 'Back to Children',
    recentActivity: 'Recent Activity',
    studyDays: 'Study Days',
    assignmentsCompleted: 'Assignments Completed',
    averageScore: 'Average Score',
    days: 'days',
    assignments: 'assignments',
    strengthsWeaknesses: 'Strengths & Weaknesses',
    strengths: 'Strengths',
    weaknesses: 'Weaknesses',
    aiSummary: 'AI Summary',
    scoreTrend: 'Score Trend',
    viewDetails: 'View Details',
  },

  // Parent Settings
  parentSettings: {
    title: 'Settings',
    profile: 'Profile Information',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    notifications: 'Notification Settings',
    emailNotifications: 'Email Notifications',
    smsNotifications: 'SMS Notifications',
    importantOnly: 'Important Only',
    saveChanges: 'Save Changes',
    saved: 'Saved',
  },

  // Parent Notifications
  parentNotifications: {
    title: 'Notifications',
    markAllRead: 'Mark All as Read',
    new: 'New',
    noNotifications: 'No notifications',
  },
};

