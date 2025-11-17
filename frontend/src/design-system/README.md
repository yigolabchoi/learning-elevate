# Learning Elevate Design System

A comprehensive, reusable design system for both the School/Academy Portal and Student & Parent Portal.

## 📁 Structure

```
src/design-system/
├── tokens/              # Design tokens (colors, typography, spacing, etc.)
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── radii.ts
│   └── shadows.ts
├── theme/               # Theme provider and context
│   ├── ThemeProvider.tsx
│   └── index.ts
├── components/          # All UI components
│   ├── primitives/      # Basic building blocks
│   ├── inputs/          # Form components
│   ├── data-display/    # Cards, badges, avatars, etc.
│   ├── layout/          # Page layout components
│   ├── feedback/        # Alerts, modals, spinners
│   └── navigation/      # Tabs, breadcrumbs
└── index.ts             # Main entry point
```

## 🚀 Getting Started

### Installation

The design system is already integrated into your project. Import components from `@/design-system`:

```tsx
import { Button, Card, Input, Page } from '@/design-system';
```

### Theme Provider

Wrap your app with the `ThemeProvider`:

```tsx
import { ThemeProvider } from '@/design-system';

function App() {
  return (
    <ThemeProvider>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

## 📚 Components

### Primitives

Basic building blocks for layout and typography.

- **Box**: Polymorphic div-like container
- **Stack**: Vertical/horizontal layout with gap
- **Flex**: Flexbox wrapper with convenience props
- **Text**: Generic text with variants
- **Heading**: Semantic headings (h1-h4)

```tsx
<Stack direction="vertical" gap="md">
  <Heading level={1}>Title</Heading>
  <Text variant="body" color="secondary">Description</Text>
</Stack>
```

### Form Inputs

Form components with built-in validation support.

- **Button**: Primary, secondary, ghost, destructive variants
- **IconButton**: Square button for icons
- **Input**: Single-line text input
- **TextArea**: Multi-line text input
- **Select**: Dropdown select
- **Checkbox**: Boolean checkbox
- **Switch**: Toggle switch

```tsx
<form>
  <Input 
    label="Email" 
    type="email" 
    error={errors.email}
    required 
  />
  <Button type="submit" isLoading={isSubmitting}>
    Submit
  </Button>
</form>
```

### Data Display

Components for displaying information.

- **Card**: Container with header, body, footer
- **Badge**: Small status labels
- **Tag**: Badge with close button
- **Avatar**: User avatars with initials
- **Tooltip**: Hover tooltips

```tsx
<Card>
  <Card.Header title="User Profile" />
  <Card.Body>
    <Avatar name="John Doe" size="lg" />
    <Badge variant="success">Active</Badge>
  </Card.Body>
</Card>
```

### Layout

Page-level layout components.

- **Page**: Page wrapper with max-width
- **PageHeader**: Page title and actions
- **Section**: Content sections
- **StatCard**: Metric display cards

```tsx
<Page maxWidth="lg">
  <PageHeader 
    title="Dashboard" 
    actions={<Button>Action</Button>}
  />
  <Section title="Overview">
    <StatCard 
      label="Total Users" 
      value="1,234" 
      trend={{ value: "+12%", isPositive: true }}
    />
  </Section>
</Page>
```

### Feedback

User feedback components.

- **Alert**: Info, success, warning, error messages
- **Spinner**: Loading indicators
- **Modal**: Dialog overlays

```tsx
<Alert 
  variant="success" 
  title="Success!" 
  description="Your changes have been saved."
  onClose={() => setShow(false)}
/>

<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  footer={
    <>
      <Button variant="ghost">Cancel</Button>
      <Button>Confirm</Button>
    </>
  }
>
  Are you sure?
</Modal>
```

### Navigation

Navigation components.

- **Tabs**: Tab navigation
- **Breadcrumbs**: Breadcrumb trails

```tsx
<Tabs 
  items={[
    { id: '1', label: 'Tab 1' },
    { id: '2', label: 'Tab 2' },
  ]}
  activeId={activeTab}
  onChange={setActiveTab}
/>

<Breadcrumbs 
  items={[
    { label: 'Home', onClick: () => navigate('/') },
    { label: 'Settings' },
  ]}
/>
```

## 🎨 Design Tokens

### Colors

```tsx
import { colors } from '@/design-system/tokens';

// Primary brand colors
colors.primary[500]  // Main primary color
colors.primary[600]  // Hover state

// Semantic colors
colors.success[500]
colors.warning[500]
colors.error[500]
colors.info[500]

// Neutral scale
colors.neutral[50]   // Lightest
colors.neutral[900]  // Darkest

// Text colors
colors.text.primary
colors.text.secondary
colors.text.muted
```

### Typography

```tsx
import { typography } from '@/design-system/tokens';

typography.fontSize.md    // 1rem (16px)
typography.fontWeight.semibold  // 600
typography.lineHeight.normal    // 1.5
```

### Spacing

```tsx
import { spacing } from '@/design-system/tokens';

spacing.md   // 1rem (16px)
spacing.lg   // 1.5rem (24px)
spacing[4]   // 1rem (16px)
```

## 🎭 Theming

The design system currently supports a light theme, but is structured for easy dark mode addition.

```tsx
import { useTheme } from '@/design-system';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <div style={{ color: theme.colors.primary[500] }}>
      Themed content
    </div>
  );
}
```

## 📱 Demo

Visit `/design-system` to see all components in action with interactive examples.

## 🎯 Best Practices

### 1. Use Design System Components

✅ **Good:**
```tsx
import { Button, Card, Input } from '@/design-system';

<Card>
  <Input label="Name" />
  <Button>Submit</Button>
</Card>
```

❌ **Avoid:**
```tsx
<div className="card">
  <input />
  <button>Submit</button>
</div>
```

### 2. Use Semantic HTML

Components use semantic HTML by default. Leverage the `as` prop for flexibility:

```tsx
<Box as="section">
  <Heading level={2}>Section Title</Heading>
</Box>
```

### 3. Composition Over Props

Build complex UIs by composing simple components:

```tsx
<Stack direction="vertical" gap="lg">
  <Card>
    <Card.Header title="User Info" />
    <Card.Body>
      <Avatar name="John Doe" />
    </Card.Body>
  </Card>
</Stack>
```

### 4. Consistent Spacing

Use the design system's spacing scale:

```tsx
// Use spacing props
<Stack gap="md">...</Stack>

// Or Tailwind classes that match our scale
<div className="p-4 mb-6">...</div>
```

### 5. Accessible by Default

Components include ARIA attributes, but add context-specific labels:

```tsx
<IconButton aria-label="Delete item">🗑️</IconButton>
<Input label="Email" id="user-email" />
```

## 🔧 Customization

### Extending Components

You can extend components using className:

```tsx
<Button className="custom-additional-styles">
  Click me
</Button>
```

### Creating Custom Components

Build new components using design system primitives:

```tsx
import { Card, Stack, Text, Badge } from '@/design-system';

export const UserCard = ({ user }) => (
  <Card>
    <Card.Body>
      <Stack direction="horizontal" align="center" gap="md">
        <Avatar name={user.name} />
        <Text weight="semibold">{user.name}</Text>
        <Badge variant="success">Active</Badge>
      </Stack>
    </Card.Body>
  </Card>
);
```

## 📖 Documentation

- **Live Demo**: Visit `/design-system` in your browser
- **Component Props**: Check TypeScript definitions for prop types
- **Examples**: See `DesignSystemDemo.tsx` for comprehensive usage examples

## 🤝 Contributing

When adding new components:

1. Follow existing component structure
2. Use design tokens for styling
3. Include TypeScript types
4. Add examples to the demo page
5. Ensure accessibility (ARIA labels, keyboard navigation)
6. Test with both portals (School and Student/Parent)

## 🔮 Future Enhancements

- [ ] Dark mode support
- [ ] Animation system
- [ ] Additional chart components
- [ ] Form validation helpers
- [ ] Storybook integration
- [ ] Component testing suite
- [ ] Accessibility audit

---

Built with ❤️ for Learning Elevate

