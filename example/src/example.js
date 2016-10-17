var React = require('react');
var ReactDOM = require('react-dom');
var ReactSvgTimer = require('react-svg-timer');
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

class App extends React.Component {

	constructor(props, context) {
		super(props, context);

		// To keep track of the milliseconds elapsed
		this.timer = 0;

		this.state = {
			resetRequested: false,
			timerisComplete: false,
			displayCountdown: true,
			displayColorPicker: false,
			showMilliseconds: false,
		    color: {
		      r: '112',
		      g: '230',
		      b: '80',
		      a: '1',
		    },

		};

		// Bind event handlers
		this.timerValue = this.timerValue.bind(this);
		this.onComplete = this.onComplete.bind(this);
		this.onReset = this.onReset.bind(this);
		this.onResetRequest = this.onResetRequest.bind(this);
		this.optionTimerText = this.optionTimerText.bind(this);
		this.optionLogCount = this.optionLogCount.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);
	};

	handleClick() {
    this.setState({
			displayColorPicker: !this.state.displayColorPicker
		});
  }

  handleClose() {
    this.setState({
			displayColorPicker: false
		});
  }

  handleChange(color) {
    this.setState({
			color: color.rgb
		});
  }

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
		if (this.state.showMilliseconds) {
			console.log(value);
		}
  }

  onResetRequest() {
    this.setState({
      resetRequested: true
    });
    this.timer = 0;
  }

	optionTimerText() {
    this.setState({
      displayCountdown: !this.state.displayCountdown
    });
  }

	optionLogCount() {
		this.setState({
      showMilliseconds: !this.state.showMilliseconds
    });
	}

	render () {

		const styles = reactCSS({
			'default': {
				color: {
					width: '36px',
					height: '14px',
					borderRadius: '2px',
					background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
				},
				swatch: {
					padding: '5px',
					background: '#fff',
					borderRadius: '1px',
					boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
					display: 'inline-block',
					cursor: 'pointer',
					marginRight: '10px'
				},
				popover: {
					position: 'absolute',
					zIndex: '2',
				},
				cover: {
					position: 'fixed',
					top: '0px',
					right: '0px',
					bottom: '0px',
					left: '0px',
				},
				formElement: {
					padding: 10,
					textAlign: 'left'
				},
				resetButton: {
					padding: 10,
				},
			},
		});

		return (
			<div className="timerContainer">

				<div style={styles.formElement}>
					<div style={ styles.swatch } onClick={ this.handleClick }>
						<div style={ styles.color } />
					</div>
					{ this.state.displayColorPicker ? <div style={ styles.popover }>
						<div style={ styles.cover } onClick={ this.handleClose }/>
						<SketchPicker color={ this.state.color } onChange={ this.handleChange } />
					</div> : null }
					Timer colour
				</div>

				<div style={styles.formElement}>
					<input defaultChecked={this.state.displayCountdown} onClick={this.optionTimerText} type="checkbox" />
					Show countdown
				</div>
				<div style={styles.formElement}>
					<input defaultChecked={this.state.showMilliseconds} onClick={this.optionLogCount} type="checkbox" />
					Log elapsed milliseconds to console
				</div>
				<div style={styles.formElement}>
					<button style={styles.resetButton} onClick={this.onResetRequest}>Reset timer</button>
				</div>

				<ReactSvgTimer
					timerCount={6}
					countdownColour={`rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`}
					resetTimer={this.onReset}
					completeTimer={this.onComplete}
					resetTimerRequested={this.state.resetRequested}
					timerDuration={this.timerValue}
					displayCountdown={this.state.displayCountdown}
				/>
			</div>
		);
	}
};

ReactDOM.render(<App />, document.getElementById('app'));
