# AGENTS.md

## Project Overview

- **Project:** Pixecraft
- **Purpose:** Browser-based visual editor
- **Framework:** Next.js App Router
- **Language:** TypeScript
- **Package manager:** Bun
- **Styling:** Tailwind CSS
- **UI components:** shadcn/ui
- **Icons:** hugeicons

## Before Starting a Task

1. Inspect the existing project structure.
2. Read relevant documentation before changing code.
3. Understand the current implementation and its dependencies.
4. Identify the smallest solution that satisfies the requirement.
5. For substantial changes, explain the implementation plan before coding.
6. Ask questions when a requirement is ambiguous or a decision has significant consequences.

## Coding Rules

- Use TypeScript and avoid `any` unless necessary.
- Prefer small, reusable, focused components.
- Follow the existing project conventions.
- Use React Server Components by default.
- Add `"use client"` only when client-side interactivity or browser APIs require it.
- Separate business logic from presentation when practical.
- Reuse existing components and utilities.
- Avoid unnecessary dependencies and abstractions.
- Handle loading, error, empty, and success states appropriately.
- Never duplicate existing functionality without a reason.

## UI and Design

- Follow `docs/DESIGN-SYSTEM.md`.
- Build responsive and accessible interfaces.
- Use Phosphor Icons consistently.
- Use shadcn/ui components where appropriate.
- Avoid generic dashboard designs, excessive whitespace, oversized headings, unnecessary cards, excessive gradients, and heavy shadows.
- Prefer compact layouts, clear hierarchy, subtle borders, and purposeful spacing.
- Support keyboard navigation and visible focus states.

## Working With Existing Code

- Inspect dependencies and callers before modifying shared components.
- Preserve existing behavior unless the task requires changing it.
- Avoid unrelated refactoring.
- Never overwrite unrelated user changes.
- Update documentation when architecture or behavior changes.

## Testing and Verification

- Run relevant lint, type-check, test, and build commands when available.
- Read command output and fix errors caused by your changes.
- Never claim a check passed unless it actually ran successfully.
- Clearly mention checks that were not performed.

## Security and Dependencies

- Check whether an existing dependency already solves the problem.
- Do not install packages without a clear reason.
- Never hardcode API keys, passwords, or secrets.
- Keep secrets in environment variables.
- Validate untrusted input.
- Enforce authorization on the server.
- Never expose private environment variables to client-side code.
- Avoid destructive commands unless explicitly authorized.

## Git

- Keep changes focused on the requested task.
- Do not revert unrelated user modifications.
- Do not commit or push unless asked.

## Task Completion

For substantial tasks, report:

1. What changed.
2. Why the approach was chosen.
3. Which files were modified.
4. Which checks were performed.
5. Any remaining issues or limitations.

For simple tasks, avoid unnecessary planning and lengthy explanations.

**Important:** Understand and verify generated code instead of blindly trusting AI output.

## Modular Architecture (Required)

The project must follow a modular, feature-oriented architecture. Do not place the entire application or a feature in a single large component or file.

### 1. Organize by Feature

- Group related components, hooks, types, schemas, and business logic by feature when appropriate.
- Keep each feature's implementation cohesive and easy to locate.
- Separate shared functionality from feature-specific functionality.
- Avoid creating folders or abstractions without a practical reason.

### 2. Single Responsibility

- Each component, hook, utility, and module should have a clear responsibility.
- Components should not contain unrelated business logic.
- Separate UI rendering, state management, data access, validation, and domain logic when doing so improves clarity.
- Extract reusable logic when it is genuinely shared or makes a complex component easier to understand.
- Avoid both oversized files and excessive fragmentation into tiny files.

### 3. Suggested Structure

Adapt this structure to the existing repository and the complexity of each feature. Do not create every directory automatically.

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── editor/
├── features/
│   ├── editor/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── types/
│   │   └── index.ts
│   ├── templates/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── types/
│   └── export/
│       ├── components/
│       ├── lib/
│       └── types/
├── components/
│   ├── layout/
│   └── ui/
├── hooks/
├── lib/
├── types/
└── config/
```

The exact structure may evolve. First inspect whether the project already uses a `src/` directory and follow that convention consistently.

### 4. Module Boundaries

- A feature should own its internal implementation whenever practical.
- Shared components and utilities belong in shared directories only when multiple features genuinely need them.
- Avoid circular dependencies between modules.
- Avoid importing another feature's private implementation directly when a clear public interface would work better.
- Keep imports and exports explicit and understandable.
- Do not create barrel files everywhere by default.

### 5. Component Design

- Keep page components focused on composing the page and connecting feature components.
- Split complex interfaces into meaningful subcomponents.
- Extract custom hooks when they encapsulate reusable or complex React behavior.
- Keep components configurable through well-defined props.
- Avoid passing unnecessary props through many layers; use an appropriate state or composition pattern when justified.

### 6. Dependency Direction

- Shared utilities must not depend on feature-specific UI.
- Domain logic should not depend unnecessarily on React components.
- UI components should consume clearly defined state and operations.
- Keep framework-specific code at appropriate application boundaries.

### 7. Before Creating or Refactoring Modules

1. Inspect the current directory structure.
2. Identify the responsibility of the existing code.
3. Decide which module should own that responsibility.
4. Check for existing implementations that can be reused.
5. Make the smallest architectural change that improves maintainability.

Do not reorganize the entire project just to match an example directory tree.

### 8. Maintainability Rule

When a file becomes difficult to understand because it contains multiple unrelated responsibilities, split it into cohesive modules. Do not use an arbitrary line-count limit as the only reason to split a file.

**Required outcome:** Every feature should have a clear place in the architecture, every module should have a clear responsibility, and the codebase should remain easy to extend, debug, test, and understand.
