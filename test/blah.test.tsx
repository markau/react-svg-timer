import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as ReactSvgTimer } from '../stories/ReactSvgTimer.stories';

describe('ReactSvgTimer', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ReactSvgTimer timerCount={5} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
