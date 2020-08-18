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
  timersData,
  // RPC handlers
  incrementFocusTime,
  decrementFocusTime,
  incrementBreakTime,
  decrementBreakTime,
  resetTimers,
  setCycle,
  updateStart,
  // props from redux global state
  profileLoading,
  profileError,
  profileData,
  timerId,
  focusTime,
  breakTime,
  currentFocusTime,
  currentBreakTime,
  currentCycle,
  isStarted,
}) => {
  // TODO: wrap the Pomodoro clock in a login component - so login page renders if not authenticated. use props.history and match

  // const [timer, setTimer] = useState(focusTime);
  // const [cycle, setCycle] = useState(true);
  // const [isStarted, setIsStarted] = useState(false);
  // const [timerReadout, setTimerReadout] = useState(null);

  //action creator for these
  //in store make reducer Pomodoro Clock
  // make a const DEFAULT_STATE object tree in reducers
  // creat actions for these
  // dispatch actions with updated time
  //in reducers, look for actions swtich (action.type) - case setFocusTime
  // update state for focus time

  // NOTE: GETTING THE PROFILE DATA ON PAGE LOAD - how i will do it once i link everything up

  // Initial Page load - grab profile and timer data
  useEffect(() => {
    getProfile();
    getTimers();
  }, []);

  // TODO: connect back end call for timers
  // useEffect(() => {
  //   if (isStarted && timer != 0) {
  //     if (currentCycle === 'Focus') {
  //       focusCountdown();
  //     }
  //     if (currentCycle === 'Break') {
  //       breakCoundown();
  //     }
  //   }
  // }, [isStarted, timer]);

  //<StartStop />

  // Stop timer when it the time runs to 0
  // useEffect(() => {
  //   if (currentFocusTime === 0 || currentBreakTime === 0) {
  //     clearInterval(timerReadout);
  //     updateStart({ id: timerId });
  //     // to stop timer from changing automatically
  //     // setCycle(!cycle);
  //   }
  // }, [currentFocusTime, currentBreakTime]);

  // useEffect(() => {
  //   setTimer(currentCycle === 'Focus' ? focusTime : breakTime);
  // }, [currentCycle, focusTime, breakTime]);

  // TOGGLE
  const toggleCycle = () => {
    setCycle({ id: timerId });
  };

  // Adjusting timer when the times are incremented/decremented
  // useEffect(() => {
  //   if (currentCycle === 'Focus') {
  //     if (currentBreakTime !== timer) {
  //       if (currentFocusTime > timer) {
  //         setTimer(timer + 60);
  //       }
  //       if (currentFocusTime < timer) {
  //         setTimer(timer - 60);
  //       }
  //     }
  //   }
  //   if (currentCycle === 'Break') {
  //     if (currentBreakTime !== timer) {
  //       if (currentBreakTime > timer) {
  //         setTimer(timer + 60);
  //       }
  //       if (currentBreakTime < timer) {
  //         if (timer >= 60) {
  //           setTimer(timer - 60);
  //         }
  //         if (timer <= 60) {
  //           setTimer(0);
  //         }
  //       }
  //     }
  //   }
  // }, [currentFocusTime, currentBreakTime]);

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

  // TODO: re-wire start stop to use global state
  // useEffect(() => {
  //   if (!isStarted) {
  //     clearInterval(timerReadout);
  //   }
  //   if (isStarted) {
  //     updatedTimerReadout = setInterval(() => {
  //       // fire call to update current focus or break time
  //       if (currentCycle === 'Focus') {
  //         //need to eventually separate the backend call to reduce the load on the server
  //         updateCurrentFocusTime({ id: timerId });
  //       }
  //     }, 1000);
  //     setTimerReadout(updatedTimerReadout);
  //   }
  // }, [isStarted]);

  // const startStopTimer = () => {
  //   updateStart({ id: timerId });
  // };

  // const startStopTimer = () => {
  //   let updatedTimerReadout;
  //   if (isStarted) {
  //     clearInterval(timerReadout);
  //     setIsStarted(false);
  //   }
  //   if (!isStarted) {
  //     updatedTimerReadout = setInterval(() => {
  //       setTimer((prevTimer) => {
  //         const newTimer = prevTimer - 1;
  //         if (newTimer >= 0) {
  //           return newTimer;
  //         }

  //         return prevTimer;
  //       });
  //     }, 1000);
  //     setTimerReadout(updatedTimerReadout);
  //     setIsStarted(true);
  //   }
  // };

  // De-coupled timer - put timer info into global state

  // useEffect(() => {}, [
  //   currentFocusTime,
  //   currentBreakTime,
  //   focusTime,
  //   breakTime,
  // ]);

  // set timer based on when current cycle changes -
  // TODO: when focus or break time changes - update timer
  // useEffect(() => {
  //   timer()
  // }, [currentCycle])

  // const timer = () => {
  //   if (currentCycle === 'Focus') {
  //     timer = currentFocusTime;
  //     return timer;
  //   }
  //   if (currentCycle === 'Break') {
  //     timer = currentBreakTime;
  //     return timer;
  //   }
  // };

  // // RESET TIMERS
  // const reset = (event) => {
  //   event.preventDefault();
  //   resetTimers({ id: timerId });
  // };

  // TIMER PANEL LABEL
  // const cycleLength = () => {
  //   return currentCycle === 'Focus'
  //     ? `Focus Time: ${focusTime / 60} min.`
  //     : `Break Time: ${breakTime / 60} min.`;
  // };

  // // INCREMENT TIME
  // const increaseTimer = (event) => {
  //   event.preventDefault();
  //   if (currentCycle === 'Focus') {
  //     incrementFocusTime({ id: timerId });
  //   }
  //   if (currentCycle === 'Break') {
  //     incrementBreakTime({ id: timerId });
  //   }
  // };

  // // DECREMENT TIME
  // const decreaseTimer = (event) => {
  //   event.preventDefault();
  //   if (currentCycle === 'Focus') {
  //     decrementFocusTime({ id: timerId, min_focus_time: 1 });
  //   }
  //   if (currentCycle === 'Break') {
  //     decrementBreakTime({ id: timerId, min_break_time: 1 });
  //   }
  // };

  const getProfileData = () => {
    getProfile();
    getTimers();
  };

  // const shownGreetText = loadingGreeting ? 'loading' : greetingText;
  const shownProfileData = profileLoading
    ? 'loading'
    : { profileData, timersData };

  return (
    <>
      <div className="pomodoro-clock raised-panel">
        <div className="left-panel"></div>
        <div className="center-panel">
          <ToggleSwitch />
          {/* <Timer />

          <StartStop /> */}
        </div>
        <div className="right-panel">
          <AdjustTime />
          <Reset />
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
  const timersData = state.timers;
  const timerId = state.timers.id;
  const focusTime = state.timers.focus_time;
  const breakTime = state.timers.break_time;
  const currentFocusTime = state.timers.current_focus_time;
  const currentBreakTime = state.timers.current_break_time;
  const currentCycle = state.timers.current_cycle;
  const isStarted = state.timers.is_started;

  return {
    profileLoading,
    profileError,
    profileData,
    timerId,
    focusTime,
    breakTime,
    currentFocusTime,
    currentBreakTime,
    currentCycle,
    isStarted,
    timersData,
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
  withRPCRedux('setCycle'),
  withRPCRedux('updateStart'),
  withRPCRedux('updateCurrentFocusTime'),
  // connecting reducers to components
  connect(mapStateToProps)
);

export default hoc(PomodoroClock);
// export default PomodoroClock;
