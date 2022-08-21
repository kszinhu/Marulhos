import { useState } from "react";

import { Outlet } from "react-router-dom";
import {
  AppShell,
  Aside,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";

import { managerNavItems } from "../../config/routes";
import { MainLinks } from "./navbaritems/links";
import { Brand } from "./navbaritems/brand";
import { User } from "./navbaritems/user";

export default function FormLayout() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      padding='md'
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      navbar={
        <Navbar
          p='xs'
          hiddenBreakpoint='sm'
          hidden={!opened}
          width={{ sm: 300 }}
        >
          <Navbar.Section grow>
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <User />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={70} p='xs'>
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan='sm' styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size='xs'
                color={theme.colors.gray[6]}
                mr='xl'
              />
            </MediaQuery>

            <Text>Application header</Text>
          </div>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
}
