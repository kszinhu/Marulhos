import { EStatusCode, Handler, Request, Response } from "midori/http";
import { HTTPError } from "midori/errors";
import { Auth } from "midori/auth";
import { AuthServiceProvider } from "midori/providers";
import { Server } from "midori/app";

import { Prisma } from "@prisma/client";

import formatQueryParams from "src/utils/formatQueryParams.js";

import TerminalDao from "@core/dao/TerminalDAO.js";

export default class TerminalHandler extends Handler {
  #auth: Auth;

  constructor(server: Server) {
    super(server);

    this.#auth = server.services.get(AuthServiceProvider);
  }

  async get(req: Request): Promise<Response> {
    const query = formatQueryParams(req.query),
      data = await TerminalDao.all(query);

    return Response.json(data);
  }

  async post(req: Request): Promise<Response> {
    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", EStatusCode.BAD_REQUEST);
    }

    const data: Prisma.TerminalCreateInput = {
      capacity: req.parsedBody.capacity,
      flights: {
        connect: req.parsedBody.flights,
      },
    };

    const saved = await TerminalDao.create(data);

    if (!saved) {
      throw new HTTPError(
        "Failed to save Terminal.",
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
