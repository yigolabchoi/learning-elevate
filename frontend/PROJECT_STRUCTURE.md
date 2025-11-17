# School Portal - Project Structure

## Overview

This is the Learning Elevate School/Academy Portal for administrators and teachers.

## Folder Structure

```
src/
├── app/                          # Application root
│   ├── App.tsx                  # Main app component with providers
│   └── routes.tsx               # Central routing configuration
│
├── auth/                         # Authentication & Authorization
│   ├── AuthContext.tsx          # Auth provider with mock data
│   ├── AdminRoute.tsx           # Admin-only route wrapper
│   └── TeacherRoute.tsx         # Teacher-only route wrapper
│
├── layout/                       # Layout Components
│   ├── MainLayout.tsx           # Main layout wrapper
│   ├── Header.tsx               # Global header
│   └── Sidebar.tsx              # Role-based sidebar navigation
│
├── pages/                        # Page Components
│   ├── Login/
│   │   └── Login.tsx            # Login page
│   │
│   ├── Dashboard/
│   │   └── Dashboard.tsx        # Main dashboard (role-aware)
│   │
│   ├── Admin/                   # Admin-only pages
│   │   ├── Classes/
│   │   │   └── Classes.tsx      # Class management
│   │   └── Users/
│   │       └── Users.tsx        # User management
│   │
│   └── Teacher/                 # Teacher pages
│       ├── Curricula/
│       │   ├── CurriculaList.tsx      # List all curricula
│       │   └── CurriculumDetail.tsx   # Single curriculum view
│       ├── ProblemSets/
│       │   ├── ProblemSetsList.tsx    # List all problem sets
│       │   └── ProblemSetDetail.tsx   # Single problem set view
│       ├── Assignments/
│       │   └── Assignments.tsx         # Assignments management
│       ├── Submissions/
│       │   └── Submissions.tsx         # Review submissions
│       ├── ClassReport/
│       │   └── ClassReport.tsx         # Class analytics
│       └── StudentReport/
│           └── StudentReport.tsx       # Individual student report
│
├── components/                   # Reusable Components
│   └── ui/                      # Basic UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Card.tsx
│
├── lib/                          # Libraries & Utilities
│   ├── api/                     # API layer (mock for now)
│   ├── hooks/                   # Custom React hooks
│   ├── utils/                   # Utility functions
│   └── constants/               # Constants and config
│
├── store/                        # State Management
│   └── authStore.ts             # Auth state (Zustand)
│
├── types/                        # TypeScript Type Definitions
│   └── index.ts
│
├── styles/                       # Global Styles
│   └── index.css                # Tailwind + custom styles
│
└── main.tsx                      # Application entry point
```

## Routes

### Public Routes
- `/login` - Authentication page

### Admin Routes (Admin only)
- `/dashboard` - Admin dashboard
- `/admin/classes` - Class management
- `/admin/users` - User management (teachers, students, parents)

### Teacher Routes (Teacher & Admin)
- `/dashboard` - Teacher dashboard
- `/teacher/curricula` - List of all curricula
- `/teacher/curricula/:id` - Curriculum detail with units
- `/teacher/problem-sets` - List of all problem sets
- `/teacher/problem-sets/:id` - Problem set detail with questions
- `/teacher/assignments` - Assignment management
- `/teacher/submissions` - Review student submissions
- `/teacher/classes/:classId` - Class performance report
- `/teacher/students/:studentId` - Individual student report

## Authentication & Roles

### Mock Users (Development)
```typescript
// Admin
email: admin@school.com
password: password123

// Teacher
email: teacher@school.com
password: password123
```

### Role-Based Access
- **Admin**: Full access to all routes
- **Teacher**: Access to teacher routes + dashboard
- **Student**: (Not implemented in School Portal)
- **Parent**: (Not implemented in School Portal)

## Component Patterns

### Page Components
Each page component should:
1. Have a descriptive comment at the top explaining its purpose
2. Include "Future implementation" notes
3. Use placeholder data for now
4. Follow the established layout patterns

### Route Protection
```tsx
// Admin-only route
<AdminRoute>
  <MainLayout>
    <AdminClasses />
  </MainLayout>
</AdminRoute>

// Teacher route (admin can access too)
<TeacherRoute>
  <MainLayout>
    <CurriculaList />
  </MainLayout>
</TeacherRoute>
```

## Styling

- **Tailwind CSS** for all styling
- Follow the design system from `docs/design/design-system.md`
- Use semantic color classes (primary, success, error, etc.)
- Responsive by default (mobile-first)

## Next Steps

### Immediate (Phase 1)
1. Add real form validation
2. Implement API integration layer
3. Add loading states
4. Error handling & toast notifications

### Short-term (Phase 2)
1. Implement CRUD operations for all entities
2. Add search & filtering
3. Implement charts & analytics
4. Export functionality (PDF, CSV)

### Long-term (Phase 3)
1. Real-time updates (WebSocket)
2. Bulk operations
3. Advanced analytics & reporting
4. Parent portal integration

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Format code
npm run format
```

## Notes

- All authentication is currently mocked
- API calls should be stubbed for now
- Focus on UI/UX and component structure
- Backend integration will come later

