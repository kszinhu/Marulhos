import { EStatusCode, Handler, Request, Response } from "midori/http";
import { HTTPError } from "midori/errors";

import TicketDAO from "@core/dao/TicketDAO.js";
import formatQueryParams from "src/utils/formatQueryParams.js";

export default class TicketHandler extends Handler {
  async get(req: Request): Promise<Response> {
    const query = formatQueryParams(req.query),
      data = await TicketDAO.all(query);

    return Response.json(data);
  }

  async post(req: Request): Promise<Response> {
    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", EStatusCode.BAD_REQUEST);
    }

    const data = {
      ...req.parsedBody,
    };

    const savedTicket = await TicketDAO.create(data);
    if (!savedTicket) {
      throw new HTTPError(
        "Failed to save a new Ticket.",
        EStatusCode.INTERNAL_SERVER_ERROR
      );
    }

    return Response.json(savedTicket).withStatus(201);
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
