/**
 * Mock API - Assignment Management
 * 
 * Provides mock data and async functions for assignment management.
 * Teachers can create and manage assignments.
 * 
 * Functions:
 * - getAssignmentsByTeacher(teacherId)
 * - getAssignment(id)
 * - createAssignment(payload, teacherId)
 * - updateAssignment(id, payload)
 * - deleteAssignment(id)
 */

import { Assignment } from '../../../types';

// Mock delay to simulate network latency
const delay = (ms: number = 400) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Assignments Data
let mockAssignments: Assignment[] = [
  {
    id: 'assignment-1',
    title: 'Present Perfect Practice',
    classId: 'class-1',
    className: 'Grade 7 - A',
    problemSetId: 'problemset-1',
    problemSetName: 'Present Perfect Practice Set',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    assignedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    status: 'active',
    teacherId: 'teacher-1',
  },
  {
    id: 'assignment-2',
    title: 'Grammar Challenge',
    classId: 'class-4',
    className: 'Grade 9 - Advanced',
    problemSetId: 'problemset-2',
    problemSetName: 'Advanced Grammar Challenge',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    assignedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    status: 'active',
    teacherId: 'teacher-1',
  },
  {
    id: 'assignment-3',
    title: 'Mid-term Review',
    classId: 'class-1',
    className: 'Grade 7 - A',
    problemSetId: 'problemset-1',
    problemSetName: 'Present Perfect Practice Set',
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago (overdue)
    assignedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    status: 'closed',
    teacherId: 'teacher-1',
  },
];

/**
 * Get all assignments for a specific teacher
 */
export const getAssignmentsByTeacher = async (teacherId: string): Promise<Assignment[]> => {
  await delay(300);
  return mockAssignments.filter((a) => a.teacherId === teacherId);
};

/**
 * Get a single assignment by ID
 */
export const getAssignment = async (id: string): Promise<Assignment | null> => {
  await delay(300);
  const assignment = mockAssignments.find((a) => a.id === id);
  return assignment ? { ...assignment } : null;
};

/**
 * Create a new assignment
 */
export const createAssignment = async (
  payload: Omit<Assignment, 'id' | 'assignedAt' | 'teacherId'>,
  teacherId: string
): Promise<Assignment> => {
  await delay(500);

  const newAssignment: Assignment = {
    ...payload,
    id: `assignment-${Date.now()}`,
    teacherId,
    assignedAt: new Date().toISOString(),
  };

  mockAssignments.push(newAssignment);
  return { ...newAssignment };
};

/**
 * Update an existing assignment
 */
export const updateAssignment = async (
  id: string,
  payload: Partial<Assignment>
): Promise<Assignment | null> => {
  await delay(500);

  const index = mockAssignments.findIndex((a) => a.id === id);
  if (index === -1) {
    return null;
  }

  mockAssignments[index] = {
    ...mockAssignments[index],
    ...payload,
  };

  return { ...mockAssignments[index] };
};

/**
 * Delete an assignment
 */
export const deleteAssignment = async (id: string): Promise<boolean> => {
  await delay(400);

  const index = mockAssignments.findIndex((a) => a.id === id);
  if (index === -1) {
    return false;
  }

  mockAssignments.splice(index, 1);
  return true;
};

