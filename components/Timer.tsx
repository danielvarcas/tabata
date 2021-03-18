import * as React from "react";
import * as Luxon from "luxon";
import { Box, Button, Card, Paper, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useInterval } from "react-use";

type TimerState = "ready" | "running" | "paused" | "elapsed" | "stopped";

export function Timer() {
  const [timerState, setTimerState] = React.useState<TimerState>("stopped");
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
      if (remainingTime.as("seconds") > 0) {
        setRemainingTime(remainingTime.minus({ seconds: 1 }));
      } else {
        setTimerState("elapsed");
      }
    },
    timerState === "running" ? 1000 : null
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
    console.log(timerState);
    if (timerState === "stopped") {
      setRemainingTime(null);
    }
  }, [timerState]);

  function TimerContent() {
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

          <Button type="submit" variant="contained" color="primary" fullWidth>
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
              <p>{remainingTime.toFormat("hh : mm : ss")} </p>
            </div>
          )}
        </div>

        {timerState === "ready" && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="button"
            onClick={startTimer}
          >
            Start
          </Button>
        )}

        {(timerState === "running" || timerState === "paused") && (
          <>
            <Button
              variant="contained"
              type="button"
              onClick={togglePaused}
              color={timerState === "running" ? "default" : "primary"}
              fullWidth
            >
              {timerState === "running" ? "Pause" : "Resume"}
            </Button>

            <Button
              variant="contained"
              type="button"
              onClick={stop}
              color="secondary"
              fullWidth
            >
              Stop
            </Button>
          </>
        )}

        {timerState === "elapsed" && (
          <>
            <p>Finished</p>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="button"
              onClick={stop}
            >
              Done
            </Button>
          </>
        )}
      </>
    );
  }

  return (
    <Box display="flex" flexDirection="column" textAlign="center">
      <TimerContent />
    </Box>
  );
}
