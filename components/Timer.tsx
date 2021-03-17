import * as React from "react";
import { Input, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";

export function Timer() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input type="time" name="timer" inputRef={register} />
      <Button type="submit" variant="contained">
        Go
      </Button>
    </form>
  );
}
