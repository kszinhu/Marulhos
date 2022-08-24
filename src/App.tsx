import { useToggle } from "@mantine/hooks";

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";

import { NotificationsProvider } from "@mantine/notifications";

import { BrowserRouter as Router } from "react-router-dom";
import ApplicationRouter from "./components/router";
import { applicationTheme } from "./config/theme";

function App() {
  const [colorScheme, toggleColorScheme] = useToggle<ColorScheme>([
    "dark",
    "light",
  ]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          fontFamily: "Inter, sans-serif !important",
          ...(applicationTheme as any),
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider position='top-center' limit={5}>
          <Router>
            <ApplicationRouter />
          </Router>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
