# Available Scripts

In the project directory, you can run:

## `npm run dev`

Runs the app in development mode. Open http://localhost:5173 to view it in the browser.

## `npm run build`

Builds the app for production to the `dist` folder.

## `npm run preview`

Locally preview production build.

## `npm run lint`

Lint using `eslint`.

When running in dev mode using [`npm run dev`](#npm-run-dev) this will not need to be run manually, since `vite-plugin-checker` will lint and typecheck on hot reload.

## `npm run typecheck`

Typecheck using `tsc`.

When running in dev mode using [`npm run dev`](#npm-run-dev) this will not need to be run manually, since `vite-plugin-checker` will lint and typecheck on hot reload.

## `npm test`/`npm run test`

Run tests using `vitest`.

## `npm run test:ui`

Run tests with browser-based interactive UI.

# Directory Structure

- `index.html`: Main entry point. See [`index.html` and Project Root](https://vitejs.dev/guide/#index-html-and-project-root) for more info.
- `test/`: Test files.
- `public/`: Assets that will be served at root path `/`. Cannot be imported from JavaScript. See [The `public` Directory](https://vitejs.dev/guide/assets.html#the-public-directory) for more info.
- `src/assets`: Assets to be imported from JavaScript. Importing these assets will return the resolved public URL when served. See [Importing Asset as URL](https://vitejs.dev/guide/assets.html#importing-asset-as-url) for more info.
- `src/api`: Type definitions and functions for retrieving ECS data from the API.
- `src/db`: IndexedDB schema definition and database access functions.
- `src/components`: shared UI components such as buttons, icons, etc.
- `src/main.tsx`: Main React entry point.
- `src/`: Top-level components.

# Recommended VSCode Extensions

## [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Format code on save using `.prettierrc` config.

## [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

Autocomplete, syntax highlighting, and linting for Tailwind CSS classes.

# Documentation for Dependencies

## Tooling

- [Typescript](https://www.typescriptlang.org/docs/)
  - Configuration files:
    - `tsconfig.json`
    - `tsconfig.node.json`
- [Vite](https://vitejs.dev/guide/)
  - Configuration file: `vite.config.ts`
- [Vitest](https://vitest.dev/guide/)
- [Vitest UI](https://vitest.dev/guide/ui.html)
- [ESLint](https://eslint.org/docs/latest/)
  - Configuration files:
    - `.eslintignore`
    - `.eslintrc`
- [TSLint](https://palantir.github.io/tslint/rules/)
- [Prettier](https://prettier.io/docs/en/index.html)
  - Configuration file: `.prettierrc`

## CSS

- [Tailwind CSS](https://tailwindcss.com/docs/installation)
  - Configuration file: `tailwind.config.js`

## React

- [React](https://react.dev/reference/react)
- [React Select](https://react-select.com/home)

## Database

- [idb](https://github.com/jakearchibald/idb)
