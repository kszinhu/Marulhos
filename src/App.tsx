import { useToggle } from "@mantine/hooks";

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";

import { BrowserRouter as Router } from "react-router-dom";
import ApplicationRouter from "./components/router";

function App() {
  const [colorScheme, toggleColorScheme] = useToggle<ColorScheme>([
    "light",
    "dark",
  ]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Router>
          <ApplicationRouter />
        </Router>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
