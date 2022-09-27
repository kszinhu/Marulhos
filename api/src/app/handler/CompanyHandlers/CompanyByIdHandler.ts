import { EStatusCode, Handler, Request, Response } from "apiframework/http";
import { HTTPError } from "apiframework/errors";
import { Auth } from "apiframework/auth";
import { Server } from "apiframework/app";

import CompanyDAO from "@core/dao/CompanyDAO.js";

export default class CompanyByIdHandler extends Handler {
  #auth: Auth;

  constructor(server: Server) {
    super(server);

    this.#auth = server.providers.get("Auth");
  }

  async get(req: Request): Promise<Response> {
    const cnpj = req.params.get("cnpj");
    if (!cnpj) {
      throw new HTTPError("Invalid CNPJ.", EStatusCode.BAD_REQUEST);
    }

    const company = await CompanyDAO.get({ where: { cnpj } });
    if (!company) {
      throw new HTTPError("Company not found.", EStatusCode.NOT_FOUND);
    }

    return Response.json(company);
  }

  async put(req: Request): Promise<Response> {
    const cnpj = req.params.get("cnpj");
    if (!cnpj) {
      throw new HTTPError("Invalid CNPJ.", EStatusCode.BAD_REQUEST);
    }

    const company = await CompanyDAO.get({ where: { cnpj } });
    if (!company) {
      throw new HTTPError("Company not found.", EStatusCode.NOT_FOUND);
    }

    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", EStatusCode.BAD_REQUEST);
    }

    company.name = req.parsedBody.name;
    company.contact = req.parsedBody.contact;

    const updatedCompany = await CompanyDAO.save(company.cnpj, company);

    return Response.json(updatedCompany);
  }

  async delete(req: Request): Promise<Response> {
    const cnpj = req.params.get("cnpj");
    if (!cnpj) {
      throw new HTTPError("Invalid CNPJ.", EStatusCode.BAD_REQUEST);
    }

    const company = await CompanyDAO.get({ where: { cnpj } });
    if (!company) {
      throw new HTTPError("Company not found.", EStatusCode.NOT_FOUND);
    }

    await CompanyDAO.delete(company.cnpj);

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
