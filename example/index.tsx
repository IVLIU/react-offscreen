import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Offscreen } from '../.';

console.log(React.version)

const Count = () => {
  const [count, setCount] = React.useState(0);

  return <p onClick={() => setCount(count + 1)}>{count}</p>;
};

const App = () => {
  const [visible, setVisible] = React.useState(false);
  const [destroy, setDestroy] = React.useState(false);
  return (
    <div>
      <button onClick={() => setVisible(!visible)}>{visible ? 'hidden' : 'show'}</button>
      <button onClick={() => setDestroy(true)}>destroy</button>
      {!destroy && (
        <Offscreen mode={visible ? 'visible' : 'hidden'}>
          <Count />
        </Offscreen>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
