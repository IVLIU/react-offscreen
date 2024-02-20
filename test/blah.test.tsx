import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Activity } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Activity mode="visible">children</Activity>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
