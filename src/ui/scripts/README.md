UI Build Scripts
==

This directory contains scripts used in the UI module build process.

Build Flow
--

```
1. ui:css:generate     → Generate CSS entry file
2. ui:tsc              → TypeScript → JavaScript conversion
3. ui:fix-output       → Fix directory structure
4. ui:remove-css-imports → Remove CSS imports
5. ui:css:build        → CSS processing (bundle & minify)
6. ui:css:build:without-dark → Generate CSS without dark mode
7. ui:use-client       → Add 'use client' directive
```

Maintenance Notes
--

- These scripts are automatically executed as part of the build process
- If you change `rootDir` or `outDir` in tsconfig.json, `fix-ui-build-output.js` needs adjustment
- If you change CSS processing methods, review `generate-css-entry.js` and `remove-css-imports.js`
- In environments other than React Server Components, you can skip executing `add-use-client.js`

Script Overview
--

1. generate-css-entry.js
1. fix-ui-build-output.js
1. remove-css-imports.js
1. add-use-client.js
1. postcss-remove-dark.js

### generate-css-entry.js

**Role**: Automatic generation of CSS entry file

**Processing**:
- Searches for all CSS files under `src/ui/`
- Generates `src/ui/index.css` that imports them with `@import`
- Places tokens.css first (for priority)

**Why needed**:
- TypeScript compiler (tsc) does not process CSS files
- An entry point is needed for PostCSS to bundle CSS
- Avoids manual maintenance and automatically includes all CSS files

**Execution timing**: `ui:css:generate` (before tsc)

### fix-ui-build-output.js

**Role**: Fix directory structure of TypeScript build output

**Processing**:
- Move `dist/ui/esm/ui/*` → `dist/ui/esm/`
- Remove `dist/ui/esm/exporter/` (unwanted output)
- Move `dist/ui/ui/*` → `dist/ui/` (type definitions)
- Remove `dist/ui/exporter/` (unwanted type definitions)

**Why needed**:
- tsconfig.json specifies `rootDir: ".."` (src/) and `include: ["./**/*"]` (ui/)
- Since UI imports exporter, tsc outputs both directories
- Expected output: `dist/ui/esm/` and `dist/ui/`
- Actual output: `dist/ui/esm/ui/` and `dist/ui/ui/`, `dist/ui/esm/exporter/` and `dist/ui/exporter/`

**Execution timing**: `ui:fix-output` (immediately after tsc)

### remove-css-imports.js

**Role**: Remove CSS import statements from compiled JavaScript files

**Processing**:
- Scan all `.js` files under `dist/ui/esm/`
- Remove lines like `import './foo.css'`

**Why needed**:
- TypeScript source code contains CSS imports (e.g., `import './Component.css'`)
- tsc outputs these import statements as-is to JavaScript
- CSS is bundled separately via PostCSS and provided as `dist/ui/index.css`
- CSS imports in JavaScript files cause runtime errors
- Prevents "file not found" errors in environments without bundlers like Next.js

**Execution timing**: `ui:remove-css-imports` (after fix-output, before CSS processing)

### add-use-client.js

**Role**: Add 'use client' directive for React Server Components

**Processing**:
- Process all `.js` files under `dist/ui/esm/`
- Add `'use client';` at the beginning of files (skip if already present)

**Why needed**:
- Next.js App Router uses React Server Components (RSC) by default
- All UI components run on client side (use state management, event handlers)
- Without 'use client' directive, Next.js throws errors
- Writing it in TypeScript source files may trigger type checking or build warnings
- Adding it to JavaScript files after build is safest

**Execution timing**: `ui:use-client` (at the end of build process)

### postcss-remove-dark.js

**Role**: PostCSS plugin - Remove dark mode CSS

**Processing**:
- Detect `@media (prefers-color-scheme: ...)` media queries
- Remove matching rules

**Why needed**:
- Reduce file size for users who only want light mode
- Used to generate `dist/ui/index-without-dark.css`
- Provide two versions: normal (`index.css`) and light-mode-only

**Used in**: `postcss.config.without-dark.js`
