var React = require('react');
var ReactDOM = require('react-dom');
var ReactSvgTimer = require('react-svg-timer');

class App extends React.Component {

	constructor(props, context) {
		super(props, context);

		// To keep track of the milliseconds elapsed
		this.timer = 0;

		this.state = {
			resetRequested: false,
			timerisComplete: false,
		};

		// Bind event handlers
		this.timerValue = this.timerValue.bind(this);
		this.onComplete = this.onComplete.bind(this);
		this.onReset = this.onReset.bind(this);
		this.onResetRequest = this.onResetRequest.bind(this);
	};

  onComplete(status) {
    this.setState({
      timerisComplete: status
    });
  }

  onReset() {
    this.setState({
      resetRequested: false
    });
  }

  timerValue(value) {
    this.timer = value;
    console.log(value);
  }

  onResetRequest() {
    this.setState({
      resetRequested: true
    });
    this.timer = 0;
  }


	render () {
		return (
			<div style={{padding: '20', width : '500', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>
				<button onClick={this.onResetRequest}>Reset timer</button>
				<ReactSvgTimer
					timerCount={6}
					resetTimer={this.onReset}
					completeTimer={this.onComplete}
					resetTimerRequested={this.state.resetRequested}
					timerDuration={this.timerValue}
				/>
			</div>
		);
	}
};

ReactDOM.render(<App />, document.getElementById('app'));
