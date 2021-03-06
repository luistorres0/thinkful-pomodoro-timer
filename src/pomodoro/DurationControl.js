import React from "react";
import { minutesToDuration } from "../utils/duration";

const DurationControl = (props) => {
  const { labelText, duration, handleDecrease, handleIncrease, isSessionActive } = props;
  const labelLowerCase = labelText.toLowerCase();
  const durationTestId = `duration-${labelLowerCase}`;
  const increaseTestId = `increase-${labelLowerCase}`;
  const decreaseTestId = `decrease-${labelLowerCase}`;

  return (
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid={durationTestId}>
        {/* TODO: Update this text to display the current focus session duration */}
        {labelText} Duration: {minutesToDuration(duration)}
      </span>
      <div className="input-group-append">
        {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
        <button
          type="button"
          className="btn btn-secondary"
          data-testid={decreaseTestId}
          onClick={handleDecrease}
          disabled={isSessionActive}
        >
          <span className="oi oi-minus" />
        </button>
        {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
        <button
          type="button"
          className="btn btn-secondary"
          data-testid={increaseTestId}
          onClick={handleIncrease}
          disabled={isSessionActive}
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  );
};

export default DurationControl;
