# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Commands

```sh
pnpm build          # TypeScript compile to out/
pnpm lint           # ESLint on src/
pnpm test           # Run vitest (unit tests only, no VS Code host)
pnpm verify         # lint + build + test

# Run a single test file
pnpm vitest run src/getSortFn.spec.ts

# Watch mode
pnpm watch                           # vitest watch (all tests)
pnpm vitest src/getSortFn.spec.ts    # vitest watch for one file

# Packaging
pnpm package        # produces .vsix (uses esbuild, minified)
```

`pnpm test` runs vitest directly — no VS Code extension host required. The old Mocha-based runner (`test:old`) is kept for reference but superseded.

## Architecture

Three source files in `src/`:

- **extension.ts** — VS Code entry point. Registers the `editor.sortPackageJson` command and a `CodeActionProvider` that surfaces it as a code action (`source.sortPackageJson`) when the file is `package.json`.
- **sortPackageJson.ts** — Command implementation. Reads the active editor's document, calls `getSortFn()`, applies sorting, then replaces the full document text preserving trailing newlines and honouring the editor's indentation settings.
- **getSortFn.ts** — Resolver. Tries to load `sort-package-json` from the **user's workspace** (so they get their own version if they have it as a dependency), walking up with `read-pkg-up`. Falls back to the bundled copy bundled into the extension.

### Build pipeline

- **Development**: `tsc` compiles to `out/` with source maps; tests run directly against these `.js` files via vitest.
- **Production**: `esbuild` bundles `src/extension.ts` → `out/main.js` (`--external:vscode`, CJS format). The `vscode:prepublish` script adds `--minify`.

### Testing

Tests live alongside source as `*.spec.ts`. Vitest runs in the Node environment with globals enabled — no test setup file needed. Currently only `getSortFn.spec.ts` exists; it verifies the fallback-to-bundled path.
