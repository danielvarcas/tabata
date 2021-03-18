import * as React from "react";
import Head from "next/head";
import {
  AppBar,
  Box,
  Container,
  Paper,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import { Tabata } from "../components/Tabata";

export default function Home() {
  const theme = useTheme();
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
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6">Tabata</Typography>
          </Toolbar>
        </AppBar>

        <Container>
          <Box marginTop={theme.spacing(0.25)}>
            <Paper>
              <Tabata />
            </Paper>
          </Box>
        </Container>
      </main>
    </div>
  );
}
