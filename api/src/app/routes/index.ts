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
  User: { User, UserById },
  FlyAttendant: { FlyAttendant, FlyAttendantById },
  FlightInstance: { FlightInstance, FlightInstanceById },
} = Handlers;

Router.group("/terminals", () => {
  Router.get("/", Terminal).withName("terminal.list");
  Router.post("/", Terminal).withName("terminal.create");

  Router.group("/{id}", () => {
    Router.get("/", TerminalById).withName("terminal.get");
    Router.put("/", TerminalById).withName("terminal.update");
    Router.delete("/", TerminalById).withName("terminal.delete");
  });
});

Router.group("/companies", () => {
  Router.get("/", Company).withName("company.list");
  Router.post("/", Company).withName("company.create");

  Router.group("/{cnpj}", () => {
    Router.get("/", CompanyById).withName("company.get");
    Router.put("/", CompanyById).withName("company.update");
    Router.delete("/", CompanyById).withName("company.delete");
  });
});

Router.group("/planes", () => {
  Router.get("/", Plane).withName("plane.list");
  Router.post("/", Plane).withName("plane.create");

  Router.group("/{id}", () => {
    Router.get("/", PlaneById).withName("plane.get");
    Router.put("/", PlaneById).withName("plane.update");
    Router.delete("/", PlaneById).withName("plane.delete");
  });
});

Router.group("/pilots", () => {
  Router.get("/", Pilot).withName("pilot.list");
  Router.post("/", Pilot).withName("pilot.create");

  Router.group("/{cpf}", () => {
    Router.get("/", PilotById).withName("pilot.get");
    Router.put("/", PilotById).withName("pilot.update");
    Router.delete("/", PilotById).withName("pilot.delete");
  });
});

Router.group("/flights_scheduled", () => {
  Router.get("/", Flight).withName("flights_scheduled.list");
  Router.post("/", Flight).withName("flights_scheduled.create");

  Router.group("/{id}", () => {
    Router.get("/", FlightById).withName("flights_scheduled.get");
    Router.put("/", FlightById).withName("flights_scheduled.update");
    Router.delete("/", FlightById).withName("flights_scheduled.delete");
  });
});

Router.group("/tickets", () => {
  Router.get("/", Ticket).withName("ticket.list");
  Router.post("/", Ticket).withName("ticket.create");

  Router.group("/{id}", () => {
    Router.get("/", TicketById).withName("ticket.get");
    Router.put("/", TicketById).withName("ticket.update");
    Router.delete("/", TicketById).withName("ticket.delete");
  });
});

Router.group("/users", () => {
  Router.get("/", User).withName("user.list");
  Router.post("/", User).withName("user.create");

  Router.group("/{cpf}", () => {
    Router.get("/", UserById).withName("user.get");
    Router.put("/", UserById).withName("user.update");
    Router.delete("/", UserById).withName("user.delete");
  });
});

Router.group("/fly_attendants", () => {
  Router.get("/", FlyAttendant).withName("fly_attendant.list");
  Router.post("/", FlyAttendant).withName("fly_attendant.create");

  Router.group("/{cpf}", () => {
    Router.get("/", FlyAttendantById).withName("fly_attendant.get");
    Router.put("/", FlyAttendantById).withName("fly_attendant.update");
    Router.delete("/", FlyAttendantById).withName("fly_attendant.delete");
  });
});

Router.group("/flights", () => {
  Router.get("/", FlightInstance).withName("flight.list");
  Router.post("/", FlightInstance).withName("flight.create");

  Router.group("/{id}", () => {
    Router.get("/", FlightInstanceById).withName("flight.get");
    Router.put("/", FlightInstanceById).withName("flight.update");
    Router.delete("/", FlightInstanceById).withName("flight.delete");
  });
});

export default Router;
