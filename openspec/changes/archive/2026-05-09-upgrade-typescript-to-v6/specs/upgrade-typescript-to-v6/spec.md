# Upgrade TypeScript to v6

## ADDED Requirements

<!-- No new capability requirements — this is a build toolchain upgrade with no user-facing behavior changes. -->

### Requirement: TypeScript 6 compatibility

The project SHALL use TypeScript `^6.0.0` as its type checker, with `tsconfig.json` options compatible with TypeScript 6.

#### Scenario: Type checking passes under TypeScript 6

- **WHEN** `tsc --noEmit` is run
- **THEN** no type errors are reported

#### Scenario: Build succeeds under TypeScript 6

- **WHEN** `pnpm build` is run
- **THEN** CJS and ESM output with `.d.ts` declarations are produced successfully

#### Scenario: Bundle size remains within limits

- **WHEN** `pnpm size` is run
- **THEN** both CJS and ESM bundles are ≤ 10 KB each
