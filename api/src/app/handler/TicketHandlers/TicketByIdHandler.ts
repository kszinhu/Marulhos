import { Handler, Request, Response } from "apiframework/http";
import { HTTPError } from "apiframework/errors";

import Ticket from "../../models/Ticket.js";

export default class TicketByIdHandler extends Handler {
  async get(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", 400);
    }

    const ticket = await Ticket.get(parseInt(id));

    if (!ticket) {
      throw new HTTPError("Ticket not found.", 404);
    }

    return Response.json(ticket);
  }

  async put(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", 400);
    }

    const ticket = await Ticket.get(parseInt(id));

    if (!ticket) {
      throw new HTTPError("Ticket not found.", 404);
    }

    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", 400);
    }

    ticket.price = req.parsedBody.price;
    ticket.passenger_cpf = req.parsedBody.passenger_cpf;
    ticket.flight_instance_id = req.parsedBody.flight_instance;

    await Ticket.save(ticket.id, ticket);

    return Response.json(ticket);
  }

  async delete(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", 400);
    }

    const ticket = await Ticket.get(parseInt(id));

    if (!ticket) {
      throw new HTTPError("Ticket not found.", 404);
    }

    await Ticket.delete(ticket.id);

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
