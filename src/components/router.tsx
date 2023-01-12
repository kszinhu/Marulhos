import { Route, Routes, Outlet } from "react-router-dom";

import { routes as applicationRoutes } from "../config/routes";

import * as layouts from "./layouts";

export default function ApplicationRouter() {
  return (
    <Routes>
      {applicationRoutes.map(({ type, layout, routes }, index) => {
        let LayoutComponent: any;
        switch (layout) {
          case "manager":
            LayoutComponent = layouts.FormLayout;
            break;

          case "default":
            LayoutComponent = layouts.Layout;
            break;
        }
        const isManagerRoute = type === "manager";
        const isAuthRoute = type === "authentication";

        return (
          <Route
            key={`route-${index}`}
            element={layout !== "none" ? <LayoutComponent /> : <Outlet />}
            {...(isManagerRoute ? { path: "/manager" } : {})}
            {...(isAuthRoute ? { path: "/auth" } : {})}
          >
            {routes.map(
              (
                {
                  path,
                  key,
                  title,
                  endpoint,
                  modelName,
                  component: Component,
                  exact,
                  index,
                  schema,
                  yupSchema,
                  onSubmit,
                  onEdit,
                },
                idIterator
              ) =>
                !isManagerRoute && !isAuthRoute ? (
                  <Route
                    key={`${key}-${idIterator}`}
                    path={path}
                    element={<Component title={title} />}
                    index={index ? undefined : false}
                  />
                ) : !isAuthRoute ? (
                  <>
                    <Route
                      key={`list-${key}`}
                      path={path}
                      element={
                        <Component.List
                          modelName={modelName}
                          endpoint={endpoint ?? `${modelName}s`}
                          schema={schema}
                          title={title}
                          yupSchema={yupSchema}
                        />
                      }
                      index={index}
                      {...(exact ? { exact: true } : {})} // Conditionally add the exact prop to the Route element
                    />
                    <Route
                      key={`view-${key}`}
                      path={`${path}/:id`}
                      element={
                        <Component.View
                          modelName={modelName}
                          endpoint={endpoint ?? `${modelName}s`}
                          schema={schema}
                          title={title}
                          yupSchema={yupSchema}
                        />
                      }
                      index={index}
                      {...(exact ? { exact: true } : {})} // Conditionally add the exact prop to the Route element
                    />
                    <Route
                      key={`edit-${key}`}
                      path={`${path}/:id/edit`}
                      element={
                        <Component.Edit
                          modelName={modelName}
                          endpoint={endpoint ?? `${modelName}s`}
                          schema={schema}
                          title={title}
                          yupSchema={yupSchema}
                          onSubmit={onEdit}
                        />
                      }
                      index={index}
                      {...(exact ? { exact: true } : {})} // Conditionally add the exact prop to the Route element
                    />
                    <Route
                      key={`new-${key}`}
                      path={`${path}/new`}
                      element={
                        <Component.Add
                          modelName={modelName}
                          endpoint={endpoint ?? `${modelName}s`}
                          schema={schema}
                          title={title}
                          yupSchema={yupSchema}
                          onSubmit={onSubmit}
                        />
                      }
                      index={index}
                      {...(exact ? { exact: true } : {})} // Conditionally add the exact prop to the Route element
                    />
                  </>
                ) : (
                  <>
                    <Route
                      key={`auth-${key}`}
                      path={path}
                      element={
                        <Component
                          title={title}
                          yupSchema={yupSchema}
                          onSubmit={onSubmit}
                        />
                      }
                      index={index}
                      {...(exact ? { exact: true } : {})} // Conditionally add the exact prop to the Route element
                    />
                  </>
                )
            )}
          </Route>
        );
      })}
    </Routes>
  );
}
