import * as React from "react";
import { Duration } from "luxon";
import { Box, Button } from "@material-ui/core";
import { Time } from "./Time";
import { TabataState } from "./Tabata";

type Props = {
  duration: Duration;
  setTabataState: React.Dispatch<React.SetStateAction<TabataState>>;
};

export type TimerState = "ready" | "running" | "paused" | "elapsed";

export function Timer({ duration, setTabataState }: Props) {
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
    setTabataState("uninitialised");
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
