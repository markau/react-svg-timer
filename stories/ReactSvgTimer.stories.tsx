import React from 'react';
import { ReactSvgTimer } from '../src';

export default {
  title: 'Welcome',
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const Default = (props?: Partial<any>) =>
<div style={{ width: 400 }}>
<ReactSvgTimer timerCount={20} />
</div>
;
