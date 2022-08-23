import TerminalHandler from "./TerminalHandlers/TerminalHandler.js";
import TerminalByIdHandler from "./TerminalHandlers/TerminalByIdHandler.js";
import CompanyHandler from "./CompanyHandlers/CompanyHandler.js";
import CompanyByIdHandler from "./CompanyHandlers/CompanyByIdHandler.js";
import PlaneHandler from "./PlaneHandlers/PlaneHandler.js";
import PlaneByIdHandler from "./PlaneHandlers/PlaneByIdHandler.js";
import PilotHandler from "./PilotHandlers/PilotHandler.js";
import PilotByIdHandler from "./PilotHandlers/PilotByIdHandler.js";
import FlightByIdHandler from "./FlightHandlers/FlightByIdHandler.js";
import FlightHandler from "./FlightHandlers/FlightHandler.js";
import TicketHandler from "./TicketHandlers/TicketHandler.js";
import TicketByIdHandler from "./TicketHandlers/TicketByIdHandler.js";
import UserHandler from "./UserHandlers/UserHandler.js";
import UserByIdHandler from "./UserHandlers/UserByIdHandler.js";

export const Handlers: { [key: string]: any } = {
  Terminal: {
    TerminalById: TerminalByIdHandler,
    Terminal: TerminalHandler,
  },
  Company: {
    CompanyById: CompanyByIdHandler,
    Company: CompanyHandler,
  },
  Plane: {
    Plane: PlaneHandler,
    PlaneById: PlaneByIdHandler,
  },
  Pilot: {
    Pilot: PilotHandler,
    PilotById: PilotByIdHandler,
  },
  Flight: {
    FlightById: FlightByIdHandler,
    Flight: FlightHandler,
  },
  Ticket: {
    Ticket: TicketHandler,
    TicketById: TicketByIdHandler,
  },
  User: {
    User: UserHandler,
    UserById: UserByIdHandler,
  },
};
