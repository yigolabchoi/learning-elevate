# Learning Elevate - School Portal Frontend

## 🎯 Overview

School/Academy Portal for Learning Elevate - a comprehensive platform for administrators and teachers to manage curricula, problem sets, assignments, and track student progress.

## 🚀 Quick Start

### Development Server

```bash
npm install
npm run dev
```

Visit http://localhost:5173

### Demo Accounts

**Admin Access:**
- Email: `admin@school.com`
- Password: `password123`

**Teacher Access:**
- Email: `teacher@school.com`
- Password: `password123`

### Role Switcher

In development mode, you can switch between Admin and Teacher roles using the buttons in the header (top-right).

## 📁 Project Structure

```
src/
├── app/              # Application root & routing
├── auth/             # Authentication & route guards
├── layout/           # Layout components (Header, Sidebar)
├── pages/            # Page components
│   ├── Login/
│   ├── Dashboard/
│   ├── Admin/        # Admin-only pages
│   └── Teacher/      # Teacher pages
├── components/       # Reusable UI components
├── lib/              # Utils, hooks, constants
└── types/            # TypeScript types
```

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed documentation.

## 🛣️ Routes

### Admin Routes
- `/dashboard` - Admin dashboard
- `/admin/classes` - Manage classes
- `/admin/users` - Manage users (teachers, students)

### Teacher Routes
- `/dashboard` - Teacher dashboard
- `/teacher/curricula` - Curriculum management
- `/teacher/curricula/:id` - Curriculum detail
- `/teacher/problem-sets` - Problem set library
- `/teacher/problem-sets/:id` - Problem set detail
- `/teacher/assignments` - Assignment management
- `/teacher/submissions` - Review student work
- `/teacher/classes/:classId` - Class analytics
- `/teacher/students/:studentId` - Student analytics

## 🎨 Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router 7** - Routing
- **Tailwind CSS 4** - Styling
- **Lucide React** - Icons
- **Zustand** - State management (minimal)

## 🔐 Authentication

Currently using mock authentication for development:

```typescript
// Mock users defined in src/auth/AuthContext.tsx
- admin@school.com
- teacher@school.com
```

**Role-Based Access:**
- Admin can access all routes
- Teacher can access teacher routes + dashboard
- Protected routes redirect unauthorized users

## 🧩 Key Features

### For Administrators
- ✅ Class management overview
- ✅ User management (teachers, students, parents)
- ✅ School-wide statistics
- 📝 (Placeholders ready for implementation)

### For Teachers
- ✅ Curriculum builder
- ✅ AI-powered problem set generation
- ✅ Assignment creation & distribution
- ✅ Submission review workflow
- ✅ Class analytics dashboard
- ✅ Individual student progress tracking
- 📝 (UI complete, backend integration pending)

## 📝 Development Notes

### Current State
- ✅ Complete routing structure
- ✅ Role-based navigation
- ✅ Layout components (Header, Sidebar)
- ✅ All page placeholders created
- ✅ Mock authentication working
- ⏳ Backend integration (pending)
- ⏳ Real data operations (pending)

### Mock Data
All pages currently use placeholder/mock data. API integration points are marked with comments for future implementation.

### Next Steps
1. Connect to real backend API
2. Implement CRUD operations
3. Add form validation
4. Implement charts & analytics
5. Add real-time updates

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Format code
npm run format
```

## 📖 Documentation

- [Project Structure](./PROJECT_STRUCTURE.md) - Detailed folder structure
- [Design System](../docs/design/design-system.md) - Colors, typography, spacing
- [Component Library](../docs/design/component-library.md) - UI components
- [API Specification](../docs/api/api-specification.md) - Backend API docs
- [Coding Conventions](../docs/development/coding-conventions.md) - Code style guide

## 🎯 Design Philosophy

### Code Organization
- **Feature-based pages** in `src/pages/`
- **Shared components** in `src/components/ui/`
- **Route protection** with wrapper components
- **Clean separation** of concerns

### UI/UX Principles
- **Mobile-first** responsive design
- **Consistent** with design system
- **Accessible** keyboard navigation
- **Clear** visual hierarchy
- **Fast** loading & interactions

### Future-Ready
- Comments mark future implementations
- Placeholder UI shows intended features
- Type-safe structure ready for backend
- Modular design for easy expansion

## 🤝 Contributing

1. Check existing component library before creating new components
2. Follow the design system (colors, spacing, typography)
3. Add TypeScript types for all props and data
4. Include descriptive comments for future implementations
5. Test with both Admin and Teacher roles

## 📞 Support

For questions or issues:
- Check documentation in `/docs` folder
- Review `PROJECT_STRUCTURE.md`
- Refer to design system documentation

---

**Version**: 0.1.0  
**Last Updated**: 2025-11-17  
**Status**: 🟡 UI Complete, Backend Integration Pending
