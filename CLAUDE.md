# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

@ivliu/react-offscreen is a React library that hides components without unmounting them, preserving component state. It is based on React's Suspense mechanism and provides an Activity component (compatible with React's experimental/unstable_Activity).

## Common Commands

```bash
pnpm build        # Build the library using rslib
pnpm size         # Check bundle size limits
pnpm analyze      # Analyze bundle size details
```

## Architecture

The library has two implementation paths:

1. **Native Activity**: When React supports `Activity` natively (React 19+), it uses the native implementation
2. **Custom Repeater**: Falls back to a custom implementation using Suspense + promises to simulate hidden state

### Core Files

- `src/Activity.tsx` - Main component entry (also exports deprecated `Offscreen` alias)
- `src/Repeater.tsx` - Custom fallback implementation using Suspense + promise-based suspension
- `src/index.ts` - Exports Activity, Offscreen, ActivityMode, OffscreenMode types
- `src/registry.tsx` - Provides component registry for @json-render/react integration

### How the custom Repeater works

When `mode="hidden"`, the component throws a promise. This causes Suspense to catch it and hide the content. When `mode="visible"`, the promise resolves, allowing content to render. This approach preserves component state while hidden.

## Build Output

- `dist/cjs/` - CommonJS format
- `dist/esm/` - ES modules format
- Both include TypeScript definitions (`.d.ts`)
