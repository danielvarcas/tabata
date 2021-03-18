import * as React from "react";
import { Duration } from "luxon";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, useTheme } from "@material-ui/core";
import { Timer } from "./Timer";

export type TabataState = "initialised" | "uninitialised" | null;

export function Tabata() {
  const theme = useTheme();
  const { register, handleSubmit } = useForm();
  const [state, setState] = React.useState<TabataState>(null);
  const [duration, setDuration] = React.useState<Duration | null>(null);

  function onSubmit(data) {
    const [hours, minutes, seconds] = data.timer.split(":");
    const duration = Duration.fromObject({ hours, minutes, seconds });

    setDuration(duration);
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
      </>
    );
  }

  if (state === "initialised") {
    return (
      <>
        <Timer duration={duration} setTabataState={setState} />
      </>
    );
  }
}
