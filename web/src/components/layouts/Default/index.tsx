import { AppShell, Header } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { HeaderMenu } from "./components";

import { FunctionalRoutes } from "../../../config/routes";

export default function Layout() {
  const links = FunctionalRoutes.map(({ label, slug, options }) => ({
    label,
    link: slug,
    links: options?.links,
  }));

  return (
    <AppShell
      header={<HeaderMenu links={links} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          padding: 0,
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
}
