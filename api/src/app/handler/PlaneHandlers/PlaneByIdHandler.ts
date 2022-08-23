import { Handler, Request, Response } from "apiframework/http";
import { HTTPError } from "apiframework/errors";

import Plane from "../../models/Plane.js";

export default class PlaneByIdHandler extends Handler {
  async get(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", 400);
    }

    const plane = await Plane.get(parseInt(id));
    if (!plane) {
      throw new HTTPError("Plane not found.", 404);
    }

    return Response.json(plane);
  }

  async put(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", 400);
    }

    const plane = await Plane.get(parseInt(id));

    if (!plane) {
      throw new HTTPError("Plane not found.", 404);
    }

    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", 400);
    }

    plane.capacity = req.parsedBody.capacity;
    plane.model = req.parsedBody.model;
    plane.manufacture_date = req.parsedBody.manufacture_date;
    plane.company_cnpj = req.parsedBody.company_cnpj;

    const savedPlane = await Plane.save(plane.id, plane);

    return Response.json(savedPlane);
  }

  async delete(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", 400);
    }

    const plane = await Plane.get(parseInt(id));

    if (!plane) {
      throw new HTTPError("Plane not found.", 404);
    }

    await Plane.delete(plane.id);

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
