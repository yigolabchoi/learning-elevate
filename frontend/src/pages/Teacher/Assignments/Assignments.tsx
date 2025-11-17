/**
 * Teacher Assignments Page
 * 
 * List of all assignments created by the teacher.
 * Assignments are problem sets assigned to specific classes or students.
 * 
 * Future implementation:
 * - List all assignments with filters (status, class, due date)
 * - Create new assignment from problem sets
 * - Edit assignment details
 * - View assignment statistics (completion rate, avg score)
 * - Send reminders to students
 * - Extend due dates
 * - Archive assignments
 */

export const Assignments = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Assignments</h1>
        <p className="text-gray-600">Manage and track student assignments</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium">
              Active
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              Completed
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              Overdue
            </button>
          </div>
          <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
            Create Assignment
          </button>
        </div>

        {/* Placeholder for assignments list */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Present Perfect Quiz {i}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>Class 1A</span>
                    <span>·</span>
                    <span>Due: Nov 25, 2025</span>
                    <span>·</span>
                    <span>20 questions</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      {Math.floor(Math.random() * 30 + 50)}% Complete
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      Avg: {Math.floor(Math.random() * 20 + 70)}%
                    </span>
                  </div>
                </div>
                <button className="text-primary-500 hover:text-primary-600">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

