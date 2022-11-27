import { EStatusCode, Handler, Request, Response } from "midori/http";
import { HTTPError } from "midori/errors";

import TicketDAO from "@core/dao/TicketDAO.js";

export default class TicketByIdHandler extends Handler {
  async get(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", EStatusCode.BAD_REQUEST);
    }

    const ticket = await TicketDAO.get({ where: { id: parseInt(id) } });

    if (!ticket) {
      throw new HTTPError("Ticket not found.", EStatusCode.NOT_FOUND);
    }

    return Response.json(ticket);
  }

  async put(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", EStatusCode.BAD_REQUEST);
    }

    const ticket = await TicketDAO.get({ where: { id: parseInt(id) } });

    if (!ticket) {
      throw new HTTPError("Ticket not found.", EStatusCode.NOT_FOUND);
    }

    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", EStatusCode.BAD_REQUEST);
    }

    ticket.price = req.parsedBody.price;
    ticket.passenger_id = req.parsedBody.passenger_id;
    ticket.flight_instance_id = req.parsedBody.flight_instance_id;

    const savedTicket = await TicketDAO.save(ticket.id, ticket);

    return Response.json(savedTicket);
  }

  async delete(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", EStatusCode.BAD_REQUEST);
    }

    const ticket = await TicketDAO.get({ where: { id: parseInt(id) } });

    if (!ticket) {
      throw new HTTPError("Ticket not found.", EStatusCode.NOT_FOUND);
    }

    await TicketDAO.delete(ticket.id);

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

    return Response.status(EStatusCode.METHOD_NOT_ALLOWED);
  }
}
