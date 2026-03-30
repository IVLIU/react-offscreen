## Context

`src/Activity.tsx` 中的 `isLazyComponent` 函数用于检测 React.lazy() 创建的懒加载组件，当检测到时会发出警告。当前实现仅处理单个 children 节点的情况，对数组类型直接返回 false。

在实际使用场景中，用户可能会传入数组形式的 children，例如：
```jsx
<Activity mode="hidden">
  {[LazyComponent1, <LazyComponent2 />]}
</Activity>
```

当前代码无法检测这种情况并发出警告，可能导致用户不了解潜在问题。

## Goals / Non-Goals

**Goals:**
- 扩展 `isLazyComponent` 函数，支持递归检测数组中的 lazy component
- 扩展 `warnOnLazyChildren` 函数，对数组中的 lazy component 发出警告

**Non-Goals:**
- 不改变对单个 React 元素的检测逻辑
- 不修改警告消息的内容（仅扩展检测范围）

## Decisions

修改 `src/Activity.tsx` 中两个函数：

1. **`isLazyComponent` 函数**：
   - 在检测到是数组时，递归检查数组中的每个元素
   - 遇到 lazy component 时返回 true
   - 所有元素都不是 lazy component 时返回 false

2. **`warnOnLazyChildren` 函数**：
   - 保持现有逻辑，`isLazyComponent` 扩展后会自动覆盖数组情况

## Risks / Trade-offs

- 递归检测数组可能带来轻微性能开销，但数组层级通常较浅，影响可忽略
- 使用 `Array.isArray` 扩展检测，不会影响现有的单元素检测逻辑