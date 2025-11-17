/**
 * Mock API - Template Comments
 * 
 * 선생님이 자주 사용하는 코멘트를 저장하고 재사용
 * 업무 시간 단축
 */

const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export interface TemplateComment {
  id: string;
  teacherId: string;
  title: string;
  content: string;
  category: string;
  usageCount: number;
  createdAt: string;
  lastUsedAt?: string;
}

// Mock data
const mockTemplates: TemplateComment[] = [
  {
    id: 'temp-1',
    teacherId: 'teacher-1',
    title: '잘했어요!',
    content: '정말 잘했습니다! 이번 과제에서 뛰어난 이해력을 보여주었어요. 계속 이 페이스를 유지하세요!',
    category: 'praise',
    usageCount: 15,
    createdAt: '2025-01-01T00:00:00Z',
    lastUsedAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 'temp-2',
    teacherId: 'teacher-1',
    title: '문법 오류 지적',
    content: '전반적으로 좋은 답변이지만, 시제 사용에 주의가 필요합니다. Present Perfect와 Past Simple의 차이를 다시 복습해보세요.',
    category: 'grammar',
    usageCount: 23,
    createdAt: '2025-01-02T00:00:00Z',
    lastUsedAt: '2025-01-16T14:00:00Z',
  },
  {
    id: 'temp-3',
    teacherId: 'teacher-1',
    title: '어휘 향상 필요',
    content: '기본 개념은 잘 이해하고 있습니다. 하지만 더 다양한 어휘를 사용하면 답변의 질이 훨씬 높아질 거예요. 추천 단어 목록을 확인해보세요.',
    category: 'vocabulary',
    usageCount: 12,
    createdAt: '2025-01-03T00:00:00Z',
  },
  {
    id: 'temp-4',
    teacherId: 'teacher-1',
    title: '좀 더 노력이 필요합니다',
    content: '이번 과제는 기대에 미치지 못했습니다. 다음번에는 더 신중하게 답변을 작성해주세요. 필요하면 언제든 질문하세요!',
    category: 'improvement',
    usageCount: 8,
    createdAt: '2025-01-04T00:00:00Z',
  },
  {
    id: 'temp-5',
    teacherId: 'teacher-1',
    title: '일반 피드백',
    content: '제출해주셔서 감사합니다. AI 피드백을 참고하여 부족한 부분을 보완하세요.',
    category: 'general',
    usageCount: 30,
    createdAt: '2025-01-05T00:00:00Z',
    lastUsedAt: '2025-01-17T09:00:00Z',
  },
];

/**
 * Get template comments for teacher
 */
export const getTemplateComments = async (teacherId: string): Promise<TemplateComment[]> => {
  await delay();
  return mockTemplates
    .filter(t => t.teacherId === teacherId)
    .sort((a, b) => b.usageCount - a.usageCount); // Sort by most used
};

/**
 * Save new template comment
 */
export const saveTemplateComment = async (
  teacherId: string,
  data: { title: string; content: string; category: string }
): Promise<TemplateComment> => {
  await delay(500);
  
  const newTemplate: TemplateComment = {
    id: `temp-${Date.now()}`,
    teacherId,
    title: data.title,
    content: data.content,
    category: data.category,
    usageCount: 0,
    createdAt: new Date().toISOString(),
  };
  
  mockTemplates.push(newTemplate);
  return newTemplate;
};

/**
 * Delete template comment
 */
export const deleteTemplateComment = async (id: string): Promise<void> => {
  await delay(300);
  const index = mockTemplates.findIndex(t => t.id === id);
  if (index !== -1) {
    mockTemplates.splice(index, 1);
  }
};

/**
 * Increment usage count
 */
export const incrementTemplateUsage = async (id: string): Promise<void> => {
  await delay(100);
  const template = mockTemplates.find(t => t.id === id);
  if (template) {
    template.usageCount++;
    template.lastUsedAt = new Date().toISOString();
  }
};

