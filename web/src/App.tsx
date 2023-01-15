import { useTimeout, useToggle } from "@mantine/hooks";

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
} from "@mantine/core";

import { NotificationsProvider } from "@mantine/notifications";

import { BrowserRouter as Router } from "react-router-dom";
import ApplicationRouter from "./components/router";
import { applicationTheme } from "./config/theme";
import { useUserInfo } from "@hooks/Auth/useUserInfo";
import { useEffect } from "react";

function App() {
  const [colorScheme, toggleColorScheme] = useToggle<ColorScheme>([
      "dark",
      "light",
    ]),
    { userInfo, setUserInfo, isLogged } = useUserInfo(),
    now = new Date(),
    { start, clear } = useTimeout(
      () => {
        setUserInfo({});
      },
      Math.max(0, new Date(userInfo.expiresAt).getTime() - now.getTime()),
      { autoInvoke: true }
    );

  // Auto logout when token expires
  useEffect(() => {
    clear();
    if (isLogged) {
      start();
    }
  }, [userInfo]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          ...applicationTheme,
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
