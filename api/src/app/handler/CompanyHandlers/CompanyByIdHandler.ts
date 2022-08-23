import { Handler, Request, Response } from "apiframework/http";
import { HTTPError } from "apiframework/errors";

import Company from "../../models/Company.js";

export default class CompanyByIdHandler extends Handler {
  async get(req: Request): Promise<Response> {
    const cnpj = req.params.get("cnpj");
    if (!cnpj) {
      throw new HTTPError("Invalid CNPJ.", 400);
    }

    const company = await Company.get(cnpj);
    if (!company) {
      throw new HTTPError("Company not found.", 404);
    }

    return Response.json(company);
  }

  async put(req: Request): Promise<Response> {
    const cnpj = req.params.get("cnpj");
    if (!cnpj) {
      throw new HTTPError("Invalid CNPJ.", 400);
    }

    const company = await Company.get(cnpj);

    if (!company) {
      throw new HTTPError("Company not found.", 404);
    }

    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", 400);
    }

    company.cnpj = req.parsedBody.cnpj;
    company.name = req.parsedBody.name;
    company.contact = req.parsedBody.contact;
    company.planes = req.parsedBody.planes;

    await Company.save(company.cnpj, company);

    return Response.json(company);
  }

  async delete(req: Request): Promise<Response> {
    const cnpj = req.params.get("cnpj");
    if (!cnpj) {
      throw new HTTPError("Invalid CNPJ.", 400);
    }

    const company = await Company.get(cnpj);

    if (!company) {
      throw new HTTPError("Company not found.", 404);
    }

    await Company.delete(company.cnpj);

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
