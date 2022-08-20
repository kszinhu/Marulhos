import { Route, Routes } from "react-router-dom";
import { routes } from "../config/routes";

export default function ApplicationRouter() {
  return (
    <Routes>
      {routes.map(({ key, path, component: RouteComponent }) => (
        <Route key={key} path={path} element={<RouteComponent />} />
      ))}
    </Routes>
  );
}
