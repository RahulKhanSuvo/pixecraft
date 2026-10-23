# AGENTS.md

## Project Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Bun
- Tailwind CSS 4
- shadcn/ui
- Hugeicons
- Konva and react-konva
- Zustand
- Biome for linting and formatting

Use the existing dependencies. Do not replace libraries or introduce alternatives without a clear technical reason.

## Mandatory Architecture

Pixecraft must follow a modular, feature-oriented architecture.

### Feature Ownership

- Organize application functionality inside `src/features/`.
- Each feature owns its components, hooks, types, utilities, and state when appropriate.
- Keep shared UI primitives in `src/components/ui/`.
- Keep genuinely shared application utilities in `src/lib/`.
- Keep routes in `src/app/`.
- Keep feature-specific business logic out of route page components.

### Single Responsibility

- Every module must have a clear responsibility.
- Do not put the entire editor in one component.
- Separate canvas rendering, toolbar controls, side panels, object manipulation, state management, and export logic.
- Split complex components when doing so improves readability and maintainability.
- Do not split simple components into excessive numbers of tiny files.

### Editor Architecture

The editor is a distinct feature and must be modular.

Separate these responsibilities where appropriate:

- Workspace composition.
- Canvas and stage rendering.
- Text, image, and shape objects.
- Object selection and transformations.
- Layer management.
- Property editing.
- Undo and redo.
- Document state.
- Import and export.
- Keyboard shortcuts.

Use `react-konva` for React-based canvas rendering and Konva operations. Do not introduce another canvas engine without justification.

Use Zustand for shared editor state when appropriate. Keep the state model independent of presentational components where practical.

Do not store unnecessary derived values or duplicate the same state in multiple places.

### Dependency Boundaries

- Routes compose features; they should not contain the complete implementation.
- Shared modules must not depend on feature-specific UI.
- Keep domain logic separate from rendering logic where practical.
- Avoid circular imports between features.
- Do not access another feature's internal files unnecessarily.
- Use public exports for cross-feature access when useful.
- Do not create barrel files for every directory by default.

### Component and State Rules

- Use Server Components by default.
- Use `"use client"` for interactive components that require client-side React behavior.
- Keep Konva rendering inside appropriate Client Components.
- Keep browser-only APIs out of Server Components.
- Use Zustand selectors to subscribe to the smallest relevant state.
- Avoid unnecessary rerenders and effects.
- Use TypeScript types that describe actual domain concepts.

### UI Standards

- Use Tailwind CSS 4 and the existing shadcn/ui setup.
- Use Hugeicons consistently.
- Follow `docs/DESIGN-SYSTEM.md`.
- Prioritize compact, responsive, accessible interfaces.
- Avoid generic dashboard styling and unnecessary visual decoration.
- Do not introduce a second icon library without approval.

### Before Coding

1. Inspect the current repository and relevant files.
2. Read `docs/PRODUCT.md` and applicable architecture documentation.
3. Identify which feature owns the requested behavior.
4. Check for reusable existing modules.
5. Explain the plan for substantial changes.
6. Implement only the necessary changes.
7. Run the relevant verification commands.

### Quality Requirements

- Follow existing naming and file conventions.
- Avoid unnecessary dependencies and abstractions.
- Never overwrite unrelated user changes.
- Do not silently perform large-scale refactoring.
- Update documentation when important architectural decisions change.
- Verify the implementation instead of trusting generated code blindly.

### Verification

Use the scripts defined in `package.json`.

- `bun run lint` — Biome checks.
- `bun run build` — production build.
- `bun run dev` — development server.

Run other checks only when the corresponding scripts or tools exist. Report which checks actually passed.

**Non-negotiable:** Features must remain modular, responsibilities must be clear, and new code must fit the existing architecture rather than growing into a monolithic implementation.
