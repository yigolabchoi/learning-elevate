/**
 * Mock API - Parent Notifications
 * 
 * Provides mock notification data for parents.
 * 
 * Functions:
 * - getParentNotifications(parentId)
 * - markNotificationAsRead(id)
 */

import { ParentNotification } from '../../../types';

// Mock delay to simulate network latency
const delay = (ms: number = 400) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Notifications Data (in-memory store)
let mockNotifications: ParentNotification[] = [
  {
    id: 'notif-1',
    type: 'success',
    title: 'Assignment Completed',
    message: 'Kim Min-jun has completed "Present Perfect Tense Practice" with a score of 87%.',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    isRead: false,
  },
  {
    id: 'notif-2',
    type: 'info',
    title: 'New Assignment Available',
    message: 'A new assignment "Vocabulary Quiz - Science Terms" has been assigned to Lee Seo-yeon. Due date: Nov 25, 2025.',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    isRead: false,
  },
  {
    id: 'notif-3',
    type: 'success',
    title: 'Level Up!',
    message: 'Congratulations! Park Ji-hoon has advanced to Level 7. Keep up the excellent work!',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    isRead: true,
  },
  {
    id: 'notif-4',
    type: 'warning',
    title: 'Assignment Due Soon',
    message: 'Kim Min-jun has an assignment due in 2 days: "Reading Comprehension - Short Stories".',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    isRead: true,
  },
  {
    id: 'notif-5',
    type: 'info',
    title: 'Monthly Report Available',
    message: 'Your monthly learning report for all children is now available. View detailed progress and recommendations.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    isRead: true,
  },
  {
    id: 'notif-6',
    type: 'success',
    title: 'Perfect Score!',
    message: 'Lee Seo-yeon achieved a perfect score (100%) on "Creative Writing - Story Continuation". Great job!',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    isRead: true,
  },
  {
    id: 'notif-7',
    type: 'warning',
    title: 'Low Score Alert',
    message: 'Lee Seo-yeon scored below 70% on "Grammar Quiz". Consider reviewing this topic with additional practice.',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    isRead: true,
  },
  {
    id: 'notif-8',
    type: 'info',
    title: 'Teacher Comment',
    message: 'Teacher left a comment on Kim Min-jun\'s essay: "Excellent use of vocabulary. Keep improving!"',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    isRead: true,
  },
];

/**
 * Get all notifications for a parent
 */
export const getParentNotifications = async (parentId: string): Promise<ParentNotification[]> => {
  await delay(400);
  
  // Return notifications sorted by createdAt (newest first)
  return [...mockNotifications].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

/**
 * Mark a notification as read
 */
export const markNotificationAsRead = async (id: string): Promise<void> => {
  await delay(300);
  
  const notification = mockNotifications.find(n => n.id === id);
  if (notification) {
    notification.isRead = true;
    console.log(`Notification ${id} marked as read`);
  }
};

/**
 * Mark all notifications as read
 */
export const markAllNotificationsAsRead = async (): Promise<void> => {
  await delay(400);
  
  mockNotifications.forEach(n => {
    n.isRead = true;
  });
  console.log('All notifications marked as read');
};

