# Pack 541 Scout Website — Claude Code Guide

## Project Overview
Angular 19 marketing/info site for **Pack 541**, a Cub Scout pack serving Tustin & North Irvine, CA. Pure frontend — no backend, no API. Standalone components, Angular signals, SCSS.

## Dev Commands
```bash
npm start          # ng serve → http://localhost:4200 (auto-reload)
npm run build      # production build → dist/
npm test           # Karma/Jasmine unit tests
npx ng generate component pages/my-page  # scaffold a new page
npx ng generate component components/my-widget  # scaffold a shared component
```

## Project Structure
```
src/app/
  app.routes.ts          # all route definitions
  app.component.*        # root shell (router-outlet only)
  components/
    navbar/              # top nav with dropdown + mobile drawer
    footer/              # site footer
  pages/                 # one folder per route
    home/
    about/
    gallery/
    joining/
    activities/          # route: /campouts
    fundraising/
    adult-roles/
    camping-beginners/
    scouting-tips/
    uniform/
    scout-ranks/
    volunteers/
    glossary/
    scout-resources/
    not-found/           # 404
  services/
    roles.service.ts     # adult volunteer roles data
public/
  images/
    logos/               # scout-white.png, etc.
    gallery/             # photo gallery images
    events/              # event photos
    resources/           # downloadable resource images
    stock-images/
  videos/
  icons/
```

## Key Conventions
- **Standalone components** — no NgModule declarations. Import what you need directly.
- **Angular signals** (`signal()`, `computed()`) for local state — see navbar for examples.
- **`@for` / `@if` control flow** — use the new block syntax, not `*ngFor`/`*ngIf`.
- **SCSS** — each component has its own `.scss` file; global styles in `src/styles.scss`.
- **RouterLink** for internal navigation; never `href` for internal routes.
- **No state management library** — keep data in services or component signals.

## Adding a New Page
1. `npx ng generate component pages/<name>` 
2. Add route to `src/app/app.routes.ts`
3. Add nav entry to `src/app/components/navbar/navbar.component.ts` `navItems` array if needed

## Assets
- Images go in `public/images/<subfolder>/`
- Reference images as `src="images/..."` (not `/assets/...`) — Angular 19 uses `public/` as the asset root

## Testing
- Unit tests with Karma + Jasmine (`npm test`)
- No e2e framework set up yet
- Test files: `*.component.spec.ts` alongside each component
