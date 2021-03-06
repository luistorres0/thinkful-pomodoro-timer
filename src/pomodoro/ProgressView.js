import React from "react";
import { secondsToDuration } from "../utils/duration";
import { minutesToDuration } from "../utils/duration";

const ProgressView = (props) => {
  const { mode, timer, isSessionActive, focusDuration, breakDuration, isSessionPaused } = props;

  let currentDurationTime = mode === "focus" ? focusDuration : breakDuration;
  currentDurationTime *= 60; // convert minutes to seconds
  const timeElapsed = currentDurationTime - timer;

  let width;
  if (timer === 0) {
    width = 100;
  } else {
    width = (100 / currentDurationTime) * timeElapsed;
  }

  return (
    <div style={{ display: isSessionActive ? "block" : "none" }}>
      {/* TODO: This area should show only when a focus or break session is running or pauses */}
      <div className="row mb-2">
        <div className="col">
          {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
          <h2 data-testid="session-title">
            {mode === "focus" ? "Focusing" : "On Break"} for{" "}
            {mode === "focus" ? minutesToDuration(focusDuration) : minutesToDuration(breakDuration)}{" "}
            minutes
          </h2>
          {/* TODO: Update message below to include time remaining in the current session */}
          <p className="lead" data-testid="session-sub-title">
            {/* 25:00 remaining */}
            {secondsToDuration(timer)} remaining
          </p>
          <h3 style={{ display: isSessionPaused ? "block" : "none" }}>PAUSED</h3>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={width} // TODO: Increase aria-valuenow as elapsed time increases
              style={{ width: `${width}%` }} // TODO: Increase width % as elapsed time increases
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressView;
