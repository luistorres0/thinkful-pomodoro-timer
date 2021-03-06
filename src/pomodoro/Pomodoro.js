import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import DurationControl from "./DurationControl";
import PlayControl from "./PlayControl";
import ProgressView from "./ProgressView";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusDuration, setFocusDuration] = useState(25); // stores time in minutes
  const [breakDuration, setBreakDuration] = useState(5); // ... minutes
  const [timer, setTimer] = useState(25 * 60); // stores time in seconds
  const [mode, setMode] = useState("focus");
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isSessionPaused, setIsSessionPaused] = useState(true);

  const handleIncreaseFocus = () => {
    setFocusDuration((currentFocus) => {
      return Math.min(60, currentFocus + 5);
    });
  };

  const handleDecreaseFocus = () => {
    setFocusDuration((currentFocus) => {
      return Math.max(5, currentFocus - 5);
    });
  };

  const handleIncreaseBreak = () => {
    setBreakDuration((currentBreak) => {
      return Math.min(15, currentBreak + 1);
    });
  };

  const handleDecreaseBreak = () => {
    setBreakDuration((currentBreak) => {
      return Math.max(1, currentBreak - 1);
    });
  };

  const playPause = () => {
    if (!isSessionActive) {
      setIsSessionActive(true);
      setTimer(focusDuration * 60);
    }

    setIsSessionPaused((prevState) => !prevState);

    setIsTimerRunning((prevState) => !prevState);
  };

  const stopTimer = () => {
    setIsSessionActive(false);
    setIsSessionPaused(true);
    setIsTimerRunning(false);
    setMode("focus");
  };

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      if (timer === 0) {
        new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();

        const newTimer = mode === "focus" ? breakDuration : focusDuration;
        setTimer(newTimer * 60);

        setMode((prevState) => (prevState === "focus" ? "break" : "focus"));
        return;
      }

      // setTimer(timer - 1);
      setTimer(currentTimer => currentTimer - 1);

    },
    isTimerRunning ? 1000 : null
  );

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <DurationControl
            labelText={"Focus"}
            duration={focusDuration}
            handleDecrease={handleDecreaseFocus}
            handleIncrease={handleIncreaseFocus}
            isSessionActive={isSessionActive}
          />
        </div>
        <div className="col">
          <div className="float-right">
            <DurationControl
              labelText={"Break"}
              duration={breakDuration}
              handleDecrease={handleDecreaseBreak}
              handleIncrease={handleIncreaseBreak}
              isSessionActive={isSessionActive}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <PlayControl
            playPause={playPause}
            isTimerRunning={isTimerRunning}
            handleStop={stopTimer}
            isSessionActive={isSessionActive}
          />
        </div>
      </div>
      <ProgressView
        mode={mode}
        timer={timer}
        isSessionActive={isSessionActive}
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        isSessionPaused={isSessionPaused}
      />
    </div>
  );
}

export default Pomodoro;
