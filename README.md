# React SVG Timer

[![NPM](https://img.shields.io/npm/v/react-svg-timer.svg)](https://www.npmjs.com/package/react-svg-timer)

A React component to provide an SVG-based timer button with visual feedback of elapsed time.

This is an improved iteration of previous projects:

* [Angular 1 directive](https://github.com/markau/angular-svg-timer)
* [Older React version](https://github.com/markau/react-svg-timer#v1)

All have their foundation in [this fiddle](https://jsfiddle.net/prafuitu/xRmGV/).

## Demo

Demo: [markau.github.io/react-svg-timer](http://markau.github.io/react-svg-timer/)

## Installation

`yarn add react-svg-timer`
`npm install react-svg-timer`

## Usage

The minimum declaration is:

```
import ReactSvgTimer from 'react-svg-timer';

<ReactSvgTimer timerCount={# seconds}/>
```

### Properties

The component can take additional, optional props:

* `countdownColor`: *string*: the color of the countdown ring. Type can be hex, rgb, rgba - whatever an SVG can use.
* `innerColor`: *string*: the color of the inner circle ring.
* `outerColor`: *string*: the color of the outer ring.
* `resetTimerRequested`: *bool*: Whether the user has requested the timer be reset.
* `resetTimer`: *func*: A callback function to further handle the timer reset event.
* `completeTimer`: *bool*: Indicates whether the timer has reached the desired time.
* `timerDuration`: *int*: The elapsed duration in milliseconds.
* `displayCountdown`: *bool*: Shows/hides the numerical countdown.

A more complete implementation could therefore be:

````

// To keep track of the milliseconds elapsed
this.timer = 0;

this.state = {
  resetRequested: false,
  timerIsComplete: false,
	logMilliseconds: true,
};

onComplete(status) {
  this.setState({
    timerIsComplete: status
  });
}

onReset() {
  this.setState({
    resetRequested: false
  });
}

timerValue(value) {
  this.timer = value;
  if (this.state.logMilliseconds) {
    console.log(value);
  }
}

onResetRequest() {
  this.setState({
    resetRequested: true
  });
  this.timer = 0;
}

render () {
  return (

    <ReactSvgTimer
      timerCount={6}
      countdownColor="#00ffa8"
      innerColor="#fff"
      outerColor="#000"
      resetTimer={this.onReset}
      completeTimer={this.onComplete}
      resetTimerRequested={this.state.resetRequested}
      timerDuration={this.timerValue}
      displayCountdown={this.state.displayCountdown}
    />

  );
}

````

The optional props are designed to provide flexibility for implementation. You can use the timer as a discrete component, and just listen for the `timerComplete` callback. Alternatively, for example, you could choose to hide the numerical display countdown with `displayCountdown={false}`, and use the `timerDuration` callback to provide your own numerical countdown.

## Development

Built with [create-react-library](https://www.npmjs.com/package/create-react-library) check that project to see how to build and run this module locally.

## License

MIT © [markau](https://github.com/markau)
