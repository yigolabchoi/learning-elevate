/**
 * Admin User Management Page
 * 
 * Comprehensive user management for Teachers, Students, and Parents.
 * Features tabs for each user type with create, edit, and toggle active functionality.
 * 
 * Features:
 * - Tab navigation (Teachers, Students, Parents)
 * - User tables with actions
 * - Create new users
 * - Edit existing users
 * - Toggle active/inactive status
 */

import { useState, useEffect } from 'react';
import { Teacher, Student, Parent, UserRole } from '../../../types';
import { getUsersByRole, toggleUserActive } from '../../../lib/api/mock/users';
import { getClasses } from '../../../lib/api/mock/classes';
import { Class } from '../../../types';
import { UserFormDrawer } from '../../../components/admin/UserFormDrawer';

type TabType = 'teachers' | 'students' | 'parents';

export const UserManagement = () => {
  const [activeTab, setActiveTab] = useState<TabType>('teachers');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [parents, setParents] = useState<Parent[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Teacher | Student | Parent | null>(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [teachersData, studentsData, parentsData, classesData] = await Promise.all([
        getUsersByRole('teacher'),
        getUsersByRole('student'),
        getUsersByRole('parent'),
        getClasses(),
      ]);

      setTeachers(teachersData as Teacher[]);
      setStudents(studentsData as Student[]);
      setParents(parentsData as Parent[]);
      setClasses(classesData);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (userId: string, role: UserRole) => {
    try {
      await toggleUserActive(userId, role);
      
      // Update local state
      switch (role) {
        case 'teacher':
          setTeachers((prev) =>
            prev.map((t) => (t.id === userId ? { ...t, isActive: !t.isActive } : t))
          );
          break;
        case 'student':
          setStudents((prev) =>
            prev.map((s) => (s.id === userId ? { ...s, isActive: !s.isActive } : s))
          );
          break;
        case 'parent':
          setParents((prev) =>
            prev.map((p) => (p.id === userId ? { ...p, isActive: !p.isActive } : p))
          );
          break;
      }
    } catch (error) {
      console.error('Failed to toggle user status:', error);
      alert('Failed to update user status. Please try again.');
    }
  };

  const handleEdit = (user: Teacher | Student | Parent) => {
    setEditingUser(user);
    setIsDrawerOpen(true);
  };

  const handleCreate = (role: UserRole) => {
    setEditingUser(null);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setEditingUser(null);
  };

  const handleUserSaved = () => {
    loadAllData();
    handleDrawerClose();
  };

  const getClassName = (classId?: string) => {
    if (!classId) return '-';
    const classData = classes.find((c) => c.id === classId);
    return classData ? classData.name : 'Unknown';
  };

  const tabs = [
    { id: 'teachers' as TabType, label: 'Teachers', count: teachers.length },
    { id: 'students' as TabType, label: 'Students', count: students.length },
    { id: 'parents' as TabType, label: 'Parents', count: parents.length },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="mt-1 text-gray-600">
          Manage teacher, student, and parent accounts
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
              <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-gray-100">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Teachers Tab */}
        {activeTab === 'teachers' && (
          <TeachersTable
            teachers={teachers}
            onEdit={handleEdit}
            onToggleActive={handleToggleActive}
            onCreate={() => handleCreate('teacher')}
          />
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <StudentsTable
            students={students}
            getClassName={getClassName}
            onEdit={handleEdit}
            onToggleActive={handleToggleActive}
            onCreate={() => handleCreate('student')}
          />
        )}

        {/* Parents Tab */}
        {activeTab === 'parents' && (
          <ParentsTable
            parents={parents}
            onEdit={handleEdit}
            onToggleActive={handleToggleActive}
            onCreate={() => handleCreate('parent')}
          />
        )}
      </div>

      {/* User Form Drawer */}
      <UserFormDrawer
        isOpen={isDrawerOpen}
        user={editingUser}
        role={activeTab === 'teachers' ? 'teacher' : activeTab === 'students' ? 'student' : 'parent'}
        onClose={handleDrawerClose}
        onSave={handleUserSaved}
      />
    </div>
  );
};

// Teachers Table Component
interface TeachersTableProps {
  teachers: Teacher[];
  onEdit: (teacher: Teacher) => void;
  onToggleActive: (id: string, role: UserRole) => void;
  onCreate: () => void;
}

const TeachersTable = ({ teachers, onEdit, onToggleActive, onCreate }: TeachersTableProps) => {
  return (
    <div>
      {/* Table Header with Create Button */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Teachers</h2>
        <button
          onClick={onCreate}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 text-sm font-medium flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Teacher
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subjects</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{teacher.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {teacher.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {teacher.subjects?.join(', ') || teacher.subject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onToggleActive(teacher.id, 'teacher')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      teacher.isActive ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        teacher.isActive ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button
                    onClick={() => onEdit(teacher)}
                    className="text-primary-600 hover:text-primary-900 font-medium"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Students Table Component
interface StudentsTableProps {
  students: Student[];
  getClassName: (classId?: string) => string;
  onEdit: (student: Student) => void;
  onToggleActive: (id: string, role: UserRole) => void;
  onCreate: () => void;
}

const StudentsTable = ({ students, getClassName, onEdit, onToggleActive, onCreate }: StudentsTableProps) => {
  return (
    <div>
      {/* Table Header with Create Button */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Students</h2>
        <button
          onClick={onCreate}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 text-sm font-medium flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Student
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{student.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {student.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {getClassName(student.classId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {student.gradeLevel}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onToggleActive(student.id, 'student')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      student.isActive ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        student.isActive ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button
                    onClick={() => onEdit(student)}
                    className="text-primary-600 hover:text-primary-900 font-medium"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Parents Table Component
interface ParentsTableProps {
  parents: Parent[];
  onEdit: (parent: Parent) => void;
  onToggleActive: (id: string, role: UserRole) => void;
  onCreate: () => void;
}

const ParentsTable = ({ parents, onEdit, onToggleActive, onCreate }: ParentsTableProps) => {
  return (
    <div>
      {/* Table Header with Create Button */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Parents</h2>
        <button
          onClick={onCreate}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 text-sm font-medium flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Parent
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Children</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parents.map((parent) => (
              <tr key={parent.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{parent.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {parent.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {parent.phone || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {parent.childIds.length} {parent.childIds.length === 1 ? 'child' : 'children'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onToggleActive(parent.id, 'parent')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      parent.isActive ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        parent.isActive ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button
                    onClick={() => onEdit(parent)}
                    className="text-primary-600 hover:text-primary-900 font-medium"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

