import { Handler, Request, Response } from "apiframework/http";
import { HTTPError } from "apiframework/errors";

import Ticket from "../../models/Ticket.js";

export default class TicketHandler extends Handler {
  async get(req: Request): Promise<Response> {
    const data = await Ticket.all();

    return Response.json(data);
  }

  async post(req: Request): Promise<Response> {
    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", 400);
    }

    const data = {
      ...req.parsedBody,
    };

    const savedTicket = await Ticket.create(data);
    if (!savedTicket) {
      throw new HTTPError("Failed to save a new Ticket.", 500);
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
