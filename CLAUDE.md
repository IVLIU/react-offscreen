# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

@ivliu/react-offscreen is a React library that hides components without unmounting them, preserving component state. It is based on React's Suspense mechanism and provides an Activity component (compatible with React's experimental/unstable_Activity). Supports React >=17.

## Common Commands

```bash
pnpm build        # Build the library using rslib
pnpm size         # Check bundle size limits
pnpm analyze      # Analyze bundle size details
```

## Architecture

The library has two implementation paths:

1. **Native Activity**: When React exposes `Activity` (React 19 stable) or `unstable_Activity` (React 18 experimental), it uses the native implementation
2. **Custom Repeater**: Falls back to a custom implementation using Suspense + promises to simulate hidden state

### Core Files

- `src/Activity.tsx` - Main component entry (also exports deprecated `Offscreen` alias). Handles native vs fallback path selection and shows warnings for lazy-component misuse.
- `src/Repeater.tsx` - Custom fallback implementation using Suspense + promise-based suspension
- `src/index.ts` - Public API exports: Activity, Offscreen, ActivityMode, OffscreenMode types
- `src/registry.tsx` - Component registry for @json-render/react, enabling JSON-driven UI rendering with Activity/Offscreen
- `src/type.ts` - Type definitions: `ActivityMode`, `OffscreenMode` (deprecated alias), `IProps`
- `src/createPromise.ts` - Promise.withResolvers polyfill for older environments
- `src/canUseDOM.ts` - Browser environment detection guard

### How the custom Repeater works

When `mode="hidden"`, the component throws a promise. This causes Suspense to catch it and hide the content. When `mode="visible"`, the promise resolves, allowing content to render. This approach preserves component state while hidden.

## Build

Built with [rslib](https://lib.rsbuild.dev/) using `@rsbuild/plugin-react` (SWC compilation, automatic JSX runtime). Config in `rslib.config.ts`.

`bundle: false` keeps output files as individual modules (not bundled), tree-shakeable by consumers.

### Output

- `dist/cjs/` - CommonJS format
- `dist/esm/` - ES modules format
- Both include TypeScript definitions (`.d.ts`)

### Dependencies

- `@json-render/core` and `@json-render/react` — JSON-driven UI rendering (used by `registry.tsx`)
- `zod` — schema validation (used by @json-render integration)
