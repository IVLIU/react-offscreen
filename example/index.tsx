import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Offscreen, useActivated } from '../.';

const Count = () => {
  const [count, setCount] = React.useState(0);

  useActivated(() => {
    console.log('activated');
    return () => {
      console.log('deactivated')
    }
  })

  return <p onClick={() => setCount(count + 1)}>{count}</p>;
};

const App = () => {
  const [visible, setVisible] = React.useState(true);
  return (
    <div>
      <button onClick={() => setVisible(!visible)}>{visible ? 'hidden' : 'show'}</button>
      <Offscreen mode={visible ? 'visible' : 'hidden'}>
        <Count />
      </Offscreen>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
