import "./App.css";
import { GlobalContextProvider } from "./Components/Contexts/GlobalContext";
import Home from "./Components/Page/Home/Home";
import Routing from "./Components/Routing/Routing";

import { useState, useMemo } from "react";

import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";

import CssBaseline from "@mui/material";

function App() {
  const [mode, setMode] = useState<String>("dark" || "");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
        },
      }),
    [mode]
  );
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalContextProvider>
          <Routing />
        </GlobalContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
