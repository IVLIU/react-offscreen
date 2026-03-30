## Why

`isLazyComponent` 函数目前对 `children` 为数组的情况直接返回 `false`，这意味着当 `children` 是一个包含 lazy component 的数组时，无法检测到并发出警告。在实际使用中，用户可能会传入数组形式的 children，其中某个元素是 lazy component，需要发出警告提醒用户。

## What Changes

- 扩展 `isLazyComponent` 函数，使其能够递归检测数组中的 lazy component
- 扩展 `warnOnLazyChildren` 函数，对数组中的 lazy component 也发出警告

## Capabilities

### New Capabilities
- `lazy-component-array-detection`: 检测 children 数组中是否存在 React.lazy() 创建的懒加载组件，并在检测到时发出警告

### Modified Capabilities
<!-- 无 -->

## Impact

- 修改 `src/Activity.tsx` 中的 `isLazyComponent` 和 `warnOnLazyChildren` 函数