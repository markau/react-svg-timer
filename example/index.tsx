import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useState, useEffect } from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import { ReactSvgTimer } from '../.';
import './styles.css';
import './fonts/fonts.css';

const App = () => {
  // State variables
  let [resetRequested, setResetRequested] = useState(false)
  let [timerisComplete, setTimerisComplete] = useState(false)
  let [displayCountdown, setDisplayCountdown] = useState(true)
  let [showMilliseconds, setShowMilliseconds] = useState(false)
  let [displayCountdownColorPicker, setDisplayCountdownColorPicker] = useState(false)
  let [displayInnerColorPicker, setDisplayInnerColorPicker] = useState(false)
  let [displayOuterColorPicker, setDisplayOuterColorPicker] = useState(false)
  let [countdownColor, setCountdownColor] = useState({ r: '0', g: '182', b: '224', a: '1' })
  let [innerColor, setInnerColor] = useState({ r: '255', g: '255', b: '255', a: '1' })
  let [outerColor, setOuterColor] = useState({ r: '40', g: '40', b: '40', a: '1' })

  useEffect(() => {
    if (timerisComplete && showMilliseconds) console.log('timer complete')
  })

  const handleCountdownColorClick = () => {
    setDisplayCountdownColorPicker(!displayCountdownColorPicker)
  }
  const handleCountdownColorClose = () => {
    setDisplayCountdownColorPicker(false)
  }
  const handleCountdownColorChange = color => {
    setCountdownColor(color.rgb)
  }
  const handleInnerColorClick = () => {
    setDisplayInnerColorPicker(!displayInnerColorPicker)
  }
  const handleInnerColorClose = () => {
    setDisplayInnerColorPicker(false)
  }
  const handleInnerColorChange = color => {
    setInnerColor(color.rgb)
  }
  const handleOuterColorClick = () => {
    setDisplayOuterColorPicker(!displayOuterColorPicker)
  }
  const handleOuterColorClose = () => {
    setDisplayOuterColorPicker(false)
  }
  const handleOuterColorChange = color => {
    setOuterColor(color.rgb)
  }
  const onComplete = status => {
    setTimerisComplete(status)
  }
  const onReset = () => {
    setResetRequested(false)
  }
  const timerValue = value => {
    if (showMilliseconds) console.log(value)
  }
  const onResetRequest = () => {
    setResetRequested(true)
  }
  const optionTimerText = () => {
    setDisplayCountdown(!displayCountdown)
  }
  const optionLogCount = () => {
    setShowMilliseconds(!showMilliseconds)
  }

  const styles = reactCSS({
    default: {
      countdownColor: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${countdownColor.r}, ${countdownColor.g}, ${countdownColor.b}, ${countdownColor.a})`
      },
      outerColor: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${outerColor.r}, ${outerColor.g}, ${outerColor.b}, ${outerColor.a})`
      },
      innerColor: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${innerColor.r}, ${innerColor.g}, ${innerColor.b}, ${innerColor.a})`
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
        marginRight: '10px',
        verticalAlign: 'middle'
      },
      popover: {
        position: 'absolute',
        zIndex: '2'
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      },
      formElement: {
        padding: 10,
        textAlign: 'left',
        margin: '0.4em 0'
      },
      label: {
        color: '#232323',
        fontSize: '0.85em',
        fontWeight: 'normal',
        marginLeft: '0.5em',
        textTransform: 'uppercase'
      },
      resetButton: {
        padding: 10,
        width: '90%'
      },
      heading: {
        padding: 5,
        paddingLeft: 15,
        fontSize: 22
      }
    }
  })

  return (
    <main className="columnsContainer">
      <div className="timerContainer">
        <ReactSvgTimer
          timerCount={6}
          countdownColor={`rgba(${countdownColor.r}, ${countdownColor.g}, ${countdownColor.b}, ${countdownColor.a})`}
          innerColor={`rgba(${innerColor.r}, ${innerColor.g}, ${innerColor.b}, ${innerColor.a})`}
          outerColor={`rgba(${outerColor.r}, ${outerColor.g}, ${outerColor.b}, ${outerColor.a})`}
          resetTimer={onReset}
          completeTimer={onComplete}
          resetTimerRequested={resetRequested}
          timerDuration={timerValue}
          displayCountdown={displayCountdown}
        />
      </div>

      <div className="controlsContainer">
        <h2 style={styles.heading}>Play with some props</h2>

        <div style={styles.formElement}>
          <button style={styles.resetButton} onClick={onResetRequest}>
            Reset timer
          </button>
        </div>

        <div style={styles.formElement}>
          <div style={styles.swatch} onClick={handleCountdownColorClick}>
            <div style={styles.countdownColor} />
          </div>
          {displayCountdownColorPicker ? (
            <div style={styles.popover}>
              <div style={styles.cover} onClick={handleCountdownColorClose} />
              <SketchPicker color={countdownColor} onChange={handleCountdownColorChange} />
            </div>
          ) : null}
          <span style={styles.label}>Countdown color</span>
        </div>

        <div style={styles.formElement}>
          <div style={styles.swatch} onClick={handleOuterColorClick}>
            <div style={styles.outerColor} />
          </div>
          {displayOuterColorPicker ? (
            <div style={styles.popover}>
              <div style={styles.cover} onClick={handleOuterColorClose} />
              <SketchPicker color={outerColor} onChange={handleOuterColorChange} />
            </div>
          ) : null}
          <span style={styles.label}>Outer color</span>
        </div>

        <div style={styles.formElement}>
          <div style={styles.swatch} onClick={handleInnerColorClick}>
            <div style={styles.innerColor} />
          </div>
          {displayInnerColorPicker ? (
            <div style={styles.popover}>
              <div style={styles.cover} onClick={handleInnerColorClose} />
              <SketchPicker color={innerColor} onChange={handleInnerColorChange} />
            </div>
          ) : null}
          <span style={styles.label}>Inner color</span>
        </div>

        <div style={styles.formElement}>
          <input defaultChecked={displayCountdown} onClick={optionTimerText} type="checkbox" id="chk1" />
          <label htmlFor="chk1">Show countdown</label>
        </div>
        <div style={styles.formElement}>
          <input defaultChecked={showMilliseconds} onClick={optionLogCount} type="checkbox" id="chk2" />
          <label htmlFor="chk2">Log elapsed time to console</label>
        </div>

      </div>
    </main>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
