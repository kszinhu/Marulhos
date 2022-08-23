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
  Terminal: { Terminal, TerminalById },
  Company: { Company, CompanyById },
  Plane: { Plane, PlaneById },
  Pilot: { Pilot, PilotById },
  Flight: { Flight, FlightById },
  Ticket: { Ticket, TicketById },
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

Router.group("/companies", () => {
  Router.get("/", Company).withName("company.list");
  Router.post("/", Company).withName("company.create");

  Router.group("/{id}", () => {
    Router.get("/", CompanyById).withName("company.get");
    Router.put("/", CompanyById).withName("company.update");
    Router.patch("/", CompanyById).withName("company.patch");
    Router.delete("/", CompanyById).withName("company.delete");
  });
});

Router.group("/planes", () => {
  Router.get("/", Plane).withName("plane.list");
  Router.post("/", Plane).withName("plane.create");

  Router.group("/{id}", () => {
    Router.get("/", PlaneById).withName("plane.get");
    Router.put("/", PlaneById).withName("plane.update");
    Router.patch("/", PlaneById).withName("plane.patch");
    Router.delete("/", PlaneById).withName("plane.delete");
  });
});

Router.group("/pilots", () => {
  Router.get("/", Pilot).withName("pilot.list");
  Router.post("/", Pilot).withName("pilot.create");

  Router.group("/{id}", () => {
    Router.get("/", PilotById).withName("pilot.get");
    Router.put("/", PilotById).withName("pilot.update");
    Router.patch("/", PilotById).withName("pilot.patch");
    Router.delete("/", PilotById).withName("pilot.delete");
  });
});

Router.group("/flights", () => {
  Router.get("/", Flight).withName("flight.list");
  Router.post("/", Flight).withName("flight.create");

  Router.group("/{id}", () => {
    Router.get("/", FlightById).withName("flight.get");
    Router.put("/", FlightById).withName("flight.update");
    Router.patch("/", FlightById).withName("flight.patch");
    Router.delete("/", FlightById).withName("flight.delete");
  });
});

Router.group("/tickets", () => {
  Router.get("/", Ticket).withName("ticket.list");
  Router.post("/", Ticket).withName("ticket.create");

  Router.group("/{id}", () => {
    Router.get("/", TicketById).withName("ticket.get");
    Router.put("/", TicketById).withName("ticket.update");
    Router.patch("/", TicketById).withName("ticket.patch");
    Router.delete("/", TicketById).withName("ticket.delete");
  });
});

export default Router;
