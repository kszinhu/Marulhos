import { useState } from "react";

import {
  AppShell,
  Burger,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { MainLinks } from "../NavBarItems";
import { Outlet } from "react-router-dom";
import UserSection from "@components/UserSection";
import { useUserInfo } from "@hooks/Auth/useUserInfo";

export default function FormLayout() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState<boolean>(false),
    [userMenuOpened, setUserMenuOpened] = useState(false),
    { userInfo, isLogged } = useUserInfo();

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
            <UserSection {...userInfo} isLoggedIn={isLogged} />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={70} p='xs'>
          <Group dir='column' align='center' sx={{ height: "100%" }}>
            <MediaQuery largerThan='sm' styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size='xs'
                color={theme.colors.gray[6]}
                mr='xl'
              />
            </MediaQuery>

            <Text>Nilceu Airlines</Text>
          </Group>
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
