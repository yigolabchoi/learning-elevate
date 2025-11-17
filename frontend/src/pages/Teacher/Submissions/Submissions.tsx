/**
 * Teacher Submissions Page
 * 
 * List of all student submissions awaiting review.
 * Teachers can review, provide feedback, and confirm AI-generated feedback.
 * 
 * Future implementation:
 * - List all pending submissions
 * - Filter by class, assignment, student
 * - Quick review mode (approve AI feedback)
 * - Detailed review mode (edit AI feedback, add comments)
 * - Bulk actions (approve all, request revision)
 * - View submission history
 * - Export grades
 */

export const Submissions = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Submissions</h1>
        <p className="text-gray-600">Review and grade student work</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium">
              Pending Review ({12})
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              Reviewed
            </button>
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>All Classes</option>
              <option>Class 1A</option>
              <option>Class 1B</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Quick Review All
            </button>
          </div>
        </div>

        {/* Placeholder for submissions list */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center font-semibold text-primary-700">
                    S{i}
                  </div>
                  <div>
                    <h3 className="font-semibold">Kim Student {i}</h3>
                    <p className="text-sm text-gray-600">Present Perfect Quiz</p>
                    <div className="flex gap-2 mt-1">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                        AI Graded
                      </span>
                      <span className="text-xs text-gray-500">Submitted 2h ago</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Score</p>
                    <p className="text-2xl font-bold text-primary-500">
                      {Math.floor(Math.random() * 30 + 60)}%
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                    Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

