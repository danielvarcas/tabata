import * as React from "react";
import { Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import * as Luxon from "luxon";

export function Timer() {
  const { register, handleSubmit } = useForm();
  const [duration, setDuration] = React.useState<Luxon.Duration | null>(null);

  function onSubmit(data) {
    const [hours, minutes, seconds] = data.timer.split(":");
    const duration = Luxon.Duration.fromObject({ hours, minutes, seconds });

    setDuration(duration);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="time"
          name="timer"
          inputRef={register}
          defaultValue="00:00:00"
          inputProps={{ step: 1 }}
        />

        <Button type="submit" variant="contained">
          Go
        </Button>
      </form>

      {duration !== null && (
        <div>
          <p>{duration.toFormat("mm : ss")} </p>
          <p>{duration.as("seconds")}</p>
        </div>
      )}
    </>
  );
}
