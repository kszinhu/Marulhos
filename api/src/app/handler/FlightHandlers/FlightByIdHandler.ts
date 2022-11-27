import { EStatusCode, Handler, Request, Response } from "midori/http";
import { HTTPError } from "midori/errors";
import { Auth } from "midori/auth";
import { AuthServiceProvider } from "midori/providers";
import { Server } from "midori/app";

import FlightDAO from "@core/dao/FlightDAO.js";

export default class FlightByIdHandler extends Handler {
  #auth: Auth;

  constructor(server: Server) {
    super(server);

    this.#auth = server.services.get(AuthServiceProvider);
  }

  async get(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", EStatusCode.BAD_REQUEST);
    }

    const flight = await FlightDAO.get({ where: { id: Number(id) } });

    if (!flight) {
      throw new HTTPError("Flight not found.", EStatusCode.NOT_FOUND);
    }

    return Response.json(flight);
  }

  async put(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", EStatusCode.BAD_REQUEST);
    }

    const flight = await FlightDAO.get({ where: { id: Number(id) } });

    if (!flight) {
      throw new HTTPError("Flight not found.", EStatusCode.NOT_FOUND);
    }

    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", EStatusCode.BAD_REQUEST);
    }

    flight.estimated_departure_date = req.parsedBody.estimated_departure_date;
    flight.estimated_arrival_date = req.parsedBody.estimated_arrival_date;
    flight.origin = req.parsedBody.origin;
    flight.destination = req.parsedBody.destination;

    const savedFlight = await FlightDAO.save(flight.id, flight);

    return Response.json(savedFlight);
  }

  async delete(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", EStatusCode.BAD_REQUEST);
    }

    const flight = await FlightDAO.get({ where: { id: Number(id) } });

    if (!flight) {
      throw new HTTPError("Flight not found.", EStatusCode.NOT_FOUND);
    }

    await FlightDAO.delete(flight.id);

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
