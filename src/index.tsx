/**
 * @class ReactSvgTimer
 */

// https://www.npmjs.com/package/create-react-library

import * as React from "react";
import { interval } from "rxjs";
import moment from "moment"; // note rollup config change - https://stackoverflow.com/a/47007576/3003102

// import stateless component
import TimerSVG from "./TimerSVG";

export type Props = {
  completeTimer?: (param: boolean) => void;
  countdownColor: string;
  displayCountdown: boolean;
  innerColor: string;
  outerColor: string;
  resetTimer: () => void;
  resetTimerRequested: boolean;
  timerCount: number;
  timerDuration?: (param: number) => void;
};

export type State = {
  draw: any;
  timerIsRunning: boolean;
};

export default class ReactSvgTimer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // changes to state variables will cause the browser to re-render
    this.state = {
      draw: null, // the SVG draw property
      timerIsRunning: false
    };

    // bind event handlers
    this.toggleStart = this.toggleStart.bind(this);
  }

  // other variables are fine as instance variables
  initialCounter: number;
  // constants for calculations of the SVG circle
  goalTimeMillis: number;
  degrees: number;
  /*
  This property stores the Moment.js moment that the timer was started.
  Rather than rely on the observable timout for keeping time (where 1ms
  might not actually be 1ms due to system load etc.), the time is tracked
  with moments.
  */
  startDateMoment: any;
  // the milliseconds since the timer was started (without considering pauses)
  timerDuration: number;
  // the "official" milliseconds - excluding time during pauses
  elapsedTime: number;
  // start in a 'reset' stat
  timerisReset: boolean;
  // this property will store the Observable for the timer countdown
  timerObservable: any;
  timerResetObservable: any;

  public componentDidMount(): void {
    // set instance variables
    this.initialCounter = this.props.timerCount;
    this.goalTimeMillis = this.initialCounter * 1000;
    this.degrees = 360 / (this.initialCounter * 1000);
    this.startDateMoment = null;
    this.timerDuration = 0;
    this.elapsedTime = 0;
    this.timerisReset = true;

    this.timerObservable = null;

    /*
		This observable listens for a change in the resetTimerRequested prop.
		It calls the local reset() function to reset local state, and also
		the parent component's callback function to reset parental state.
	*/
    this.timerResetObservable = interval(10).subscribe(_t => {
      if (this.props.resetTimerRequested) {
        this.reset();
        // call callback function in parent component
        this.props.resetTimer();
      }
    });

    this.reset(); // setup timer text
  }

  public componentWillUnmount(): void {
    this.reset();
  }

  public reset(): void {
    this.timerisReset = true;
    this.timerDuration = 0;
    this.elapsedTime = 0;
    // re-render required
    this.setState({
      draw: this.drawCoord(360),
      timerIsRunning: false
    });
    // we don't want multiple instances of the timer hanging around
    if (this.timerObservable) {
      this.timerObservable.unsubscribe();
    }
    // call the callback function in the parent component to reset state
    this.props.completeTimer(false);
  }

  public toggleStart(): void {
    if (this.state.timerIsRunning) {
      this.pause();
    } else {
      this.start();
    }
  }

  public start(): void {
    /*
	This could be called from reset state, or simply unpausing.
	*/

    // get the current moment to calculate the elapsed time
    let currentDate: Date = new Date();
    this.startDateMoment = currentDate;

    // if un-pausing, need to reset the elapsedTime property
    // it is no longer zero, but whatever the timer currently shows
    if (!this.timerisReset) {
      this.elapsedTime = this.timerDuration;
    }

    // prepare for any further unpauses
    this.timerisReset = false;

    // and we're off (again - if this is an un-pause)
    this.setState({
      timerIsRunning: true
    });

    /*
		This observable continues to run indefinitely unless paused or reset.
		It increments the duration, calls this.update() to re-draw the SVG,
		and notifies the parent component via callback props.
	*/
    this.timerObservable = interval(1).subscribe(_t => {
      // update the timer duration
      let currentDate: Date = new Date();
      this.timerDuration =
        this.elapsedTime +
        moment(currentDate).diff(moment(this.startDateMoment));
      // this.elapsedTime + differenceInMilliseconds(currentDate, this.startDateMoment);

      // update the state and draw another segment in the SVG
      if (this.timerDuration < this.goalTimeMillis) {
        this.update(this.timerDuration * this.degrees);
      }

      // if the timer has completed, let the parent component know via
      // the callback prop.
      if (this.timerDuration > this.goalTimeMillis) {
        this.props.completeTimer(true);
        // ensure any remaining sliver of timer Color is removed
        this.update(359.99);
      }

      // inform the parent component of the current timer duration
      this.props.timerDuration(this.timerDuration);
    });
  }

  public pause(): void {
    this.setState({
      timerIsRunning: false
    });
    // we don't want multiple timer objects floating around, so uninstantiate it.
    // if un-paused, a new observable will be instantiated.
    if (this.timerObservable) {
      this.timerObservable.unsubscribe();
    }
  }

  // svg drawing
  public update(deg: number): void {
    this.setState({
      draw: this.drawCoord(deg)
    });
  }

  // wizardry - credit must go to the source: https://jsfiddle.net/prafuitu/xRmGV/
  public drawCoord(degrees: number): void {
    let radius: number = 60;
    let radians: number = (degrees * Math.PI) / 180;
    let offset: number = 10;
    let rX: number = radius + offset + Math.sin(radians) * radius;
    let rY: number = radius + offset - Math.cos(radians) * radius;
    let dir: number = degrees > 180 ? 1 : 0;
    let coord: any =
      "M" +
      (radius + offset) +
      "," +
      (radius + offset) +
      " " +
      "L" +
      (radius + offset) +
      "," +
      offset +
      " " +
      "A" +
      radius +
      "," +
      radius +
      " 0 " +
      dir +
      ",1 " +
      rX +
      "," +
      rY;
    return coord;
  }

  public timerText(): string {
    let start: moment.Moment;
    let end: moment.Moment;
    let posneg: string = "";

	// we want a positive or negative number depending whether the time has reached zero or not
    if (this.timerDuration >= this.goalTimeMillis) {
      start = moment(this.goalTimeMillis);
      end = moment(this.timerDuration);
      posneg = "+";
    } else {
      start = moment(this.timerDuration - 999); // -999 would not be necessary if formatted "mm:ss.SS"
      end = moment(this.goalTimeMillis);
    }

    let diff: number = end.diff(start);
    return `${posneg}${moment.utc(diff).format("mm:ss")}`;
  }

  public render(): JSX.Element {
    // the SVG is deterministic, so is split out into a stateless component
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
