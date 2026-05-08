## 1. Preparation

- [x] 1.1 Check available TypeScript 6 version on npm and determine exact version to install

## 2. Dependency Updates

- [x] 2.1 Update `typescript` to `^6.0.0` in `devDependencies` (pin to exact rc version if not yet stable)
- [x] 2.2 Check `typescript-eslint` compatibility with TypeScript 6 and update if needed
- [x] 2.3 Run `pnpm install` to apply dependency changes

## 3. Configuration Updates

- [x] 3.1 Update `tsconfig.json` — change `moduleResolution` from `"node"` to `"bundler"`
- [x] 3.2 Review and remove any other deprecated TypeScript 6 options if present

## 4. Verification

- [x] 4.1 Run `tsc --noEmit` and fix any type errors introduced by TypeScript 6
- [x] 4.2 Run `pnpm build` and verify CJS + ESM output with `.d.ts` declarations
- [x] 4.3 Run `pnpm size` and verify both bundles stay ≤ 10 KB
- [x] 4.4 Verify the built declarations are correct (check exported types in `dist/cjs/index.d.ts`)
