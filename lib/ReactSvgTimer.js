'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _rxjsRx = require('rxjs/Rx');

var _TimerSVG = require('./TimerSVG');

var _TimerSVG2 = _interopRequireDefault(_TimerSVG);

var ReactSvgTimer = (function (_React$Component) {
  _inherits(ReactSvgTimer, _React$Component);

  function ReactSvgTimer(props, context) {
    var _this = this;

    _classCallCheck(this, ReactSvgTimer);

    _get(Object.getPrototypeOf(ReactSvgTimer.prototype), 'constructor', this).call(this, props, context);

    var initialCounter = this.props.timerCount;

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
    this.timerResetObservable = _rxjsRx.Observable.interval(10).subscribe(function (t) {
      if (_this.props.resetTimerRequested) {
        _this.reset();
        // Call callback function in parent component
        _this.props.resetTimer();
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

  _createClass(ReactSvgTimer, [{
    key: 'reset',
    value: function reset() {
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
  }, {
    key: 'toggleStart',
    value: function toggleStart() {
      if (this.state.timerIsRunning) {
        this.pause();
      } else {
        this.start();
      }
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      /*
      This could be a start from reset state, or simply unpausing.
      */

      // Get the current moment to calculate the elapsed time
      var currentDate = new Date();
      this.startDateMoment = (0, _moment2['default'])(currentDate);

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
      this.timerObservable = _rxjsRx.Observable.interval(1).subscribe(function (t) {
        // Update the timer duration
        var currentDate = new Date();
        _this2.timerDuration = _this2.elapsedTime + (0, _moment2['default'])(currentDate).diff((0, _moment2['default'])(_this2.startDateMoment));

        // Update the state and draw another segment in the SVG
        if (_this2.timerDuration < _this2.goalTimeMillis) {
          _this2.update(_this2.timerDuration * _this2.degrees);
        }

        // If the timer has completed, let the parent component know via
        // the callback prop.
        if (_this2.timerDuration > _this2.goalTimeMillis && !_this2.timerIsComplete) {
          _this2.props.completeTimer(true);
          // Ensure any remaining sliver of timer colour is removed
          _this2.update(359.99);
        }

        // Inform the parent component of the current timer duration
        _this2.props.timerDuration(_this2.timerDuration);
      });
    }
  }, {
    key: 'pause',
    value: function pause() {
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
  }, {
    key: 'update',
    value: function update(deg) {
      this.setState({
        draw: this.drawCoord(deg)
      });
    }

    // Wizardry - for which credit must go to the source: https://jsfiddle.net/prafuitu/xRmGV/
  }, {
    key: 'drawCoord',
    value: function drawCoord(degrees) {
      var radius = 60;
      var radians = degrees * Math.PI / 180;
      var offset = 10;
      var rX = radius + offset + Math.sin(radians) * radius;
      var rY = radius + offset - Math.cos(radians) * radius;
      var dir = degrees > 180 ? 1 : 0;
      var coord = 'M' + (radius + offset) + ',' + (radius + offset) + ' ' + 'L' + (radius + offset) + ',' + offset + ' ' + 'A' + radius + ',' + radius + ' 0 ' + dir + ',1 ' + rX + ',' + rY;
      return coord;
    }
  }, {
    key: 'timerText',
    value: function timerText() {
      // Ideally we'd just use duration.format("mm:ss") but that is not yet supported in moment.js
      // We could use utc().format("mm:ss"), but once the timer hits zero (and counts up), then UTC is not applicable.
      // This function does the job until duration.format() is supported.
      var response = "";
      var duration = null;
      var buffer = this.timerDuration === 0 ? 0 : 1000;
      // Timer initially counts down
      if (this.timerDuration < this.goalTimeMillis) {
        duration = _moment2['default'].duration(buffer + this.goalTimeMillis - this.timerDuration);
      }
      // Handles when the timer reaches 0 and goes negative (displays + not -)
      if (this.timerDuration >= this.goalTimeMillis) {
        duration = _moment2['default'].duration(this.goalTimeMillis - this.timerDuration);
        response = "+";
      }
      var minutes = ("00" + Math.abs(duration.minutes())).slice(-2);
      var seconds = ("00" + Math.abs(duration.seconds())).slice(-2);
      response += minutes + ":" + seconds;
      return response;
    }
  }, {
    key: 'render',
    value: function render() {
      // The SVG is deterministic, so split out into a stateless component
      return _react2['default'].createElement(
        'div',
        { style: { cursor: "pointer", userSelect: "none", WebkitUserSelect: "none" } },
        _react2['default'].createElement(_TimerSVG2['default'], {
          timerText: this.timerText(),
          draw: this.state.draw,
          outerColour: this.props.outerColour,
          innerColour: this.props.innerColour,
          countdownColour: this.props.countdownColour,
          timerIsRunning: this.state.timerIsRunning,
          displayCountdown: this.props.displayCountdown,
          clickStart: this.toggleStart
        })
      );
    }
  }]);

  return ReactSvgTimer;
})(_react2['default'].Component);

ReactSvgTimer.propTypes = {
  timerCount: _react.PropTypes.number.isRequired,
  outerColour: _react.PropTypes.string,
  innerColour: _react.PropTypes.string,
  countdownColour: _react.PropTypes.string,
  resetTimerRequested: _react.PropTypes.bool,
  displayCountdown: _react.PropTypes.bool,
  resetTimer: _react.PropTypes.func,
  completeTimer: _react.PropTypes.func,
  timerDuration: _react.PropTypes.func
};

exports['default'] = ReactSvgTimer;
module.exports = exports['default'];