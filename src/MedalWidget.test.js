import React from 'react';
import ReactDOM from 'react-dom';
import MedalWidget from './MedalWidget';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MedalWidget />, div);
  ReactDOM.unmountComponentAtNode(div);
});
