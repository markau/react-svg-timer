import React, {PropTypes} from 'react';
import moment from 'moment';
import {Observable} from 'rxjs/Rx';
import TimerSVG from './TimerSVG';

class ReactSvgTimer extends React.Component {

  constructor(props, context) {
    super(props, context);

    let initialCounter = this.props.timerCount;

    // Constants for calculations of the SVG circle
    this.goalTimeMillis = initialCounter * 1000;
    this.degrees = 360 / (initialCounter * 1000);

    /*
    This property stores the Moment.js moment that the timer was started.
    Rather than rely on the observable timout for keeping time (where 1ms
    might not actually be 1ms due to system load etc.), the time is tracked
    with moments.
    */
    this.startDateMoment = null;
    // The milliseconds since the timer was started (without considering pauses)
    this.timerDuration = 0;
    // The "official" milliseconds - excluding time during pauses
    this.elapsedTime = 0;
    // This property will store the Observable for the timer countdown
    this.timerObservable = null;

    /*
    This observable listens for a change in the resetTimerRequested prop.
    It calls the local reset() function to reset local state, and also
    the parent component's callback function to reset parental state.
    */
    this.timerResetObservable = Observable
        .interval(10)
        .subscribe(t => {
            if (this.props.resetTimerRequested) {
              this.reset();
              // Call callback function in parent component
              this.props.resetTimer();
            }
        });

    // Changes to these properties will cause the browser to re-render
    this.state = {
      draw: null, // The SVG draw property
      timerIsRunning: false
    };

    // Start in a 'reset' state
    this.timerisReset = true;

    // Bind event handlers
    this.toggleStart = this.toggleStart.bind(this);
  }

  reset() {
    this.timerisReset = true;
    this.timerDuration = 0;
    this.elapsedTime = 0;
    // Re-render required
    this.setState({
      draw: this.drawCoord(360),
      timerIsRunning: false
    });
    // We don't want multiple instances of the timer hanging around
    if (this.timerObservable) {
        this.timerObservable.unsubscribe();
    }
    // Call the callback function in the parent component to reset state
    this.props.completeTimer(false);
  }

  toggleStart() {
    if (this.state.timerIsRunning) {
      this.pause();
    } else {
      this.start();
    }
  }

  start() {
    /*
    This could be a start from reset state, or simply unpausing.
    */

    // Get the current moment to calculate the elapsed time
    let currentDate = new Date();
    this.startDateMoment = moment(currentDate);

    // If un-pausing, need to reset the elapsedTime property
    // It is no longer zero, but whatever the timer currently shows
    if (!this.timerisReset) {
      this.elapsedTime = this.timerDuration;
    }

      // Prepare for any further unpauses
      this.timerisReset = false;

      // And we're off (again - if this is an un-pause)
      this.setState({
        timerIsRunning: true
      });

      /*
      This observable continues to run indefinitely unless paused or reset.
      It increments the duration, calls this.update() to re-draw the SVG,
      and notifies the parent component via callback props.
      */
      this.timerObservable = Observable
          .interval(1)
          .subscribe(t => {
              // Update the timer duration
              let currentDate = new Date();
              this.timerDuration = this.elapsedTime + moment(currentDate).diff(moment(this.startDateMoment));

              // Update the state and draw another segment in the SVG
              if (this.timerDuration < this.goalTimeMillis) {
                  this.update(this.timerDuration * this.degrees);
              }

              // If the timer has completed, let the parent component know via
              // the callback prop.
              if ((this.timerDuration > this.goalTimeMillis) && !this.timerIsComplete) {
                this.props.completeTimer(true);
                // Ensure any remaining sliver of timer Color is removed
                this.update(359.99);
              }

              // Inform the parent component of the current timer duration
              this.props.timerDuration(this.timerDuration);
          });
  }

  pause() {
    this.setState({
      timerIsRunning: false
    });
    // We don't want multiple timer objects floating around, so uninstantiate it.
    // If un-paused, a new observable will be instantiated.
    if (this.timerObservable) {
        this.timerObservable.unsubscribe();
    }
  }

  // SVG drawing
  update(deg) {
      this.setState({
        draw: this.drawCoord(deg),
      });
  }

  // Wizardry - for which credit must go to the source: https://jsfiddle.net/prafuitu/xRmGV/
  drawCoord(degrees) {
      let radius = 60;
      let radians = degrees * Math.PI / 180;
      let offset = 10;
      let rX = radius + offset + Math.sin(radians) * radius;
      let rY = radius + offset - Math.cos(radians) * radius;
      let dir = (degrees > 180) ? 1 : 0;
      let coord = 'M' + (radius + offset) + ',' + (radius + offset) + ' ' +
          'L' + (radius + offset) + ',' + offset + ' ' +
          'A' + radius + ',' + radius + ' 0 ' + dir + ',1 ' +
          rX + ',' + rY;
      return coord;
  }

  timerText() {
        // Ideally we'd just use duration.format("mm:ss") but that is not yet supported in moment.js
        // We could use utc().format("mm:ss"), but once the timer hits zero (and counts up), then UTC is not applicable.
        // This function does the job until duration.format() is supported.
        let response = "";
        let duration = null;
        let buffer = (this.timerDuration === 0 ? 0 : 1000);
        // Timer initially counts down
        if (this.timerDuration < this.goalTimeMillis) {
            duration = moment.duration(buffer + this.goalTimeMillis - this.timerDuration);
        }
        // Handles when the timer reaches 0 and goes negative (displays + not -)
        if (this.timerDuration >= this.goalTimeMillis) {
            duration = moment.duration(this.goalTimeMillis - this.timerDuration);
            response = "+";
        }
        let minutes = ("00" + Math.abs(duration.minutes())).slice(-2);
        let seconds = ("00" + Math.abs(duration.seconds())).slice(-2);
        response += (minutes + ":" + seconds);
        return response;
  }

  render() {
    // The SVG is deterministic, so split out into a stateless component
    return (
      <div style={{ userSelect: "none", WebkitUserSelect: "none" }}>
        <TimerSVG
          timerText={this.timerText()}
          draw={this.state.draw}
          outerColor={this.props.outerColor}
          innerColor={this.props.innerColor}
          countdownColor={this.props.countdownColor}
          timerIsRunning={this.state.timerIsRunning}
          displayCountdown={this.props.displayCountdown}
          clickStart={this.toggleStart}
        />
      </div>
    );
  }
}

ReactSvgTimer.propTypes = {
  timerCount: PropTypes.number.isRequired,
  outerColor: PropTypes.string,
  innerColor: PropTypes.string,
  countdownColor: PropTypes.string,
  resetTimerRequested: PropTypes.bool,
  displayCountdown: PropTypes.bool,
  resetTimer: PropTypes.func,
  completeTimer: PropTypes.func,
  timerDuration: PropTypes.func
};

export default ReactSvgTimer;
