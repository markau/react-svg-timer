import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactSvgTimer } from '../.';

const App = (props) => {
  return (
    <div style={{ width: 400 }}>
      <ReactSvgTimer {...props} />
    </div>
  );
};

ReactDOM.render(<App timerCount={20} />, document.getElementById('root'));
