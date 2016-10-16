import React from 'react';

/* A stateless component */

const TimerSVG = (props) =>
  <svg version="1.1"
      baseProfile="tiny"
      xmlns="http://www.w3.org/2000/svg"
      width="100%" height="100%"
      viewBox="0 0 140 175"
      >
        {/* Outer circle */}
        <circle cx="70" cy="70" r="60.75" fill={props.outerColour} />

        {/* Countdown circle */}
        <circle cx="70" cy="70" r="59.75" fill={props.countdownColour} />

        {/* The black circle that covers the colour as the timer counts down */}
        <path d={props.draw} fill={props.outerColour} />

        {/* Inner circle that the play/pause button sits on */}
        <circle cx="70" cy="70" r="48" fill={props.innerColour} stroke={props.outerColour} />

        {/* Play / Pause button icons */}
        <g id="playButton" opacity={props.timerIsRunning ? 0 : 1}>
          <path d="M 55 50 L 55 91 L 95 69 L 55 50" fill={props.outerColour}/>
        </g>

        <g id="pauseButton" opacity={props.timerIsRunning ? 1 : 0}>
          <rect x="53" y="53" height="36" width="13" rx="0" ry="0" fill={props.outerColour}/>
          <rect x="74" y="53" height="36" width="13" rx="0" ry="0" fill={props.outerColour}/>
        </g>

        {/* Hitbox for play/pause button */}
        <circle cx="70" cy="70" r="48" opacity="0" onClick={props.clickStart} />

        {/* Timer countdown text */}
        { props.displayCountdown ?
          <text x="70" y="165" textAnchor="middle" style={{ fill: "#333", fontSize: "28px" }}>{props.timerText}</text>
          : null
        }
    </svg>;

TimerSVG.propTypes = {
  outerColour: React.PropTypes.string,
  innerColour: React.PropTypes.string,
  countdownColour: React.PropTypes.string,
  displayCountdown: React.PropTypes.bool,
  timerIsRunning: React.PropTypes.bool,
  timerText: React.PropTypes.string,
  draw: React.PropTypes.string,
  clickStart: React.PropTypes.func
};
TimerSVG.defaultProps = {
  outerColour: '#333',
  innerColour: '#fff',
  countdownColour: '#00ffa8',
  displayCountdown: true
};

export default TimerSVG;
