import { EStatusCode, Handler, Request, Response } from "apiframework/http";
import { HTTPError } from "apiframework/errors";
import { Auth } from "apiframework/auth";
import { Server } from "apiframework/app";

import PlaneDAO from "@core/dao/PlaneDAO.js";

export default class PlaneHandler extends Handler {
  #auth = Auth;

  constructor(server: Server) {
    super(server);

    this.#auth = server.providers.get("Auth");
  }

  async get(req: Request): Promise<Response> {
    const data = await PlaneDAO.all();

    return Response.json(data);
  }

  async post(req: Request): Promise<Response> {
    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", EStatusCode.BAD_REQUEST);
    }

    const data = {
      ...req.parsedBody,
    };

    const saved = await PlaneDAO.create(data);
    if (!saved) {
      throw new HTTPError(
        "Failed to save Plane.",
        EStatusCode.INTERNAL_SERVER_ERROR
      );
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

    return Response.status(EStatusCode.METHOD_NOT_ALLOWED);
  }
}
