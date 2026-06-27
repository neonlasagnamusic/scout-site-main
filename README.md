# Pack541

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.3.

## Getting Up and running

Make sure you have node.js, npm, and Angular CLI installed. 

```bash
npm install
```

Once the node modules directory is created, you can proceed with all server and build tasks.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

If a server is already running on port 4200, just confirm it's responding and report the status.


## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Adding components (pages) / routes

1. Run `ng generate component pages/$ARGUMENTS --skip-tests` to scaffold the component
2. Add the route to `src/app/app.routes.ts` — import the component and add `{ path: '$ARGUMENTS', component: XxxComponent }` in the routes array
3. If the page should appear in the nav, add it to the `navItems` array in `src/app/components/navbar/navbar.component.ts`
4. Open the generated `.html` and `.scss` files and add a sensible starting structure matching the style of existing pages (hero or page-header section, content section)

Follow the project conventions:
- Use `@for` / `@if` block syntax, not `*ngFor` / `*ngIf`
- Use Angular signals for any local state
- SCSS scoped to the component file
- No comments unless the why is non-obvious

```bash
ng generate component <new-component-name>
```

or 

```bash
ng g c <new-component-path/name>
```

dev note:  I have found it useful to just cd into the directory you want to make a component in and then just run the ng g c code without having to manually type it in.
In terminal, just type cd then a space, then go over to the project folder and drag the directory you want to add the component to into the terminal.

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
