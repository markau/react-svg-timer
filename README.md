# React SVG Timer

A React component to provide an SVG-based timer button with visual feedback of elapsed time.

![CI](https://github.com/markau/react-svg-timer/workflows/CI/badge.svg)

## Demo

[react-svg-timer.coolsmallapps.com](https://react-svg-timer.coolsmallapps.com)

## Installation

```bash
npm install react-svg-timer
```

## Build

This module has been bootstrapped with [tsdx](https://github.com/palmerhq/tsdx). Check the documentation there on how to build and run the module.

## Usage

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

```javascript
let [resetRequested, setResetRequested] = useState(false)
let [timerIsComplete, setTimerIsComplete] = useState(false)
let [logMilliseconds, setLogMilliseconds] = useState(true)

onComplete = (status) => {
  setTimerIsComplete(status);
}

onReset = () => {
  setResetRequested(false);
}

timerValue = (value) => {
  if (logMilliseconds) {
    console.log(value);
  }
}

onResetRequest = () => {
  setResetRequested(true);
}

render () {
  return (

    <ReactSvgTimer
      timerCount={6}
      countdownColor="#00ffa8"
      innerColor="#fff"
      outerColor="#000"
      resetTimer={onReset}
      completeTimer={onComplete}
      resetTimerRequested={resetRequested}
      timerDuration={timerValue}
      displayCountdown={displayCountdown}
    />

  );
}

````

The optional props are designed to provide flexibility for implementation. You can use the timer as a discrete component, and just listen for the `timerComplete` callback. Alternatively, for example, you could choose to hide the numerical display countdown with `displayCountdown={false}`, and use the `timerDuration` callback to provide your own numerical countdown.

## License

MIT
