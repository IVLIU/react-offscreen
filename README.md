# react-offscreen

keep-alive like for react

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