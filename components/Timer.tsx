import * as React from "react";
import * as Luxon from "luxon";
import { Box, Button, TextField, useTheme } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useInterval } from "react-use";
import { Time } from "./Time";

export function Timer() {
  const [timerState, setTimerState] = React.useState<TimerState>("stopped");
  const [duration, setDuration] = React.useState<Luxon.Duration | null>(null);
  const { register, handleSubmit } = useForm();
  const theme = useTheme();

  function onSubmit(data) {
    const [hours, minutes, seconds] = data.timer.split(":");
    const duration = Luxon.Duration.fromObject({ hours, minutes, seconds });

    setTimerState("ready");
    setDuration(duration);
  }

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

  function TimerContent() {
    if (timerState === "stopped") {
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box margin={theme.spacing(0.25)}>
            <TextField
              type="time"
              name="timer"
              inputRef={register}
              defaultValue={duration?.toFormat("hh:mm:ss") || "00:00:00"}
              inputProps={{ step: 1 }}
            />
          </Box>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Set
          </Button>
        </form>
      );
    }

    return (
      <>
        {duration !== null && timerState !== "elapsed" && (
          <Time
            duration={duration}
            timerState={timerState}
            setTimerState={setTimerState}
          />
        )}

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
