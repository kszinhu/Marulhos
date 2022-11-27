import { EStatusCode, Handler, Request, Response } from "midori/http";
import { HTTPError } from "midori/errors";
import { Auth } from "midori/auth";
import { AuthServiceProvider } from "midori/providers";
import { Server } from "midori/app";

import PlaneDAO from "@core/dao/PlaneDAO.js";

export default class PlaneByIdHandler extends Handler {
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

    const plane = await PlaneDAO.get({ where: { id: parseInt(id) } });
    if (!plane) {
      throw new HTTPError("Plane not found.", EStatusCode.NOT_FOUND);
    }

    return Response.json(plane);
  }

  async put(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", EStatusCode.BAD_REQUEST);
    }

    const plane = await PlaneDAO.get({ where: { id: parseInt(id) } });

    if (!plane) {
      throw new HTTPError("Plane not found.", EStatusCode.NOT_FOUND);
    }

    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", EStatusCode.BAD_REQUEST);
    }

    plane.capacity = req.parsedBody.capacity;
    plane.model = req.parsedBody.model;
    plane.manufacture_date = req.parsedBody.manufacture_date;
    plane.company_cnpj = req.parsedBody.company_cnpj;

    const savedPlane = await PlaneDAO.save(plane.id, plane);

    return Response.json(savedPlane);
  }

  async delete(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", EStatusCode.BAD_REQUEST);
    }

    const plane = await PlaneDAO.get({ where: { id: parseInt(id) } });

    if (!plane) {
      throw new HTTPError("Plane not found.", EStatusCode.NOT_FOUND);
    }

    await PlaneDAO.delete(plane.id);

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
