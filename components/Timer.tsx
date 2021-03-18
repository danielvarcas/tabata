import * as React from "react";
import * as Luxon from "luxon";
import { Box, Button } from "@material-ui/core";
import { Time } from "./Time";

type Props = {
  duration: Luxon.Duration;
  setDuration: React.Dispatch<React.SetStateAction<Luxon.Duration>>;
};

export type TimerState = "ready" | "running" | "paused" | "elapsed";

export function Timer({ duration, setDuration }: Props) {
  const [timerState, setTimerState] = React.useState<TimerState>("ready");

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
    setDuration(null);
  }

  return (
    <Box display="flex" flexDirection="column" textAlign="center">
      {timerState !== "elapsed" && (
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
            color="secondary"
            fullWidth
            type="button"
            onClick={stop}
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
    </Box>
  );
}
