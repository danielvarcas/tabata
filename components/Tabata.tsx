import * as React from "react";
import * as Luxon from "luxon";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, useTheme } from "@material-ui/core";
import { Timer } from "./Timer";

export function Tabata() {
  const theme = useTheme();
  const { register, handleSubmit } = useForm();
  const [duration, setDuration] = React.useState<Luxon.Duration | null>(null);

  function onSubmit(data) {
    const [hours, minutes, seconds] = data.timer.split(":");
    const duration = Luxon.Duration.fromObject({ hours, minutes, seconds });

    setDuration(duration);
  }

  if (duration === null) {
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

  if (duration !== null) {
    return (
      <>
        <Timer duration={duration} setDuration={setDuration} />
      </>
    );
  }
}
