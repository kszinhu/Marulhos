import { EStatusCode, Handler, Request, Response } from "midori/http";
import { HTTPError } from "midori/errors";
import { Auth } from "midori/auth";
import { AuthServiceProvider } from "midori/providers";
import { Server } from "midori/app";

import CompanyDAO from "@core/dao/CompanyDAO.js";

export default class CompanyHandler extends Handler {
  #auth: Auth;

  constructor(server: Server) {
    super(server);

    this.#auth = server.services.get(AuthServiceProvider);
  }

  async get(req: Request): Promise<Response> {
    const pagination = JSON.parse(req.query.get("meta") ?? "{}");
    const data = await CompanyDAO.all(pagination);

    return Response.json(data)
  }

  async post(req: Request): Promise<Response> {
    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", EStatusCode.BAD_REQUEST);
    }

    const saved = await CompanyDAO.create(req.parsedBody);

    if (!saved) {
      throw new HTTPError(
        "Failed to save Company.",
        EStatusCode.INTERNAL_SERVER_ERROR
      );
    }

    return Response.json(saved).withStatus(EStatusCode.CREATED);
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
