import { EStatusCode, Handler, Request, Response } from "apiframework/http";
import { HTTPError } from "apiframework/errors";
import { Auth } from "apiframework/auth";
import { Server } from "apiframework/app";

import CompanyDAO from "@core/dao/CompanyDAO.js";

export default class CompanyHandler extends Handler {
  #auth: Auth;

  constructor(server: Server) {
    super(server);

    this.#auth = server.providers.get("Auth");
  }

  async get(req: Request): Promise<Response> {
    const data = await CompanyDAO.all();

    return Response.json(data);
  }

  async post(req: Request): Promise<Response> {
    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", EStatusCode.BAD_REQUEST);
    }

    const data = {
      cnpj: req.parsedBody.cnpj,
      name: req.parsedBody.name,
      contact: req.parsedBody.contact,
    };

    const saved = await CompanyDAO.create(data);
    if (!saved) {
      throw new HTTPError(
        "Failed to save Company.",
        EStatusCode.INTERNAL_SERVER_ERROR
      );
    }

    return Response.json(data).withStatus(EStatusCode.CREATED);
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
