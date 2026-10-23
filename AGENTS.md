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
