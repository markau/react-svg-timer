"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

/* A stateless component */

var TimerSVG = function TimerSVG(props) {
  return _react2["default"].createElement(
    "svg",
    { version: "1.1",
      baseProfile: "tiny",
      xmlns: "http://www.w3.org/2000/svg",
      width: "100%", height: "100%",
      viewBox: "0 0 140 175"
    },
    _react2["default"].createElement("circle", { cx: "70", cy: "70", r: "60.75", fill: props.outerColour }),
    _react2["default"].createElement("circle", { cx: "70", cy: "70", r: "59.75", fill: props.countdownColour }),
    _react2["default"].createElement("path", { d: props.draw, fill: props.outerColour }),
    _react2["default"].createElement("circle", { cx: "70", cy: "70", r: "48", fill: props.innerColour, stroke: props.outerColour }),
    _react2["default"].createElement(
      "g",
      { id: "playButton", opacity: props.timerIsRunning ? 0 : 1 },
      _react2["default"].createElement("path", { d: "M 55 50 L 55 91 L 95 69 L 55 50", fill: props.outerColour })
    ),
    _react2["default"].createElement(
      "g",
      { id: "pauseButton", opacity: props.timerIsRunning ? 1 : 0 },
      _react2["default"].createElement("rect", { x: "53", y: "53", height: "36", width: "13", rx: "0", ry: "0", fill: props.outerColour }),
      _react2["default"].createElement("rect", { x: "74", y: "53", height: "36", width: "13", rx: "0", ry: "0", fill: props.outerColour })
    ),
    _react2["default"].createElement("circle", { cx: "70", cy: "70", r: "48", opacity: "0", onClick: props.clickStart }),
    props.displayCountdown ? _react2["default"].createElement(
      "text",
      { x: "70", y: "165", textAnchor: "middle", style: { fill: "#333", fontSize: "28px" } },
      props.timerText
    ) : null
  );
};

TimerSVG.propTypes = {
  outerColour: _react2["default"].PropTypes.string,
  innerColour: _react2["default"].PropTypes.string,
  countdownColour: _react2["default"].PropTypes.string,
  displayCountdown: _react2["default"].PropTypes.bool,
  timerIsRunning: _react2["default"].PropTypes.bool,
  timerText: _react2["default"].PropTypes.string,
  draw: _react2["default"].PropTypes.string,
  clickStart: _react2["default"].PropTypes.func
};
TimerSVG.defaultProps = {
  outerColour: '#333',
  innerColour: '#fff',
  countdownColour: '#00ffa8',
  displayCountdown: true
};

exports["default"] = TimerSVG;
module.exports = exports["default"];
/* Outer circle */ /* Countdown circle */ /* The black circle that covers the colour as the timer counts down */ /* Inner circle that the play/pause button sits on */ /* Play / Pause button icons */ /* Hitbox for play/pause button */ /* Timer countdown text */