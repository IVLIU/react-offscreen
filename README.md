# react-offscreen(activity)

![NPM Version](https://img.shields.io/npm/v/%40ivliu%2Freact-offscreen)
![License](https://img.shields.io/badge/license-MIT-yellow)

react-offscreen can hide components without uninstalling them

## Features

- based on Suspense
- minzip only 1.2kb
- good performance
- react full context support

## Installation

```bash
npm install @ivliu/react-offscreen
yarn add @ivliu/react-offscreen
pnpm add @ivliu/react-offscreen
```

## Examples

### Basic usage

```typescript
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Activity } from '@ivliu/react-offscreen';

const Counter = () => {
  const [count, setCount] = useState(0);

  return <p onClick={() => setCount(count + 1)}>{count}</p>;
};

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(!open)}>{open}</button>
      <Activity mode={open ? 'visible' : 'hidden'}>
        <Counter />
      </Activity>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

### Use with createPortal

```typescript
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createPortal } from 'react-dom';
import { Activity } from '@ivliu/react-offscreen';

const Counter = () => {
  const [count, setCount] = useState(0);

  return createPortal(
    <button type="button" onClick={() => setCount(count + 1)}>count is {count}</button>,
    document.body,
  );
};

const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setVisible(!open)}>{open}</button>
      <Activity mode={open ? 'visible' : 'hidden'}>
        <Counter />
      </Activity>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

### Use with React.lazy

> Since Activity is implemented based on Suspense, please pay attention to placing the Suspense component under the Activity component when using it, otherwise it may cause the problem that the fallback cannot be displayed normally.

```typescript
import { useState, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Activity } from '@ivliu/react-offscreen';

const LazyCount = lazy(() => import('./Count')); 

const Count = () => {
  const [count, setCount] = useState(0);

  return <p onClick={() => setCount(count + 1)}>{count}</p>;
};

const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setVisible(!open)}>{open}</button>
      <Activity mode={open ? 'visible' : 'hidden'}>
        <Suspense fallback="loading...">
          <LazyCount />
        </Suspense>
      </Activity>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

## Rename to Activity

> In order to keep pace with the official react, we renamed Offscreen to Activity. At the same time, we will still export Offscreen

```typescript
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Activity, Offscreen } from '@ivliu/react-offscreen';

const Count = () => {
  const [count, setCount] = useState(0);

  return <p onClick={() => setCount(count + 1)}>{count}</p>;
};

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(!open)}>{open}</button>
      <Activity mode={open ? 'visible' : 'hidden'}>
        <Count />
      </Activity>
      <Offscreen mode={open ? 'visible' : 'hidden'}>
        <Count />
      </Offscreen>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

## typescript

```typescript
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Activity } from '@ivliu/react-offscreen';
import type { ActivityMode } from '@ivliu/react-offscreen';

const Count = () => {
  const [count, setCount] = useState(0);

  return <p onClick={() => setCount(count + 1)}>{count}</p>;
};

const App = () => {
  const [mode, setMode] = useState<ActivityMode>('visible');

  return (
    <div>
      <button onClick={() => setMode(mode === 'visible' ? 'hidden' : 'visible')}>{mode}</button>
      <Activity mode={mode}>
        <Count />
      </Activity>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

## unstable hooks

> We provide hook implementation for component activation and deactivation status, but we do not plan to merge it into the main branch. If you need it, please refer to https://github.com/IVLIU/react-offscreen/tree/feat/unstable-hooks

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

## Notice

please use react16.8 and above versions