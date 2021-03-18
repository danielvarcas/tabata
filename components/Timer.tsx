import * as React from "react";
import * as Luxon from "luxon";
import { Button } from "@material-ui/core";
import { useInterval } from "react-use";

type Props = {
  duration: Luxon.Duration;
};

type TimerState = "ready" | "running" | "paused";

export function Timer({ duration }: Props) {
  const [timerState, setTimerState] = React.useState<TimerState>("ready");
  const [
    remainingTime,
    setRemainingTime,
  ] = React.useState<Luxon.Duration | null>(duration);

  useInterval(
    () => {
      setRemainingTime(remainingTime.minus({ seconds: 1 }));
    },
    timerState === "running" && remainingTime.as("seconds") > 0 ? 1000 : null
  );

  function startTimer() {
    setTimerState("running");
  }

  function togglePaused() {
    if (timerState === "paused") {
      setTimerState("running");
    } else if (timerState === "running") {
      setTimerState("paused");
    }
  }

  return (
    <>
      <div>
        {remainingTime !== null && (
          <div>
            <p>Remaining: {remainingTime.toFormat("hh : mm : ss")} </p>
          </div>
        )}
      </div>

      {timerState === "ready" && (
        <Button variant="contained" type="button" onClick={startTimer}>
          Start
        </Button>
      )}

      {(timerState === "running" || timerState === "paused") && (
        <>
          <Button variant="contained" type="button" onClick={togglePaused}>
            {timerState === "running" ? "Pause" : "Resume"}
          </Button>

          {/* <Button variant="contained" type="button" onClick={stopTimer}>
          Stop
        </Button> */}
        </>
      )}
    </>
  );
}
