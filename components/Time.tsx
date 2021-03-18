import * as React from "react";
import { Duration } from "luxon";
import { useInterval } from "react-use";
import { TimerState } from "./Timer";

type Props = {
  duration: Duration;
  sets: number;
  timerState: TimerState;
  setTimerState: React.Dispatch<React.SetStateAction<TimerState>>;
};

export function Time({ duration, sets, timerState, setTimerState }: Props) {
  const [remainingTime, setRemainingTime] = React.useState<Duration>(duration);
  const [completedSets, setCompletedSets] = React.useState(0);

  useInterval(
    () => {
      if (remainingTime.as("seconds") > 0) {
        setRemainingTime(remainingTime.minus({ seconds: 1 }));
      } else {
        setCompletedSets(completedSets + 1);
        setRemainingTime(duration);
      }
    },
    timerState === "running" ? 1000 : null
  );

  React.useEffect(() => {
    if (completedSets === sets) {
      setTimerState("elapsed");
    }
  }, [sets, completedSets]);

  return (
    <div>
      <p>
        Set {completedSets + 1} of {sets}
      </p>
      <p>{remainingTime.toFormat("hh : mm : ss")} </p>
    </div>
  );
}
