# Design System

## Design Direction

Pixecraft should feel like a focused, professional creative tool rather than a generic AI dashboard.

The interface should prioritize the canvas, editing controls, and the user's work.

## Visual Principles

- Compact and mobile-aware layouts.
- Clear visual hierarchy.
- Purposeful spacing.
- Thin borders and restrained shadows.
- Consistent typography.
- Minimal decorative elements.
- Strong contrast for important actions.
- No unnecessary gradients, glassmorphism, or decorative cards.

## Colors

Use the project's existing theme and design tokens whenever possible.

Suggested direction:
- Background: off-white or white.
- Primary text: near-black.
- Secondary text: neutral gray.
- Borders: subtle neutral tones.
- Primary actions: black or another established high-contrast color.
- Success states: restrained emerald.
- Accent colors: used sparingly and consistently.

Do not scatter hardcoded colors across components. Prefer centralized CSS variables or theme tokens.

## Typography

- Use a consistent font family.
- Establish clear heading, body, caption, and label styles.
- Avoid oversized headings inside the editor.
- Use uppercase, letter-spaced labels only where they improve navigation or hierarchy.
- Maintain readable text sizes and contrast.

## Layout

- Prioritize the canvas and editing workspace.
- Keep toolbars and panels compact.
- Use consistent spacing and alignment.
- Avoid excessive empty space.
- Make responsive behavior intentional rather than simply shrinking the desktop layout.

## Components

- Reuse shadcn/ui components when appropriate.
- Customize components to fit Pixecraft's design language.
- Keep buttons, inputs, menus, dialogs, and panels visually consistent.
- Avoid unnecessary nested cards and borders.

## Icons

- Use Phosphor Icons as the standard icon library.
- Use consistent icon sizes and stroke weights.
- Give icon-only buttons accessible labels.
- Avoid icons that add no useful information.

## Interaction States

Interactive components should account for:
- Default.
- Hover.
- Focus.
- Active or selected.
- Disabled.
- Loading.
- Error, where applicable.

## Accessibility

- Use semantic HTML.
- Support keyboard navigation.
- Provide visible focus indicators.
- Use accessible labels.
- Do not communicate status through color alone.
- Respect reduced-motion preferences.

## Editor-Specific Usability

- Make the selected object obvious.
- Keep object controls predictable.
- Provide clear feedback for editing operations.
- Make undo and redo easy to discover.
- Prevent accidental loss of work where practical.
- Avoid interface changes that interrupt the editing flow.

## Before Adding UI

Check the existing design system first. Reuse established tokens and components rather than introducing a new visual style for each feature.
