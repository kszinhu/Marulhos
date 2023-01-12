import { EStatusCode, Handler, Request, Response } from "midori/http";
import { HTTPError } from "midori/errors";
import { Auth } from "midori/auth";
import { AuthServiceProvider } from "midori/providers";
import { Server } from "midori/app";

import PlaneDAO from "@core/dao/PlaneDAO.js";
import CompanyDAO from "@core/dao/CompanyDAO.js";
import { parseRelation } from "../../../utils/parsers.js";

export default class PlaneHandler extends Handler {
  #auth: Auth;

  constructor(server: Server) {
    super(server);

    this.#auth = server.services.get(AuthServiceProvider);
  }

  async get(req: Request): Promise<Response> {
    const data = await PlaneDAO.all();

    return Response.json(data);
  }

  async post(req: Request): Promise<Response> {
    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", EStatusCode.BAD_REQUEST);
    }

    req.parsedBody.manufacture_date = new Date(req.parsedBody.manufacture_date);

    const data = parseRelation({ model: CompanyDAO, name: "company" }, req.parsedBody);

    const saved = await PlaneDAO.create(data);
    if (!saved) {
      throw new HTTPError(
        "Failed to save Plane.",
        EStatusCode.INTERNAL_SERVER_ERROR
      );
    }

    return Response.json(saved).withStatus(201);
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
