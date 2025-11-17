/**
 * Mock 인증 데이터
 * 추후 실제 API로 대체 예정
 */

import type { User } from '../../../types';

// Mock 사용자 데이터
export const mockUsers = {
  teacher: {
    id: 'teacher-1',
    email: 'teacher@example.com',
    name: '김영희',
    role: 'teacher' as const,
    avatarUrl: undefined,
  },
  student: {
    id: 'student-1',
    email: 'student@example.com',
    name: '김철수',
    role: 'student' as const,
    avatarUrl: undefined,
  },
  parent: {
    id: 'parent-1',
    email: 'parent@example.com',
    name: '김OO',
    role: 'parent' as const,
    avatarUrl: undefined,
  },
};

// Mock 로그인 함수
export const mockLogin = async (email: string, password: string): Promise<{
  user: User;
  accessToken: string;
  refreshToken: string;
}> => {
  // 간단한 검증 (실제로는 서버에서 처리)
  await new Promise((resolve) => setTimeout(resolve, 500)); // 네트워크 지연 시뮬레이션

  if (password !== 'password123') {
    throw new Error('Invalid credentials');
  }

  let user: User;
  if (email === 'teacher@example.com') {
    user = mockUsers.teacher;
  } else if (email === 'student@example.com') {
    user = mockUsers.student;
  } else if (email === 'parent@example.com') {
    user = mockUsers.parent;
  } else {
    throw new Error('User not found');
  }

  return {
    user,
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
  };
};

