import "./App.css";
import { GlobalContextProvider } from "./Components/Contexts/GlobalContext";
import Routing from "./Components/Routing/Routing";

import { useMemo } from "react";

import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";

import { SnackbarProvider } from "notistack";

function App() {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
        },
      }),
    []
  );
  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={theme}>
          <GlobalContextProvider>
            <Routing />
          </GlobalContextProvider>
        </ThemeProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
