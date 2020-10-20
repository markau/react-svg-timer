import React, { FC, useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { TimerSVG } from './TimerSVG';

export interface ITimerProps {
  outerColor?: string;
  innerColor?: string;
  countdownColor?: string;
  displayCountdown?: boolean;
  timerDuration?: any;
  resetTimerRequested?: boolean;
  resetTimer?: any;
  timerCount?: number;
  completeTimer?: any;
}

function useInterval(callback: any, runTimer: any) {
  // Thanks Dan Abramov https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  const savedCallback = useRef<any>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (runTimer) {
      let id = setInterval(tick, 1);
      return () => clearInterval(id);
    }
    return undefined;
  }, [runTimer]);
}

export const ReactSvgTimer: FC<ITimerProps> = ({
  outerColor,
  innerColor,
  countdownColor,
  displayCountdown,
  timerDuration,
  resetTimerRequested,
  resetTimer,
  timerCount,
  completeTimer,
}: ITimerProps) => {
  timerCount = timerCount || 5;
  // State variables
  let [draw, setDraw] = useState<string>('');
  let [timerIsRunning, setTimerIsRunning] = useState(false);
  let [timerisReset, setTimerisReset] = useState(false);
  let [counterText, setcounterText] = useState('');
  let [duration, setDuration] = useState(0);
  let [elapsedTime, setElapsedTime] = useState(0);
  let [startDateMoment, setStartDateMoment] = useState<any>(null);
  // Instance variables
  const goalTimeMilliseconds = timerCount * 1000;
  const degrees = 360 / (timerCount * 1000);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setcounterText(getcounterText());
  });

  useInterval(() => {
    if (resetTimerRequested) {
      reset();
    }
  }, resetTimerRequested);

  useInterval(() => {
    // Moments are used to correct drift from JavaScript's setInterval
    setDuration(elapsedTime + moment(new Date()).diff(moment(startDateMoment)));
    if (duration <= goalTimeMilliseconds) {
      setDraw(drawCoord(duration * degrees));
    } else {
      completeTimer(true);
      setDraw(drawCoord(359.99));
    }
    // Inform the parent component of the current timer duration
    if (timerDuration) timerDuration(duration);
  }, timerIsRunning);

  const start = () => {
    setElapsedTime(duration);
    setStartDateMoment(moment(new Date()));
    setTimerIsRunning(true);
  };

  const pause = () => {
    setTimerIsRunning(false);
  };

  const reset = () => {
    setTimerIsRunning(false);
    setTimerisReset(true);
    setDuration(0);
    setElapsedTime(0);
    setDraw(drawCoord(360));
    // Call the callback functions on the parent component
    if (completeTimer) completeTimer(false);
    if (resetTimer) resetTimer();
  };

  // Wizardry - for which credit must go to the source: https://jsfiddle.net/prafuitu/xRmGV/
  const drawCoord = (degrees: number) => {
    let radius = 60;
    let radians = (degrees * Math.PI) / 180;
    let offset = 10;
    let rX = radius + offset + Math.sin(radians) * radius;
    let rY = radius + offset - Math.cos(radians) * radius;
    let dir = degrees > 180 ? 1 : 0;
    // prettier-ignore
    let coord = `M${radius + offset},${radius + offset} L${radius + offset},${offset} A${radius},${radius} 0 ${dir},1 ${rX},${rY}`
    return coord;
  };

  const getcounterText = () => {
    // This function is not great - complexity is due to counting up once timer goal is reached
    const isTimerPositive = duration > goalTimeMilliseconds;
    const getTimerDuration = () => {
      return moment
        .duration(
          isTimerPositive
            ? duration - goalTimeMilliseconds
            : goalTimeMilliseconds - duration
        )
        .asMilliseconds();
    };
    let roundedMilliseconds = Math.round(getTimerDuration() / 1000) * 1000;
    let prefix = isTimerPositive && roundedMilliseconds > 0 ? '+' : '';
    return `${prefix}${moment.utc(roundedMilliseconds).format('mm:ss')}`;
  };

  return (
    <div style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
      <TimerSVG
        timerText={counterText}
        draw={draw}
        outerColor={outerColor}
        innerColor={innerColor}
        countdownColor={countdownColor}
        timerIsRunning={timerIsRunning}
        displayCountdown={displayCountdown}
        clickStart={() => (timerIsRunning ? pause() : start())}
      />
    </div>
  );
};

ReactSvgTimer.defaultProps = {
  outerColor: '#282828',
  innerColor: '#ffffff',
  countdownColor: '#00b6e0',
  displayCountdown: true,
};
