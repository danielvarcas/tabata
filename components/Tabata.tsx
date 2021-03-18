import * as React from "react";
import { Duration } from "luxon";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, useTheme } from "@material-ui/core";
import { Timer } from "./Timer";

export type TabataState = "initialised" | "uninitialised" | null;

type FormValues = {
  duration: Duration;
  sets: number;
};

export function Tabata() {
  const theme = useTheme();
  const { register, handleSubmit } = useForm<FormValues>();
  const [state, setState] = React.useState<TabataState>(null);
  const [duration, setDuration] = React.useState<Duration | null>(null);
  const [sets, setSets] = React.useState<number | null>(null);

  function onSubmit(data) {
    const [hours, minutes, seconds] = data.timer.split(":");
    const duration = Duration.fromObject({ hours, minutes, seconds });

    setDuration(duration);
    setSets(Number(data.sets)); // TS linting not working. Shouldn't have to use Number()?
  }

  React.useEffect(() => {
    setState(duration === null ? "uninitialised" : "initialised");
  }, [duration]);

  if (state === null) {
    return null;
  }

  if (state === "uninitialised") {
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box margin={theme.spacing(0.25)}>
            <TextField
              name="timer"
              label="Work time"
              type="time"
              inputRef={register}
              defaultValue={duration?.toFormat("hh:mm:ss") || "00:00:00"}
              inputProps={{ step: 1 }}
              fullWidth
            />
          </Box>
          <Box margin={theme.spacing(0.25)}>
            <TextField
              name="sets"
              label="Sets"
              type="number"
              defaultValue={sets || 0}
              inputRef={register}
              fullWidth
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Set
          </Button>
        </form>
      </>
    );
  }

  if (state === "initialised") {
    return (
      <>
        <Timer duration={duration} sets={sets} setTabataState={setState} />
      </>
    );
  }
}
