import { Router as RouterWrapper } from "midori/router";

import { Handlers } from "../handler/index.js";

import { AuthBearerMiddleware } from "midori/middlewares";
import OauthScopeMiddleware from "../middleware/OauthScopeMiddleware.js";

const OauthScopeMiddlewareAdmin = OauthScopeMiddleware({ scopes: ["admin"] });

const Router = new RouterWrapper();

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
  Oauth2Handler,
  AuthHandler: { Register: RegisterHandler, User: UserAuthHandler },
} = Handlers;

Router.group("/api", () => {
  Router.group("/auth", () => {
    Router.post("/register", RegisterHandler).withName("auth.register");
    Router.get("/user", UserAuthHandler, [AuthBearerMiddleware]).withName(
      "auth.user_info"
    );
  });

  Router.post("/oauth/token", Oauth2Handler).withName("oauth.login");

  Router.group(
    "/terminals",
    () => {
      Router.get("/", Terminal).withName("terminal.list");
      Router.post("/", Terminal).withName("terminal.create");

      Router.group("/{id}", () => {
        Router.get("/", TerminalById).withName("terminal.get");
        Router.put("/", TerminalById).withName("terminal.update");
        Router.delete("/", TerminalById).withName("terminal.delete");
      });
    },
    [AuthBearerMiddleware, OauthScopeMiddlewareAdmin]
  );

  Router.group(
    "/companies",
    () => {
      Router.get("/", Company).withName("company.list");
      Router.post("/", Company).withName("company.create");

      Router.group("/{cnpj}", () => {
        Router.get("/", CompanyById).withName("company.get");
        Router.put("/", CompanyById).withName("company.update");
        Router.delete("/", CompanyById).withName("company.delete");
      });
    },
    [AuthBearerMiddleware, OauthScopeMiddlewareAdmin]
  );

  Router.group(
    "/planes",
    () => {
      Router.get("/", Plane).withName("plane.list");
      Router.post("/", Plane).withName("plane.create");

      Router.group("/{id}", () => {
        Router.get("/", PlaneById).withName("plane.get");
        Router.put("/", PlaneById).withName("plane.update");
        Router.delete("/", PlaneById).withName("plane.delete");
      });
    },
    [AuthBearerMiddleware, OauthScopeMiddlewareAdmin]
  );

  Router.group(
    "/pilots",
    () => {
      Router.get("/", Pilot).withName("pilot.list");
      Router.post("/", Pilot).withName("pilot.create");

      Router.group("/{cpf}", () => {
        Router.get("/", PilotById).withName("pilot.get");
        Router.put("/", PilotById).withName("pilot.update");
        Router.delete("/", PilotById).withName("pilot.delete");
      });
    },
    [AuthBearerMiddleware, OauthScopeMiddlewareAdmin]
  );

  Router.group("/flights_scheduled", () => {
    Router.get("/", Flight).withName("flights_scheduled.list");
    Router.post("/", Flight, [OauthScopeMiddlewareAdmin]);

    Router.group("/{id}", () => {
      Router.get("/", FlightById).withName("flights_scheduled.get");
      Router.put("/", FlightById, [OauthScopeMiddlewareAdmin]).withName(
        "flights_scheduled.update"
      );
      Router.delete("/", FlightById, [OauthScopeMiddlewareAdmin]).withName(
        "flights_scheduled.delete"
      );
    });
  });

  Router.group(
    "/tickets",
    () => {
      Router.get("/", Ticket).withName("ticket.list");
      Router.post("/", Ticket, [OauthScopeMiddlewareAdmin]).withName(
        "ticket.create"
      );

      Router.group("/{id}", () => {
        Router.get("/", TicketById).withName("ticket.get");
        Router.put("/", TicketById, [OauthScopeMiddlewareAdmin]).withName(
          "ticket.update"
        );
        Router.delete("/", TicketById, [OauthScopeMiddlewareAdmin]).withName(
          "ticket.delete"
        );
      });
    },
    [AuthBearerMiddleware]
  );

  Router.group(
    "/users",
    () => {
      Router.get("/", User, [OauthScopeMiddlewareAdmin]).withName("user.list");

      Router.group("/{id}", () => {
        Router.get("/", UserById).withName("user.get");
        Router.put("/", UserById).withName("user.update");
        Router.delete("/", UserById, [OauthScopeMiddlewareAdmin]).withName(
          "user.delete"
        );
      });
    },
    [AuthBearerMiddleware]
  );

  Router.group(
    "/fly_attendants",
    () => {
      Router.get("/", FlyAttendant).withName("fly_attendant.list");
      Router.post("/", FlyAttendant).withName("fly_attendant.create");

      Router.group("/{cpf}", () => {
        Router.get("/", FlyAttendantById).withName("fly_attendant.get");
        Router.put("/", FlyAttendantById).withName("fly_attendant.update");
        Router.delete("/", FlyAttendantById).withName("fly_attendant.delete");
      });
    },
    [AuthBearerMiddleware, OauthScopeMiddlewareAdmin]
  );

  Router.group(
    "/flights",
    () => {
      Router.get("/", FlightInstance).withName("flight.list");
      Router.post("/", FlightInstance, [OauthScopeMiddlewareAdmin]).withName(
        "flight.create"
      );

      Router.group("/{id}", () => {
        Router.get("/", FlightInstanceById).withName("flight.get");
        Router.put("/", FlightInstanceById, [
          OauthScopeMiddlewareAdmin,
        ]).withName("flight.update");
        Router.delete("/", FlightInstanceById, [
          OauthScopeMiddlewareAdmin,
        ]).withName("flight.delete");
      });
    },
    [AuthBearerMiddleware]
  );
});

export default Router;
