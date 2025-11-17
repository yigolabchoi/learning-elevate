/**
 * Mock API - Parent Profile
 * 
 * Provides mock data for parent account profile and settings.
 * 
 * Functions:
 * - getParentProfile(parentId)
 * - updateParentProfile(profile)
 */

import { ParentProfile } from '../../../types';

// Mock delay to simulate network latency
const delay = (ms: number = 400) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Parent Profile Data (in-memory store)
let mockProfile: ParentProfile = {
  id: 'parent-1',
  name: 'Kim Soo-jin',
  email: 'parent@school.com',
  phone: '+82-10-1234-5678',
  notificationPreferences: {
    email: true,
    sms: true,
    importantOnly: false,
  },
};

/**
 * Get parent profile by ID
 */
export const getParentProfile = async (parentId: string): Promise<ParentProfile> => {
  await delay(400);
  
  // Return a copy to prevent direct mutation
  return { ...mockProfile, notificationPreferences: { ...mockProfile.notificationPreferences } };
};

/**
 * Update parent profile
 */
export const updateParentProfile = async (profile: ParentProfile): Promise<void> => {
  await delay(500);
  
  // Update in-memory store
  mockProfile = {
    ...profile,
    notificationPreferences: { ...profile.notificationPreferences },
  };
  
  console.log('Profile updated:', mockProfile);
};

