import * as React from "react";
import Head from "next/head";
import { Typography } from "@material-ui/core";
import { Timer } from "../components/Timer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>

      <main>
        <Typography variant="h1">Tabata</Typography>

        <Timer />
      </main>
    </div>
  );
}
