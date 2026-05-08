## Why

TypeScript 5.9.x is the last release in the 5.x line. Upgrading to TypeScript 6 keeps the project current with the latest language features, type-checking improvements, and performance enhancements. This is an infrastructure maintenance task that should be done before the next major dependency accumulates.

## What Changes

- Upgrade `typescript` from `^5.9.2` to `^6.0.0` in devDependencies
- Update `tsconfig.json` for TypeScript 6 compatibility (e.g., `moduleResolution` defaults, deprecated options)
- Update `typescript-eslint` if needed for TypeScript 6 compatibility
- Verify build output (CJS + ESM + declarations) remains correct under TypeScript 6
- Verify bundle size remains within limits

## Capabilities

### New Capabilities

<!-- No new user-facing capabilities — this is an infrastructure change. -->

### Modified Capabilities

<!-- No existing capability requirements change — this is a build tool upgrade. -->

## Impact

- `package.json` — `typescript`, `typescript-eslint` versions
- `tsconfig.json` — compiler option compatibility with TS 6
- Build pipeline (`rslib build`) — must verify CJS + ESM output integrity
- Bundle size — must not regress beyond current 10 KB limits
