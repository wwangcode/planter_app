import React from 'react';
import AdjustTime from './AdjustTime';
import StartStop from './StartStop';

const Controls = ({
  isActive,
  timer,
  cycle,
  cycleLength,
  focusTime,
  breakTime,
  increaseTimer,
  decreaseTimer,
  setTimer,
  setIsActive,
  startStopClick,
}) => {
  return (
    <React.Fragment>
      {/* <Reset /> */}
      <StartStop isActive={isActive} startStopClick={startStopClick} />
      <AdjustTime
        increaseTimer={increaseTimer}
        decreaseTimer={decreaseTimer}
        cycleLength={cycleLength}
        cycle={cycle}
      />
    </React.Fragment>
  );
};
export default Controls;
