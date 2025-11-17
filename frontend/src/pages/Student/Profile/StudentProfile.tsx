/**
 * Student Profile Page
 * 
 * Shows student profile and settings.
 * 
 * Features:
 * - Student information
 * - Class information
 * - Learning statistics
 * - Settings (notifications, etc.)
 * - Change password
 */

export const StudentProfile = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-1 text-gray-600">View and edit your profile</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <svg
          className="w-16 h-16 mx-auto text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Profile</h3>
        <p className="text-gray-600">
          View your profile information, learning statistics, and settings.
        </p>
      </div>
    </div>
  );
};

