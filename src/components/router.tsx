import { Route, Routes, Outlet } from "react-router-dom";

import { routes as applicationRoutes } from "../config/routes";

import * as layouts from "./layouts";

export default function ApplicationRouter() {
  return (
    <Routes>
      {applicationRoutes.map(({ layout, routes }, index) => {
        let LayoutComponent: any;
        switch (layout) {
          case "manager":
            LayoutComponent = layouts.FormLayout;
            break;

          case "default":
            LayoutComponent = layouts.Layout;
            break;
        }
        const isManagerRoute = layout === "manager";

        return (
          <Route
            key={`route-${index}`}
            element={layout !== "none" ? <LayoutComponent /> : <Outlet />}
            {...(isManagerRoute ? { path: "/manager" } : {})}
          >
            {routes.map(
              ({
                path,
                key,
                title,
                modelName,
                component: Component,
                exact,
                index,
                schema,
                yupSchema,
              }) =>
                !isManagerRoute ? (
                  <Route
                    key={key}
                    path={path}
                    element={<Component title={title} />}
                    index={index ? undefined : false}
                  />
                ) : (
                  <>
                    <Route
                      key={`list-${key}`}
                      path={path}
                      element={
                        <Component.List
                          endpoint={`${modelName}s`}
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
                          endpoint={`${modelName}s`}
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
                          endpoint={`${modelName}s`}
                          schema={schema}
                          title={title}
                          yupSchema={yupSchema}
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
                          endpoint={`${modelName}s`}
                          schema={schema}
                          title={title}
                          yupSchema={yupSchema}
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
