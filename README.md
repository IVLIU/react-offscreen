# react-offscreen

keep-alive的react版本，它基于Suspense实现，通过它我们可以实现在切换组件时不销毁组件，以达到状态保持的目的。

## 使用方法

```typescript
import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Offscreen } from '../.';

const Count = () => {
  const [count, setCount] = React.useState(0);

  return <p onClick={() => setCount(count + 1)}>{count}</p>;
};

const App = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <button onClick={() => setVisible(!visible)}>{visible}</button>
      <Offscreen mode={visible ? 'visible' : 'hidden'}>
        <Count />
      </Offscreen>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

```

## 注意
仅支持react 17版本及以上