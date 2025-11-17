/**
 * Design System Demo Page
 * 
 * Comprehensive showcase of all design system components.
 * Serves as both documentation and visual reference.
 */

import React, { useState } from 'react';
import {
  // Primitives
  Box, Stack, Flex, Text, Heading,
  // Inputs
  Button, IconButton, Input, TextArea, Select, Checkbox, Switch,
  // Data Display
  Card, Badge, Tag, Avatar, Tooltip,
  // Layout
  Page, PageHeader, Section, StatCard,
  // Feedback
  Alert, Spinner, Modal,
  // Navigation
  Tabs, Breadcrumbs,
} from '../design-system';

export const DesignSystemDemo = () => {
  const [activeTab, setActiveTab] = useState('primitives');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);

  const tabs = [
    { id: 'primitives', label: 'Primitives' },
    { id: 'inputs', label: 'Form Inputs' },
    { id: 'data', label: 'Data Display' },
    { id: 'layout', label: 'Layout' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'navigation', label: 'Navigation' },
  ];

  const breadcrumbs = [
    { label: 'Home', onClick: () => console.log('Home') },
    { label: 'Components', onClick: () => console.log('Components') },
    { label: 'Demo' },
  ];

  return (
    <Page maxWidth="xl">
      <PageHeader
        title="Design System Demo"
        subtitle="Comprehensive showcase of all Learning Elevate design system components"
      />

      <Breadcrumbs items={breadcrumbs} className="mb-6" />

      <Tabs items={tabs} activeId={activeTab} onChange={setActiveTab} className="mb-8" />

      {/* PRIMITIVES */}
      {activeTab === 'primitives' && (
        <Stack direction="vertical" gap="lg">
          <Section title="Typography" description="Text and heading components">
            <Stack direction="vertical" gap="md">
              <div>
                <Heading level={1}>Heading Level 1</Heading>
                <Heading level={2}>Heading Level 2</Heading>
                <Heading level={3}>Heading Level 3</Heading>
                <Heading level={4}>Heading Level 4</Heading>
              </div>
              <div>
                <Text variant="body">Body text - Regular weight</Text>
                <Text variant="body" weight="medium">Body text - Medium weight</Text>
                <Text variant="body" weight="semibold">Body text - Semibold weight</Text>
                <Text variant="caption" color="secondary">Caption text - Secondary color</Text>
                <Text variant="small" color="muted">Small text - Muted color</Text>
              </div>
            </Stack>
          </Section>

          <Section title="Layout Primitives" description="Box, Stack, and Flex components">
            <Stack direction="vertical" gap="md">
              <Box className="p-4 bg-gray-100 rounded-lg">
                <Text>Box component with padding and background</Text>
              </Box>
              <Stack direction="horizontal" gap="md" align="center">
                <Box className="w-16 h-16 bg-primary-500 rounded-lg" />
                <Text>Horizontal Stack with gap</Text>
              </Stack>
              <Flex justify="between" align="center" className="p-4 bg-gray-100 rounded-lg">
                <Text>Flex with justify-between</Text>
                <Badge variant="primary">Badge</Badge>
              </Flex>
            </Stack>
          </Section>
        </Stack>
      )}

      {/* FORM INPUTS */}
      {activeTab === 'inputs' && (
        <Stack direction="vertical" gap="lg">
          <Section title="Buttons" description="Button variants and sizes">
            <Stack direction="vertical" gap="md">
              <Flex gap="md" wrap="wrap">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="destructive">Destructive Button</Button>
              </Flex>
              <Flex gap="md" wrap="wrap">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </Flex>
              <Flex gap="md" wrap="wrap">
                <Button isLoading>Loading...</Button>
                <Button disabled>Disabled</Button>
              </Flex>
              <Flex gap="md">
                <IconButton aria-label="Edit" size="sm">✏️</IconButton>
                <IconButton aria-label="Delete" size="md">🗑️</IconButton>
                <IconButton aria-label="Settings" size="lg">⚙️</IconButton>
              </Flex>
            </Stack>
          </Section>

          <Section title="Text Inputs" description="Input, TextArea, and Select">
            <Stack direction="vertical" gap="md">
              <Input
                label="Email"
                placeholder="Enter your email"
                helperText="We'll never share your email"
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter password"
                error="Password must be at least 8 characters"
              />
              <TextArea
                label="Description"
                placeholder="Tell us about yourself"
                rows={4}
              />
              <Select
                label="Select Country"
                placeholder="Choose a country"
                options={[
                  { value: 'us', label: 'United States' },
                  { value: 'kr', label: 'South Korea' },
                  { value: 'jp', label: 'Japan' },
                ]}
              />
            </Stack>
          </Section>

          <Section title="Checkbox & Switch" description="Boolean input components">
            <Stack direction="vertical" gap="md">
              <Checkbox
                label="I agree to terms and conditions"
                checked={checkboxValue}
                onChange={(e) => setCheckboxValue(e.target.checked)}
              />
              <Checkbox
                label="Subscribe to newsletter"
                helperText="Get updates about new features"
              />
              <Switch
                label="Enable notifications"
                checked={switchValue}
                onChange={(e) => setSwitchValue(e.target.checked)}
              />
              <Switch
                label="Dark mode"
                helperText="Switch between light and dark themes"
              />
            </Stack>
          </Section>
        </Stack>
      )}

      {/* DATA DISPLAY */}
      {activeTab === 'data' && (
        <Stack direction="vertical" gap="lg">
          <Section title="Cards" description="Card component with header, body, footer">
            <Stack direction="vertical" gap="md">
              <Card variant="default">
                <Card.Header title="Default Card" subtitle="With header and body" />
                <Card.Body>
                  <Text>This is the card body content. It can contain any React elements.</Text>
                </Card.Body>
                <Card.Footer>
                  <Button size="sm">Action</Button>
                </Card.Footer>
              </Card>
              <Card variant="outlined">
                <Card.Body>
                  <Text weight="semibold">Outlined Card</Text>
                  <Text variant="caption" color="secondary">Simple card with outlined border</Text>
                </Card.Body>
              </Card>
            </Stack>
          </Section>

          <Section title="Badges & Tags" description="Small labels for statuses">
            <Stack direction="vertical" gap="md">
              <Flex gap="sm" wrap="wrap">
                <Badge variant="neutral">Neutral</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
              </Flex>
              <Flex gap="sm" wrap="wrap">
                <Tag variant="neutral">Neutral Tag</Tag>
                <Tag variant="primary" onClose={() => alert('Close')}>Closeable</Tag>
                <Tag variant="success">Grammar</Tag>
                <Tag variant="warning">Vocabulary</Tag>
              </Flex>
            </Stack>
          </Section>

          <Section title="Avatars" description="User avatars with initials">
            <Flex gap="md" align="center" wrap="wrap">
              <Avatar name="John Doe" size="sm" />
              <Avatar name="Jane Smith" size="md" />
              <Avatar name="Bob Johnson" size="lg" />
              <Avatar name="Alice Brown" size="xl" />
              <Avatar name="Test User" size="lg" shape="square" />
            </Flex>
          </Section>

          <Section title="Tooltip" description="Hover to see tooltip">
            <Flex gap="md">
              <Tooltip content="This is a tooltip" placement="top">
                <Button>Hover me (top)</Button>
              </Tooltip>
              <Tooltip content="Bottom tooltip" placement="bottom">
                <Button>Hover me (bottom)</Button>
              </Tooltip>
            </Flex>
          </Section>
        </Stack>
      )}

      {/* LAYOUT */}
      {activeTab === 'layout' && (
        <Stack direction="vertical" gap="lg">
          <Section title="Page Layout" description="Page, PageHeader, Section components">
            <Alert variant="info" description="Page, PageHeader, and Section components are already in use on this demo page!" />
          </Section>

          <Section title="Stat Cards" description="Dashboard metrics cards">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                label="Total Students"
                value="1,234"
                trend={{ value: '+12%', isPositive: true }}
                icon={<span>👥</span>}
              />
              <StatCard
                label="Assignments"
                value="89"
                trend={{ value: '+5', isPositive: true }}
                icon={<span>📝</span>}
              />
              <StatCard
                label="Average Score"
                value="85%"
                trend={{ value: '-2%', isPositive: false }}
                icon={<span>📊</span>}
              />
            </div>
          </Section>
        </Stack>
      )}

      {/* FEEDBACK */}
      {activeTab === 'feedback' && (
        <Stack direction="vertical" gap="lg">
          <Section title="Alerts" description="Alert messages for different states">
            <Stack direction="vertical" gap="md">
              <Alert variant="info" title="Information" description="This is an informational message." />
              <Alert variant="success" title="Success" description="Operation completed successfully!" />
              <Alert variant="warning" title="Warning" description="Please be careful with this action." />
              <Alert variant="error" title="Error" description="Something went wrong. Please try again." onClose={() => alert('Closed')} />
            </Stack>
          </Section>

          <Section title="Spinner" description="Loading indicators">
            <Flex gap="md" align="center">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </Flex>
          </Section>

          <Section title="Modal" description="Dialog overlays">
            <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Example Modal"
              footer={
                <>
                  <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
                </>
              }
            >
              <Text>This is a modal dialog. It can contain any content.</Text>
              <Text variant="caption" color="secondary" className="mt-2">
                Press ESC or click outside to close.
              </Text>
            </Modal>
          </Section>
        </Stack>
      )}

      {/* NAVIGATION */}
      {activeTab === 'navigation' && (
        <Stack direction="vertical" gap="lg">
          <Section title="Tabs" description="Tab navigation (in use above!)">
            <Alert variant="info" description="The tab navigation at the top of this page demonstrates the Tabs component!" />
          </Section>

          <Section title="Breadcrumbs" description="Navigation breadcrumbs">
            <Stack direction="vertical" gap="md">
              <Breadcrumbs
                items={[
                  { label: 'Home', onClick: () => console.log('Home') },
                  { label: 'Products', onClick: () => console.log('Products') },
                  { label: 'Electronics' },
                ]}
              />
              <Breadcrumbs
                items={[
                  { label: 'Dashboard', href: '/' },
                  { label: 'Settings', href: '/settings' },
                  { label: 'Profile' },
                ]}
              />
            </Stack>
          </Section>
        </Stack>
      )}
    </Page>
  );
};

