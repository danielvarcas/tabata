import * as React from "react";
import * as Luxon from "luxon";
import { Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useInterval } from "react-use";

type TimerState = "ready" | "running" | "paused" | "stopped";

export function Timer() {
  const [timerState, setTimerState] = React.useState<TimerState>("ready");
  const [
    remainingTime,
    setRemainingTime,
  ] = React.useState<Luxon.Duration | null>(null);
  const { register, handleSubmit } = useForm();
  const [duration, setDuration] = React.useState<Luxon.Duration | null>(null);

  function onSubmit(data) {
    const [hours, minutes, seconds] = data.timer.split(":");
    const duration = Luxon.Duration.fromObject({ hours, minutes, seconds });

    setTimerState("ready");
    setDuration(duration);
    setRemainingTime(duration);
  }

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

  function stop() {
    setTimerState("stopped");
  }

  React.useEffect(() => {
    if (timerState === "stopped") {
      setRemainingTime(null);
    }
  }, [timerState]);

  if (timerState === "stopped") {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="time"
          name="timer"
          inputRef={register}
          defaultValue="00:00:00"
          inputProps={{ step: 1 }}
        />

        <Button type="submit" variant="contained">
          Set
        </Button>
      </form>
    );
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

          <Button variant="contained" type="button" onClick={stop}>
            Stop
          </Button>
        </>
      )}
    </>
  );
}
