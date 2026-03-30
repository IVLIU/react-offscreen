## Context

`Activity` / `Offscreen` 组件在 custom Repeater 模式下依赖 React Suspense 机制实现隐藏状态保持。当传入 `React.lazy()` 创建的懒加载组件时，会触发额外的 Suspense 行为，导致警告或非预期表现。开发模式下需要提前检测并警告用户。

## Goals / Non-Goals

**Goals:**
- 在开发模式下检测 `children` 是否为 `React.LazyComponent`
- 输出一致的控制台警告信息（中英文双语）
- 提示用户可能导致的问题及替代方案

**Non-Goals:**
- 不修复懒组件与 Activity 组合使用的问题（这需要更复杂的架构调整）
- 不在生产环境引入任何警告逻辑
- 不影响现有功能的兼容性

## Decisions

1. **使用 `typeof children === 'object' && children !== null && '$$typeof' in children` 检测 LazyComponent**

   React LazyComponent 的 `$$typeof` 为 `Symbol.For('react.lazy')`，通过检测该属性可判断是否为懒组件。

2. **警告仅在非生产环境输出**

   使用 `process.env.NODE_ENV !== 'production'` 条件判断，确保生产环境零开销。

3. **警告位置在 Activity 组件内部**

   在 `NativeActivity` 分支或 `Repeater` 分支之前检测，保持逻辑集中。

## Risks / Trade-offs

- [风险] React 内部符号可能随版本变化 → 回退方案：如果检测失败，直接跳过，不影响正常功能
- [风险] 用户可能在警告后仍继续使用 → 警告仅提示，不阻断行为，保持向后兼容