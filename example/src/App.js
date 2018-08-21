import React, { Component } from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

import ReactSvgTimer from 'react-svg-timer'

export default class App extends Component {

  constructor(props, context) {
		super(props, context);

		// To keep track of the milliseconds elapsed
		this.timer = 0;

		this.state = {
			resetRequested: false,
			timerisComplete: false,
			displayCountdown: true,
			showMilliseconds: false,
			displayCountdownColorPicker: false,
			displayInnerColorPicker: false,
			displayOuterColorPicker: false,
	    countdownColor: {
	      r: '65',
	      g: '182',
	      b: '224',
	      a: '1',
	    },
			innerColor: {
				r: '255',
				g: '255',
				b: '255',
	      a: '1',
	    },
			outerColor: {
				r: '40',
				g: '40',
				b: '40',
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

		this.handleCountdownColorClick = this.handleCountdownColorClick.bind(this);
		this.handleCountdownColorClose = this.handleCountdownColorClose.bind(this);
		this.handleCountdownColorChange = this.handleCountdownColorChange.bind(this);

		this.handleInnerColorClick = this.handleInnerColorClick.bind(this);
		this.handleInnerColorClose = this.handleInnerColorClose.bind(this);
		this.handleInnerColorChange = this.handleInnerColorChange.bind(this);

		this.handleOuterColorClick = this.handleOuterColorClick.bind(this);
		this.handleOuterColorClose = this.handleOuterColorClose.bind(this);
		this.handleOuterColorChange = this.handleOuterColorChange.bind(this);
	};

	handleCountdownColorClick() {
    this.setState({
			displayCountdownColorPicker: !this.state.displayCountdownColorPicker
		});
  }
  handleCountdownColorClose() {
    this.setState({
			displayCountdownColorPicker: false
		});
  }
  handleCountdownColorChange(color) {
    this.setState({
			countdownColor: color.rgb
		});
  }

	handleInnerColorClick() {
		this.setState({
			displayInnerColorPicker: !this.state.displayInnerColorPicker
		});
	}
	handleInnerColorClose() {
		this.setState({
			displayInnerColorPicker: false
		});
	}
	handleInnerColorChange(color) {
		this.setState({
			innerColor: color.rgb
		});
	}

	handleOuterColorClick() {
		this.setState({
			displayOuterColorPicker: !this.state.displayOuterColorPicker
		});
	}
	handleOuterColorClose() {
		this.setState({
			displayOuterColorPicker: false
		});
	}
	handleOuterColorChange(color) {
		this.setState({
			outerColor: color.rgb
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
				countdownColor: {
					width: '36px',
					height: '14px',
					borderRadius: '2px',
					background: `rgba(${ this.state.countdownColor.r }, ${ this.state.countdownColor.g }, ${ this.state.countdownColor.b }, ${ this.state.countdownColor.a })`,
				},
				outerColor: {
					width: '36px',
					height: '14px',
					borderRadius: '2px',
					background: `rgba(${ this.state.outerColor.r }, ${ this.state.outerColor.g }, ${ this.state.outerColor.b }, ${ this.state.outerColor.a })`,
				},
				innerColor: {
					width: '36px',
					height: '14px',
					borderRadius: '2px',
					background: `rgba(${ this.state.innerColor.r }, ${ this.state.innerColor.g }, ${ this.state.innerColor.b }, ${ this.state.innerColor.a })`,
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
					width: '90%',
				},
				heading: {
					padding: 5,
					paddingLeft: 15,
					fontSize: 22,
				},
			},
		});

		return (

			<div className="columnsContainer">
				<div className="timerContainer">

					<ReactSvgTimer
						timerCount={6}
						countdownColor={`rgba(${ this.state.countdownColor.r }, ${ this.state.countdownColor.g }, ${ this.state.countdownColor.b }, ${ this.state.countdownColor.a })`}
						innerColor={`rgba(${ this.state.innerColor.r }, ${ this.state.innerColor.g }, ${ this.state.innerColor.b }, ${ this.state.innerColor.a })`}
						outerColor={`rgba(${ this.state.outerColor.r }, ${ this.state.outerColor.g }, ${ this.state.outerColor.b }, ${ this.state.outerColor.a })`}
						resetTimer={this.onReset}
						completeTimer={this.onComplete}
						resetTimerRequested={this.state.resetRequested}
						timerDuration={this.timerValue}
						displayCountdown={this.state.displayCountdown}
					/>
				</div>

				<div className="controlsContainer">

					<p style={styles.heading}>Play with some props:</p>

					<div style={styles.formElement}>
						<button style={styles.resetButton} onClick={this.onResetRequest}>Reset timer</button>
					</div>

					<div style={styles.formElement}>
						<div style={ styles.swatch } onClick={ this.handleCountdownColorClick }>
							<div style={ styles.countdownColor } />
						</div>
						{ this.state.displayCountdownColorPicker ? <div style={ styles.popover }>
							<div style={ styles.cover } onClick={ this.handleCountdownColorClose }/>
							<SketchPicker color={ this.state.countdownColor } onChange={ this.handleCountdownColorChange } />
						</div> : null }
						Countdown color
					</div>

					<div style={styles.formElement}>
						<div style={ styles.swatch } onClick={ this.handleOuterColorClick }>
							<div style={ styles.outerColor } />
						</div>
						{ this.state.displayOuterColorPicker ? <div style={ styles.popover }>
							<div style={ styles.cover } onClick={ this.handleOuterColorClose }/>
							<SketchPicker color={ this.state.outerColor } onChange={ this.handleOuterColorChange } />
						</div> : null }
						Outer color
					</div>

					<div style={styles.formElement}>
						<div style={ styles.swatch } onClick={ this.handleInnerColorClick }>
							<div style={ styles.innerColor } />
						</div>
						{ this.state.displayInnerColorPicker ? <div style={ styles.popover }>
							<div style={ styles.cover } onClick={ this.handleInnerColorClose }/>
							<SketchPicker color={ this.state.innerColor } onChange={ this.handleInnerColorChange } />
						</div> : null }
						Inner color
					</div>

					<div style={styles.formElement}>
						<input defaultChecked={this.state.displayCountdown} onClick={this.optionTimerText} type="checkbox" />
						Show countdown
					</div>
					<div style={styles.formElement}>
						<input defaultChecked={this.state.showMilliseconds} onClick={this.optionLogCount} type="checkbox" />
						Log elapsed milliseconds to console
					</div>

				</div>

				</div>

		);
	}

}
