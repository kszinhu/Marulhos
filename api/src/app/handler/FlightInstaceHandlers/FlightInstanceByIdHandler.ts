import { Handler, Request, Response } from "apiframework/http";
import { HTTPError } from "apiframework/errors";

import FlightInstance from "../../models/FlightInstance.js";

export default class FlightInstanceByIdHandler extends Handler {
  async get(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", 400);
    }

    const flight = await FlightInstance.get(parseInt(id));

    if (!flight) {
      throw new HTTPError("Flight Instance not found.", 404);
    }

    return Response.json(flight);
  }

  async put(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", 400);
    }

    const flight = await FlightInstance.get(parseInt(id));

    if (!flight) {
      throw new HTTPError("Flight Instance not found.", 404);
    }

    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", 400);
    }

    flight.departure_date = req.parsedBody.departure_date;
    flight.arrival_date = req.parsedBody.arrival_date;
    flight.terminal_id = req.parsedBody.terminal_id;
    flight.plane = { ...req.parsedBody.plane };
    flight.flight = { ...req.parsedBody.flight };
    flight.pilot = { ...req.parsedBody.pilot };
    flight.copilot = { ...req.parsedBody.copilot };
    flight.tickets = { ...req.parsedBody.tickets };
    flight.fly_attendants = { ...req.parsedBody.fly_attendants };

    const savedFlightInstance = await FlightInstance.save(flight.id, flight);

    return Response.json(savedFlightInstance);
  }

  async delete(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", 400);
    }

    const flight = await FlightInstance.get(parseInt(id));

    if (!flight) {
      throw new HTTPError("Flight Instance not found.", 404);
    }

    await FlightInstance.delete(flight.id);

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
