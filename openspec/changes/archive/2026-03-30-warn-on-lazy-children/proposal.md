## Why

当传入 `React.lazy()` 创建的懒加载组件作为 `Activity`/`Offscreen` 的 `children` 时，由于 custom Repeater 实现依赖 Suspense 机制，懒组件首次渲染时会触发额外的 Suspense 边界，导致警告或行为异常。在开发模式下提供明确警告，可以帮助开发者快速定位问题，避免困惑。

## What Changes

- 新增开发模式下的警告机制：当 `children` 为 `React.LazyComponent`（通过 `React.lazy()` 创建）时，在控制台输出警告信息，提示用户可能的行为问题

## Capabilities

### New Capabilities

- `lazy-children-warning`: 在开发模式下检测 `children` 是否为懒加载组件，如果是则输出警告，提示用户可能导致的问题及建议的替代方案

### Modified Capabilities

- 无

## Impact

- 影响的代码：`src/Activity.tsx`（主组件入口）
- 影响的 API：`Activity` / `Offscreen` 组件
- 开发体验：开发者在传入懒组件时会看到友好提示，而非隐晦的 Suspense 警告