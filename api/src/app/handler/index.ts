import TerminalHandler from "./TerminalHandlers/TerminalHandler.js";
import TerminalByIdHandler from "./TerminalHandlers/TerminalByIdHandler.js";

export const Handlers: { [key: string]: any } = {
  Terminals: {
    TerminalById: TerminalByIdHandler,
    Terminal: TerminalHandler,
  },
};
