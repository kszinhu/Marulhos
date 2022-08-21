import * as Pages from "../pages";

import { formModels } from "./forms";

enum layoutTypes {
  default = "default",
  manager = "manager",
  none = "none",
}

interface ObjectRoute {
  path: string;
  key: string;
  component: React.FC<any>;
  schema?: Object[];
  index?: boolean;
  exact?: boolean;
}

interface Route {
  layout: layoutTypes;
  routes: ObjectRoute[];
}

// Preenche as rotas administrativas com os modelos de formulários cadastrados em './forms'
export const managerRoutes: ObjectRoute[] = formModels.map(
  ({ name, slug, fields }) => ({
    path: slug,
    key: name,
    component: Pages.Manager,
    layout: layoutTypes.manager,
    schema: fields,
  })
);

export const routes: Route[] = [
  {
    layout: layoutTypes.default,
    routes: [
      {
        path: "/",
        key: "home",
        index: true,
        exact: true,
        component: Pages.Home,
      },
    ],
  },
  {
    layout: layoutTypes.manager,
    routes: managerRoutes,
  },
  {
    layout: layoutTypes.none,
    routes: [
      {
        path: "*",
        key: "notFound",
        component: Pages.NotFound,
      },
    ],
  },
];
