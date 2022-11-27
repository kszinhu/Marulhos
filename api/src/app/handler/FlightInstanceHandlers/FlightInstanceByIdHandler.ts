import { EStatusCode, Handler, Request, Response } from "midori/http";
import { HTTPError } from "midori/errors";
import { Auth } from "midori/auth";
import { AuthServiceProvider } from "midori/providers";
import { Server } from "midori/app";

import FlightInstanceDAO from "@core/dao/FlightInstanceDAO.js";

export default class FlightInstanceByIdHandler extends Handler {
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

    const flight = await FlightInstanceDAO.get({ where: { id: Number(id) } });

    if (!flight) {
      throw new HTTPError("Flight Instance not found.", EStatusCode.NOT_FOUND);
    }

    return Response.json(flight);
  }

  async put(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", EStatusCode.BAD_REQUEST);
    }

    const flight = await FlightInstanceDAO.get({ where: { id: Number(id) } });

    if (!flight) {
      throw new HTTPError("Flight Instance not found.", EStatusCode.NOT_FOUND);
    }

    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", EStatusCode.BAD_REQUEST);
    }

    flight.departure_date = req.parsedBody.departure_date;
    flight.arrival_date = req.parsedBody.arrival_date;
    flight.terminal_id = req.parsedBody.terminal_id;
    flight.plane_id = req.parsedBody.plane_id;
    flight.flight_id = req.parsedBody.flight_id;
    flight.pilot_cpf = req.parsedBody.pilot_cpf;
    flight.copilot_cpf = req.parsedBody.copilot_cpf;

    const savedFlightInstance = await FlightInstanceDAO.save(flight.id, flight);

    return Response.json(savedFlightInstance);
  }

  async delete(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", EStatusCode.BAD_REQUEST);
    }

    const flight = await FlightInstanceDAO.get({ where: { id: Number(id) } });

    if (!flight) {
      throw new HTTPError("Flight Instance not found.", EStatusCode.NOT_FOUND);
    }

    await FlightInstanceDAO.delete(flight.id);

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
