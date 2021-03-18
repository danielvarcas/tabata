import * as React from "react";
import * as Luxon from "luxon";
import { Button } from "@material-ui/core";
import { useBoolean, useInterval } from "react-use";

type Props = {
  duration: Luxon.Duration;
};

type TimerState = "ready" | "starting" | "running";

export function Timer({ duration }: Props) {
  // May want to allow duration to be null and initialise timerState differently in future
  // const [timerState, setTimerState] = React.useState<TimerState>("ready");
  const [
    remainingTime,
    setRemainingTime,
  ] = React.useState<Luxon.Duration | null>(null);
  const [isRunning, toggleIsRunning] = useBoolean(false);

  React.useEffect(() => {
    setRemainingTime(duration);
  }, []);

  useInterval(
    () => {
      setRemainingTime(remainingTime.minus({ seconds: 1 }));
    },
    isRunning ? 1000 : null
  );

  return (
    <>
      <div>
        {remainingTime !== null && (
          <div>
            <p>Remaining: {remainingTime.toFormat("hh : mm : ss")} </p>
          </div>
        )}
      </div>

      <Button variant="contained" onClick={toggleIsRunning}>
        {isRunning ? "Pause" : "Start"}
      </Button>
    </>
  );
}
