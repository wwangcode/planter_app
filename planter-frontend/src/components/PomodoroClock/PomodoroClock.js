import React, { useState, useEffect } from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Timer from './Timer';
import AdjustTime from './AdjustTime';
import StartStop from './StartStop';
import Reset from './Reset';

import ToggleSwitch from './ToggleSwitch';
// import { object } from 'prop-types';

const PomodoroClock = ({
  // retrieving data RPC handlers
  getProfile,
  getTimers,
  // AdjustTime RPC handlers
  incrementFocusTime,
  decrementFocusTime,
  incrementBreakTime,
  decrementBreakTime,
  resetTimers,
  // props from redux global state
  profileLoading,
  profileError,
  profileData,
  timerId,
  focusTime,
  breakTime,
  currentFocusTime,
  currentBreakTime,
}) => {
  // TODO: figure out how to get this to update on redirect from login
  // TODO: if not loading and not error, use the data, but if error than use the default state
  // - think reducers already do this tho

  const [timer, setTimer] = useState(focusTime);
  const [cycle, setCycle] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [idTimer, setIdTimer] = useState(null);
  const [cycleCount, setCycleCount] = useState(0);

  //action creator for these
  //in store make reducer Pomodoro Clock
  // make a const DEFAULT_STATE object tree in reducers
  // creat actions for these
  // dispatch actions with updated time
  //in reducers, look for actions swtich (action.type) - case setFocusTime
  // update state for focus time

  // NOTE: GETTING THE PROFILE DATA ON PAGE LOAD - how i will do it once i link everything up

  useEffect(() => {
    getProfile();
    getTimers();
  }, []);

  useEffect(() => {
    setTimer(cycle ? focusTime : breakTime);
  }, [cycle, focusTime, breakTime]);

  const toggleCycle = () => {
    setCycle(!cycle);
  };

  //<StartStop />

  useEffect(() => {
    if (timer === 0) {
      clearInterval(idTimer);
      setIsStarted(!isStarted);
      // to stop timer from changing automatically
      // setCycle(!cycle);
    }
  }, [timer]);

  useEffect(() => {
    if (cycle) {
      if (focusTime !== timer) {
        if (focusTime > timer) {
          setTimer(timer + 60);
        }
        if (focusTime < timer) {
          setTimer(timer - 60);
        }
      }
    }
    if (!cycle) {
      if (breakTime !== timer) {
        if (breakTime > timer) {
          setTimer(timer + 60);
        }
        if (breakTime < timer) {
          if (timer >= 60) {
            setTimer(timer - 60);
          }
          if (timer <= 60) {
            setTimer(0);
          }
        }
      }
    }
  }, [focusTime, breakTime]);

  // display for loading/error state

  // if (typeof profileData == 'undefined') {
  //   return <div>loading</div>;
  // }

  // Object.keys(profileData).length == null || undefined

  if (profileLoading) {
    return <div>loading</div>;
  }

  if (profileError) {
    return <div>{profileError.message}</div>;
  }

  // const focusTime = profileData.timers[0].focus_time;

  const startStopClick = () => {
    let updatedTimerId;
    if (isStarted) {
      clearInterval(idTimer);
      setIsStarted(false);
    }
    if (!isStarted) {
      updatedTimerId = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          if (newTimer >= 0) {
            return newTimer;
          }
          if (cycle) {
            setCycleCount(cycleCount + 1);
            console.log(cycleCount);
          }
          return prevTimer;
        });
      }, 1000);
      setIdTimer(updatedTimerId);
      setInterval(idTimer);
      setIsStarted(true);
    }
  };

  // RESET TIMERS
  const reset = (event) => {
    event.preventDefault();
    resetTimers({ id: timerId });
  };

  // <AdjustTime />

  const cycleLength = () => {
    return cycle
      ? `Focus Time: ${focusTime / 60} min.`
      : `Break Time: ${breakTime / 60} min.`;
  };

  const increaseTimer = (event) => {
    event.preventDefault();
    if (cycle) {
      incrementFocusTime({ id: timerId });
    }
    if (!cycle) {
      incrementBreakTime({ id: timerId });
    }
  };

  //update: set focusTime minimum time to 1 min
  const decreaseTimer = (event) => {
    event.preventDefault();
    if (cycle) {
      decrementFocusTime({ id: timerId, min_focus_time: 1 });
    }
    if (!cycle) {
      decrementBreakTime({ id: timerId, min_break_time: 1 });
    }
  };

  const getProfileData = () => {
    getProfile();
  };

  // const shownGreetText = loadingGreeting ? 'loading' : greetingText;
  const shownProfileData = profileLoading ? 'loading' : profileData;

  return (
    <>
      <div className="pomodoro-clock raised-panel">
        <div className="left-panel"></div>
        <div className="center-panel">
          <ToggleSwitch toggleCycle={toggleCycle} cycle={cycle} />
          <Timer timer={timer} cycle={cycle} />
          <StartStop
            isStarted={isStarted}
            startStopClick={startStopClick}
            cycleCount={cycleCount}
          />
        </div>
        <div className="right-panel">
          <AdjustTime
            increaseTimer={increaseTimer}
            decreaseTimer={decreaseTimer}
            cycleLength={cycleLength}
            cycle={cycle}
          />

          <Reset reset={reset} />
        </div>
      </div>
      <div className="json-data">
        <button className="raised-btn" onClick={getProfileData}>
          Get Profile Data
        </button>
        <p className="inset panel-label">
          Profile Data: {JSON.stringify(shownProfileData)}
        </p>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  //accessing store and putting it into local props for component
  const profileLoading = state.profile.loading;
  const profileError = state.profile.error;
  const profileData = state.profile;
  const timerId = state.timers.id;
  const focusTime = state.timers.focus_time;
  const breakTime = state.timers.break_time;
  const currentFocusTime = state.timers.current_focus_time;
  const currentBreakTime = state.timers.current_break_time;

  return {
    profileLoading,
    profileError,
    profileData,
    timerId,
    focusTime,
    breakTime,
    currentFocusTime,
    currentBreakTime,
  };
};

const hoc = compose(
  // gets data from browser to FE server - network request from browser get sent through all middleware
  withRPCRedux('getProfile'),
  withRPCRedux('getTimers'),
  withRPCRedux('incrementFocusTime'),
  withRPCRedux('decrementFocusTime'),
  withRPCRedux('incrementBreakTime'),
  withRPCRedux('decrementBreakTime'),
  withRPCRedux('resetTimers'),
  // connecting reducers to components
  connect(mapStateToProps)
);

export default hoc(PomodoroClock);
// export default PomodoroClock;
