import { Handler, Request, Response } from "apiframework/http";
import { HTTPError } from "apiframework/errors";
import { Auth } from "apiframework/auth";
import { Server } from "apiframework/app";

import PilotDAO from "@core/dao/PilotDAO.js";

export default class PilotHandler extends Handler {
  #auth: Auth;

  constructor(server: Server) {
    super(server);

    this.#auth = server.providers.get("Auth");
  }

  async get(req: Request): Promise<Response> {
    const data = await PilotDAO.all();

    return Response.json(data);
  }

  async post(req: Request): Promise<Response> {
    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", 400);
    }

    const data = {
      ...req.parsedBody,
    };

    const saved = await PilotDAO.create(data);
    if (!saved) {
      throw new HTTPError("Failed to save Pilot.", 500);
    }

    return Response.json(data).withStatus(201);
  }

  async handle(req: Request): Promise<Response> {
    switch (req.method) {
      case "GET":
        return await this.get(req);

      case "POST":
        return await this.post(req);
    }

    return Response.status(405);
  }
}
