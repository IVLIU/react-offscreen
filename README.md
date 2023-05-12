# react-offscreen

keep-alive的react版本，它基于Suspense实现，通过它我们可以实现在切换组件时不销毁组件，以达到状态保持的目的。

## 使用方法

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Offscreen } from 'react-offscreen';

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

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

## unstable hooks
我们实验性的支持了激活 失活的hooks，但是它的执行时机是晚于Effect的，这与react未来规划不符，所以我们不准备将其合并至主分支，有兴趣的可以自行fork使用。
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Offscreen, useActivated } from 'react-offscreen';

const Count = () => {
  const [count, setCount] = React.useState(0);

  useActivated(() => {
    console.log('activated');
    return () => {
      console.log('deactivated')
    }
  });

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

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

## 注意
仅支持react 17版本及以上