import { Handler, Request, Response } from "apiframework/http";
import { HTTPError } from "apiframework/errors";

import Company from "../../models/Company.js";

export default class CompanyHandler extends Handler {
  async get(req: Request): Promise<Response> {
    const data = await Company.all();

    return Response.json(data);
  }

  async post(req: Request): Promise<Response> {
    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", 400);
    }

    const data = {
      cnpj: req.parsedBody.cnpj,
      name: req.parsedBody.name,
      contact: req.parsedBody.contact,
    };

    const saved = await Company.create(data);
    if (!saved) {
      throw new HTTPError("Failed to save Terminal.", 500);
    }

    return Response.json(data).withStatus(201);
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
