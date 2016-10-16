require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');
var ReactSvgTimer = require('react-svg-timer');

var App = (function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props, context) {
		_classCallCheck(this, App);

		_get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this, props, context);

		// To keep track of the milliseconds elapsed
		this.timer = 0;

		this.state = {
			resetRequested: false,
			timerisComplete: false
		};

		// Bind event handlers
		this.timerValue = this.timerValue.bind(this);
		this.onComplete = this.onComplete.bind(this);
		this.onReset = this.onReset.bind(this);
		this.onResetRequest = this.onResetRequest.bind(this);
	}

	_createClass(App, [{
		key: 'onComplete',
		value: function onComplete(status) {
			this.setState({
				timerisComplete: status
			});
		}
	}, {
		key: 'onReset',
		value: function onReset() {
			this.setState({
				resetRequested: false
			});
		}
	}, {
		key: 'timerValue',
		value: function timerValue(value) {
			this.timer = value;
			console.log(value);
		}
	}, {
		key: 'onResetRequest',
		value: function onResetRequest() {
			this.setState({
				resetRequested: true
			});
			this.timer = 0;
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ style: { padding: '20', width: '500', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' } },
				React.createElement(
					'button',
					{ onClick: this.onResetRequest },
					'Reset timer'
				),
				React.createElement(ReactSvgTimer, {
					timerCount: 6,
					resetTimer: this.onReset,
					completeTimer: this.onComplete,
					resetTimerRequested: this.state.resetRequested,
					timerDuration: this.timerValue
				})
			);
		}
	}]);

	return App;
})(React.Component);

;

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

},{"react":undefined,"react-dom":undefined,"react-svg-timer":undefined}]},{},[1]);
