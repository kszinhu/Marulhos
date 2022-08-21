import * as Pages from "../pages";

import { SchemaOf } from "yup";

import { formModels } from "./forms";

enum layoutTypes {
  default = "default",
  manager = "manager",
  none = "none",
}

enum ManagerViewsInterface {
  view = "View",
  edit = "Edit",
  create = "Create",
}

interface ObjectRoute {
  path: string;
  key: string;
  component: any;
  schema?: Object[];
  yupSchema?: SchemaOf<any>;
  title?: string;
  index?: boolean;
  exact?: boolean;
}

interface Route {
  layout: layoutTypes;
  routes: ObjectRoute[];
}

// Preenche as rotas administrativas com os modelos de formulários cadastrados em './forms'
export const managerRoutes: ObjectRoute[] = formModels.map(
  ({ name, slug, title, fields, schema }) => ({
    path: slug,
    key: name,
    title,
    component: Pages.Manager,
    layout: layoutTypes.manager,
    schema: fields,
    yupSchema: schema,
  })
);

export const routes: Route[] = [
  {
    layout: layoutTypes.default,
    routes: [
      {
        path: "/",
        key: "home",
        title: "Página Inicial",
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
        title: "Página não encontrada",
        component: Pages.NotFound,
      },
    ],
  },
];
