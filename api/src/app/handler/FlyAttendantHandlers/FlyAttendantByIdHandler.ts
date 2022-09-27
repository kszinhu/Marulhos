import { EStatusCode, Handler, Request, Response } from "apiframework/http";
import { HTTPError } from "apiframework/errors";
import { Auth } from "apiframework/auth";
import { Server } from "apiframework/app";

import FlyAttendantDAO from "@core/dao/FlyAttendantDAO.js";

export default class FlyAttendantByIdHandler extends Handler {
  #auth: Auth;

  constructor(server: Server) {
    super(server);

    this.#auth = server.providers.get("Auth");
  }

  async get(req: Request): Promise<Response> {
    const cpf = req.params.get("cpf");
    if (!cpf) {
      throw new HTTPError("Invalid CPF.", EStatusCode.BAD_REQUEST);
    }

    const flyAttendant = await FlyAttendantDAO.get({ where: { cpf } });

    if (!flyAttendant) {
      throw new HTTPError("Fly Attendant not found.", EStatusCode.NOT_FOUND);
    }

    return Response.json(flyAttendant);
  }

  async put(req: Request): Promise<Response> {
    const cpf = req.params.get("cpf");
    if (!cpf) {
      throw new HTTPError("Invalid CPF.", EStatusCode.BAD_REQUEST);
    }

    const flyAttendant = await FlyAttendantDAO.get({ where: { cpf } });

    if (!flyAttendant) {
      throw new HTTPError("Fly Attendant not found.", EStatusCode.NOT_FOUND);
    }

    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", EStatusCode.BAD_REQUEST);
    }

    flyAttendant.name = req.parsedBody.name;
    flyAttendant.last_name = req.parsedBody.last_name;
    flyAttendant.rg = req.parsedBody.rg;
    flyAttendant.sex = req.parsedBody.sex;
    flyAttendant.birth_date = req.parsedBody.birth_date;
    flyAttendant.address_cep = req.parsedBody.address_cep;
    flyAttendant.address_number = req.parsedBody.address_number;
    flyAttendant.salary = req.parsedBody.salary;
    flyAttendant.vaccination_number = req.parsedBody.vaccination_number;
    flyAttendant.work_registration_number =
      req.parsedBody.work_registration_number;

    const savedFlyAttendant = await FlyAttendantDAO.save(
      flyAttendant.cpf,
      flyAttendant
    );

    return Response.json(savedFlyAttendant);
  }

  async delete(req: Request): Promise<Response> {
    const cpf = req.params.get("cpf");
    if (!cpf) {
      throw new HTTPError("Invalid CPF.", EStatusCode.BAD_REQUEST);
    }

    const flyAttendant = await FlyAttendantDAO.get({ where: { cpf } });

    if (!flyAttendant) {
      throw new HTTPError("Fly Attendant not found.", EStatusCode.NOT_FOUND);
    }

    await FlyAttendantDAO.delete(flyAttendant.cpf);

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
