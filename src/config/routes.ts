import * as Pages from "../pages";

enum layoutTypes {
  default = "default",
  auth = "auth",
}

interface ObjectRoute {
  path: string;
  key: string;
  exact?: boolean;
  layout?: layoutTypes;
  component: Function;
}

export const routes: ObjectRoute[] = [
  {
    path: "/",
    key: "home",
    exact: true,
    layout: layoutTypes.default,
    component: Pages.Home,
  },
  {
    path: "*",
    key: "notFound",
    component: Pages.NotFound,
  },
];
