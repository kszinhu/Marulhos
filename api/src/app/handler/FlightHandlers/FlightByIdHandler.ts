import { Handler, Request, Response } from "apiframework/http";
import { HTTPError } from "apiframework/errors";

import Flight from "../../models/Flight.js";

export default class FlightByIdHandler extends Handler {
  async get(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", 400);
    }

    const flight = await Flight.get(parseInt(id));

    if (!flight) {
      throw new HTTPError("Flight not found.", 404);
    }

    return Response.json(flight);
  }

  async put(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", 400);
    }

    const flight = await Flight.get(parseInt(id));

    if (!flight) {
      throw new HTTPError("Flight not found.", 404);
    }

    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", 400);
    }

    flight.estimated_departure_date = req.parsedBody.estimated_departure_date;
    flight.estimated_arrival_date = req.parsedBody.estimated_arrival_date;
    flight.origin = req.parsedBody.origin;
    flight.destination = req.parsedBody.destination;

    const savedFlight = await Flight.save(flight.id, flight);

    return Response.json(savedFlight);
  }

  async delete(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", 400);
    }

    const flight = await Flight.get(parseInt(id));

    if (!flight) {
      throw new HTTPError("Flight not found.", 404);
    }

    await Flight.delete(flight.id);

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
