import { Handler, Request, Response } from "apiframework/http";
import { HTTPError } from "apiframework/errors";

import Terminal from "../../models/terminal.js";

export default class TerminalByIdHandler extends Handler {
  async get(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", 400);
    }

    const terminal = await Terminal.get(parseInt(id));
    if (!terminal) {
      throw new HTTPError("Terminal not found.", 404);
    }

    return Response.json(terminal);
  }

  async put(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", 400);
    }

    const terminal = await Terminal.get(parseInt(id));

    if (!terminal) {
      throw new HTTPError("Terminal not found.", 404);
    }

    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", 400);
    }

    terminal.capacity = req.parsedBody;

    const savedTerminal = await Terminal.save(terminal.id, terminal);

    return Response.json(savedTerminal);
  }

  async delete(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", 400);
    }

    const terminal = await Terminal.get(parseInt(id));

    if (!terminal) {
      throw new HTTPError("Terminal not found.", 404);
    }

    await Terminal.delete(terminal.id);

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

    return Response.status(405);
  }
}
