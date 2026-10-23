# Architecture

## Application Stack

- Framework: Next.js App Router.
- UI library: React.
- Language: TypeScript.
- Styling: Tailwind CSS.
- UI primitives: shadcn/ui.
- Icons: Phosphor Icons.
- Package manager: Bun.

## Project Structure

Follow the existing repository structure. A possible organization is:

```text
app/
  layout.tsx
  page.tsx
  editor/
components/
  editor/
  templates/
  ui/
lib/
  utils.ts
  editor/
docs/
plans/
public/
```

Do not reorganize the project merely to match this example. Adapt it to the actual implementation.

## Application Components

### Application Routes

Use the Next.js App Router for pages, layouts, and route-level behavior.

### Shared UI

Keep reusable interface components separate from feature-specific components.

### Editor Workspace

The editor may contain:
- Canvas or stage.
- Editable objects.
- Selection and transformation controls.
- Toolbar.
- Properties panel.
- Layer panel.
- Undo and redo controls.
- Import and export operations.

### Editor State

Define a clear source of truth for the document, selected objects, and editing history.

Avoid duplicating the same state across unrelated components. Choose a state-management approach based on the actual complexity of the editor.

### Rendering and Canvas

Inspect the existing rendering or canvas library before adding another one. Keep document data separate from visual rendering when practical.

### Backend and Persistence

A backend may be needed for accounts, saved projects, or template submissions. Features that only require local editing may not need a backend.

Document the actual database, ORM, authentication, storage, and API choices here once they are established.

## Architecture Principles

- Prefer Server Components by default.
- Use Client Components for browser interactions.
- Keep modules focused.
- Avoid unnecessary dependencies.
- Separate concerns when it improves maintainability.
- Do not introduce a new architecture for a small feature without a clear benefit.

## Significant Decisions

For major technical decisions, record:
- **Context:** What problem are we solving?
- **Options:** What alternatives were considered?
- **Decision:** What did we choose?
- **Consequences:** What trade-offs does the decision create?
