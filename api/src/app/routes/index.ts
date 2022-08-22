import { Router as RouterWrapper } from "apiframework/router";

import {
  HTTPErrorMiddleware,
  ParseBodyMiddleware,
} from "apiframework/middlewares";

import { Handlers } from "../handler/index.js";

/**
 * Routing
 *
 * Use the Router.get(), Router.post(), Router.put(), Router.patch, Router.delete() methods to define your routes
 * Use the Router.group() method to group routes under a common prefix
 * Use the Router.usePublicPath() method to define a public path to serve static files from
 */

const Router = new RouterWrapper();

Router.pipeline([ParseBodyMiddleware, HTTPErrorMiddleware]);

const {
  Terminals: { Terminal, TerminalById },
} = Handlers;

Router.group("/terminals", () => {
  Router.get("/", Terminal).withName("terminal.list");
  Router.post("/", Terminal).withName("terminal.create");

  Router.group("/{id}", () => {
    Router.get("/", TerminalById).withName("terminal.get");
    Router.put("/", TerminalById).withName("terminal.update");
    Router.patch("/", TerminalById).withName("terminal.patch");
    Router.delete("/", TerminalById).withName("terminal.delete");
  });
});

export default Router;
