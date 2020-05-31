import React from 'react';
import { ReactSvgTimer, ITimerProps } from '../src';
import './styles.css';

export default {
  title: 'Welcome',
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const Default = (props?: Partial<ITimerProps>) =>
<div style={{ width: 400 }}>
<ReactSvgTimer {...props} />
</div>
;
