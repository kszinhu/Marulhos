import { EStatusCode, Handler, Request, Response } from "midori/http";
import { HTTPError } from "midori/errors";
import { Auth } from "midori/auth";
import { AuthServiceProvider } from "midori/providers";
import { Server } from "midori/app";

import TerminalDAO from "@core/dao/TerminalDAO.js";

export default class TerminalByIdHandler extends Handler {
  #auth: Auth;

  constructor(server: Server) {
    super(server);

    this.#auth = server.services.get(AuthServiceProvider);
  }

  async get(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", EStatusCode.BAD_REQUEST);
    }

    const terminal = await TerminalDAO.get({ where: { id: parseInt(id) } });
    if (!terminal) {
      throw new HTTPError("Terminal not found.", EStatusCode.NOT_FOUND);
    }

    return Response.json(terminal);
  }

  async put(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", EStatusCode.BAD_REQUEST);
    }

    const terminal = await TerminalDAO.get({ where: { id: parseInt(id) } });

    if (!terminal) {
      throw new HTTPError("Terminal not found.", EStatusCode.NOT_FOUND);
    }

    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", EStatusCode.BAD_REQUEST);
    }

    terminal.capacity = req.parsedBody;

    const savedTerminal = await TerminalDAO.save(terminal.id, terminal);

    return Response.json(savedTerminal);
  }

  async delete(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", EStatusCode.BAD_REQUEST);
    }

    const terminal = await TerminalDAO.get({ where: { id: parseInt(id) } });

    if (!terminal) {
      throw new HTTPError("Terminal not found.", EStatusCode.NOT_FOUND);
    }

    await TerminalDAO.delete(terminal.id);

    return Response.empty();
  }

  async handle(req: Request): Promise<Response> {
    switch (req.method) {
      case "GET":
        return await this.get(req);

      case "PUT":
        return await this.put(req);

      case "DELETE":
        return await this.delete(req);
    }

    return Response.status(EStatusCode.METHOD_NOT_ALLOWED);
  }
}
