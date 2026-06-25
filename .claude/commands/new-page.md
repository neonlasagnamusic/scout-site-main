Create a new page in the Pack 541 Angular app.

The user will provide a page name and route. Follow these steps:

1. Run `npx ng generate component pages/$ARGUMENTS --skip-tests` to scaffold the component
2. Add the route to `src/app/app.routes.ts` — import the component and add `{ path: '$ARGUMENTS', component: XxxComponent }` in the routes array
3. If the page should appear in the nav, add it to the `navItems` array in `src/app/components/navbar/navbar.component.ts`
4. Open the generated `.html` and `.scss` files and add a sensible starting structure matching the style of existing pages (hero or page-header section, content section)

Follow the project conventions:
- Use `@for` / `@if` block syntax, not `*ngFor` / `*ngIf`
- Use Angular signals for any local state
- SCSS scoped to the component file
- No comments unless the why is non-obvious
