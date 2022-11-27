import * as Pages from "../pages";

import { SchemaOf } from "yup";

import { formModels, formAuthentications } from "./forms";
import { Icon } from "tabler-icons-react";
import API from "@services/api";

enum layoutTypes {
  default = "default",
  manager = "manager",
  none = "none",
}

interface ObjectRoute {
  path: string;
  key: string;
  component: any;
  modelName?: string;
  schema?: Object[];
  yupSchema?: SchemaOf<any>;
  title?: string;
  index?: boolean;
  exact?: boolean;
  onSubmit?: (values: any) => any;
  onEdit?: (values: any) => any;
}

interface Route {
  type: "model" | "manager" | "authentication" | "default";
  layout: layoutTypes;
  routes: ObjectRoute[];
}

// Preenche as rotas administrativas com os modelos de formulários cadastrados em './forms'
export const managerRoutes: ObjectRoute[] = formModels.map(
  ({ name, slug, title, fields, schema }) => ({
    path: slug,
    key: name,
    title,
    name,
    modelName: name,
    component: Pages.Manager,
    layout: layoutTypes.manager,
    schema: fields,
    yupSchema: schema,
    onSubmit: (values) => API.post(`/api/${name}s`, values),
    onEdit: (values) => API.put(`/api/${name}s/${values.id}`, values),
  })
);

export const AuthenticationRoutes: ObjectRoute[] = formAuthentications.map(
  ({ endpoint, slug, title, schema }) => ({
    path: slug, // sign-in
    key: slug,
    title,
    component:
      // remove "-" and capitalize all first letters
      Pages.Authentication[
        slug
          .replace(/-/g, " ")
          .split(" ")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join("") as keyof typeof Pages.Authentication
      ],
    layout: layoutTypes.none,
    schema: [], // static authentication forms
    yupSchema: schema,
    onSubmit: (values) => API.post(`api/${endpoint}/`, values),
  })
);

export const routes: Route[] = [
  {
    type: "default",
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
    type: "manager",
    layout: layoutTypes.manager,
    routes: managerRoutes,
  },
  {
    type: "authentication",
    layout: layoutTypes.none,
    routes: AuthenticationRoutes,
  },
  {
    type: "default",
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

interface ManagerNavItemInterface {
  key: string;
  title: string;
  path: string;
  icon: Icon;
}

export const managerNavItems: ManagerNavItemInterface[] = formModels.map(
  ({ name, slug, title, icon }) => ({
    key: name,
    title,
    path: slug,
    icon,
  })
);
