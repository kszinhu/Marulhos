import { EStatusCode, Handler, Request, Response } from "midori/http";
import { HTTPError } from "midori/errors";
import { Auth } from "midori/auth";
import { AuthServiceProvider } from "midori/providers";
import { Server } from "midori/app";

import FlightInstanceDAO from "@core/dao/FlightInstanceDAO.js";
import formatQueryParams from "@utils/formatQueryParams.js";

export default class FlightInstanceHandler extends Handler {
  #auth: Auth;

  constructor(server: Server) {
    super(server);

    this.#auth = server.services.get(AuthServiceProvider);
  }

  async get(req: Request): Promise<Response> {
    const query = formatQueryParams(req.query),
      data = await FlightInstanceDAO.all(query);

    return Response.json(data);
  }

  async post(req: Request): Promise<Response> {
    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", EStatusCode.BAD_REQUEST);
    }

    const data = {
      ...req.parsedBody,
    };

    const saved = await FlightInstanceDAO.create(data);
    if (!saved) {
      throw new HTTPError(
        "Failed to save a new Flight Instance.",
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
