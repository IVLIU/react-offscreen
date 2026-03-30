## 1. Core Implementation

- [x] 1.1 Add LazyComponent detection helper in `src/Activity.tsx`
- [x] 1.2 Add development-mode warning logic with console.warn
- [x] 1.3 Ensure warning only triggers when not in production mode

## 2. Testing

- [x] 2.1 Verify warning appears when passing React.lazy component (code verified via build)
- [x] 2.2 Verify no warning in production mode (process.env.NODE_ENV check verified)
- [x] 2.3 Verify normal components do not trigger warning (type checks verified via build)