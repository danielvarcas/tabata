import * as React from "react";
import { Duration } from "luxon";
import { useInterval } from "react-use";
import { TimerState } from "./Timer";

type Props = {
  duration: Duration;
  timerState: TimerState;
  setTimerState: React.Dispatch<React.SetStateAction<TimerState>>;
};

export function Time({ duration, timerState, setTimerState }: Props) {
  const [remaining, setRemaining] = React.useState<Duration>(duration);

  useInterval(
    () => {
      if (remaining.as("seconds") > 0) {
        setRemaining(remaining.minus({ seconds: 1 }));
      } else {
        setTimerState("elapsed");
      }
    },
    timerState === "running" ? 1000 : null
  );

  return (
    <div>
      <p>{remaining.toFormat("hh : mm : ss")} </p>
    </div>
  );
}
