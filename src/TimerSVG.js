import React from "react";

/* A stateless component */

const TimerSVG = props => (
	<svg
		version="1.1"
		baseProfile="tiny"
		xmlns="http://www.w3.org/2000/svg"
		width="100%"
		height="100%"
		viewBox="0 0 140 175"
	>
		{/* Outer circle */}
		<circle cx="70" cy="70" r="60.75" fill={props.outerColor} />

		{/* Countdown circle */}
		<circle cx="70" cy="70" r="59.75" fill={props.countdownColor} />

		{/* The black circle that covers the Color as the timer counts down */}
		<path d={props.draw} fill={props.outerColor} />

		{/* Inner circle that the play/pause button sits on */}
		<circle
			cx="70"
			cy="70"
			r="48"
			fill={props.innerColor}
			stroke={props.outerColor}
		/>

		{/* Play / Pause button icons */}
		<g id="playButton" opacity={props.timerIsRunning ? 0 : 1}>
			<path d="M 55 50 L 55 91 L 95 69 L 55 50" fill={props.outerColor} />
		</g>

		<g id="pauseButton" opacity={props.timerIsRunning ? 1 : 0}>
			<rect
				x="53"
				y="53"
				height="36"
				width="13"
				rx="0"
				ry="0"
				fill={props.outerColor}
			/>
			<rect
				x="74"
				y="53"
				height="36"
				width="13"
				rx="0"
				ry="0"
				fill={props.outerColor}
			/>
		</g>

		{/* Hitbox for play/pause button */}
		<circle
			cx="70"
			cy="70"
			r="48"
			opacity="0"
			style={{ cursor: "pointer", WebkitTapHighlightColor: "rgba(0,0,0,0)" }}
			onClick={props.clickStart}
		/>

		{/* Timer countdown text */}
		{props.displayCountdown ? (
			<text
				x="70"
				y="165"
				textAnchor="middle"
				style={{ fill: props.countdownColor, fontSize: "28px" }}
			>
				{props.timerText}
			</text>
		) : null}
	</svg>
);

TimerSVG.propTypes = {
	clickStart: React.PropTypes.func,
	countdownColor: React.PropTypes.string,
	displayCountdown: React.PropTypes.bool,
	draw: React.PropTypes.string,
	innerColor: React.PropTypes.string,
	outerColor: React.PropTypes.string,
	timerIsRunning: React.PropTypes.bool,
	timerText: React.PropTypes.string
};
TimerSVG.defaultProps = {
	outerColor: "#333",
	innerColor: "#fff",
	countdownColor: "#00ffa8",
	displayCountdown: true
};

export default TimerSVG;
