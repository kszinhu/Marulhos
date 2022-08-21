import { Route, Routes } from "react-router-dom";

import { routes as applicationRoutes } from "../config/routes";

import * as layouts from "./layouts";

export default function ApplicationRouter() {
  return (
    <Routes>
      {applicationRoutes.map(({ layout, routes }) => {
        const layoutComponent = (layouts as any)[layout];
        const isManagerRoute = layout === "manager";

        return (
          <Route
            key={layout}
            element={layoutComponent}
            {...(isManagerRoute ? { path: "/manager" } : {})}
          >
            {routes.map(
              ({
                path,
                key,
                title,
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
                    element={
                      <Component
                        schema={schema}
                        title={title}
                        yupSchema={yupSchema}
                      />
                    }
                    index={index}
                    {...(exact ? { exact: true } : {})} // Conditionally add the exact prop to the Route element
                  />
                ) : (
                  <Route
                    key={key}
                    path={path}
                    element={
                      <Component.List
                        schema={schema}
                        title={title}
                        yupSchema={yupSchema}
                      />
                    }
                    index={index}
                    {...(exact ? { exact: true } : {})} // Conditionally add the exact prop to the Route element
                  >
                    <Route
                      key={key}
                      path={`:id`}
                      element={
                        <Component.View
                          schema={schema}
                          title={title}
                          yupSchema={yupSchema}
                        />
                      }
                      index={index}
                      {...(exact ? { exact: true } : {})} // Conditionally add the exact prop to the Route element
                    />
                    <Route
                      key={key}
                      path={`:id/edit`}
                      element={
                        <Component.Edit
                          schema={schema}
                          title={title}
                          yupSchema={yupSchema}
                        />
                      }
                      index={index}
                      {...(exact ? { exact: true } : {})} // Conditionally add the exact prop to the Route element
                    />
                    <Route
                      key={key}
                      path={"add"}
                      element={
                        <Component.Add
                          schema={schema}
                          title={title}
                          yupSchema={yupSchema}
                        />
                      }
                      index={index}
                      {...(exact ? { exact: true } : {})} // Conditionally add the exact prop to the Route element
                    />
                  </Route>
                )
            )}
          </Route>
        );
      })}
    </Routes>
  );
}
