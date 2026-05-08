## Context

The project currently uses TypeScript `^5.9.2` with `rslib` (`@rslib/core ^0.13.2`) as its build tool. TypeScript is used for type checking and declaration file generation (`.d.ts`) — actual transpilation is delegated to rslib's internal toolchain (SWC-based). The `tsconfig.json` uses `moduleResolution: "node"` with `module: "esnext"` and outputs dual-format bundles (ESM + CJS) via two rslib lib configs.

TypeScript 6 deprecates several legacy `moduleResolution` values and changes some default behaviors. Since we use rslib (not `tsc`) for compilation, the impact is scoped to type checking and declaration generation.

## Goals / Non-Goals

**Goals:**
- Upgrade `typescript` devDependency to `^6.0.0`
- Make `tsconfig.json` compatible with TypeScript 6 (no deprecated/removed options that cause errors)
- Update `typescript-eslint` to a version compatible with TypeScript 6
- Verify `rslib build` passes and produces correct output
- Verify bundle size stays within 10 KB limits

**Non-Goals:**
- Changing `react` / `react-dom` versions
- Switching from rslib to another build tool
- Enabling new strictness flags beyond what's compatible
- Rewriting source code to use new TypeScript 6 language features

## Decisions

### moduleResolution: Keep `node` → migrate to `bundler`

`moduleResolution: "node"` may be aliased or deprecated in TypeScript 6. Since rslib bundles the output and we target both ESM and CJS consumers, `moduleResolution: "bundler"` is the most appropriate choice — it handles package.json `exports` correctly without requiring `.js` extensions in imports.

**Alternative considered**: `node16`/`nodenext` — but these require explicit file extensions (`.js`) in relative imports, which is incompatible with the current codebase convention and unnecessary under a bundler.

### typescript-eslint: Upgrade in lockstep

`typescript-eslint ^8.43.0` should be checked for TS 6 compatibility. It may need a minor version bump. We'll upgrade to the latest `^8.x` that supports TS 6.

### No source code changes

TypeScript 6 may introduce new errors for existing code patterns. If `tsc --noEmit` reports new errors, we'll fix them as needed — but the scope is correctness fixes, not refactoring.

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| TypeScript 6 release version not yet available (only beta/rc) | Verify available npm version before upgrading; if only rc, pin to exact rc version |
| `moduleResolution: "bundler"` may surface type errors that `node` hid | Run `tsc --noEmit` after the change and fix any issues |
| rslib may not yet support TypeScript 6 for `dts: true` | If rslib fails, revert and wait for rslib compatibility update |
| typescript-eslint version constraint | Check peer dependency ranges; upgrade if needed |

## Migration Plan

1. Update `package.json`: bump `typescript`, check `typescript-eslint` compatibility
2. Update `tsconfig.json`: change `moduleResolution` to `bundler`, review other options
3. Run `pnpm install`
4. Run `tsc --noEmit` to check for type errors
5. Run `pnpm build` to verify rslib output
6. Run `pnpm size` to verify bundle size limits

**Rollback**: Revert `package.json` and `tsconfig.json` changes, run `pnpm install`.

## Open Questions

- Is TypeScript 6 available as a stable release or only rc? (Check npm at implementation time)
- Does the current `rslib ^0.13.2` work with TS 6's declaration emit? (Test during implementation)
