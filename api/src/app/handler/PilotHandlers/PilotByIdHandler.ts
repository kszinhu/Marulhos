import { EStatusCode, Handler, Request, Response } from "apiframework/http";
import { HTTPError } from "apiframework/errors";
import { Auth } from "apiframework/auth";
import { Server } from "apiframework/app";

import PilotDAO from "@core/dao/PilotDAO.js";

export default class PilotByIdHandler extends Handler {
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

    const pilot = await PilotDAO.get({ where: { cpf } });
    if (!pilot) {
      throw new HTTPError("Pilot not found.", EStatusCode.NOT_FOUND);
    }

    return Response.json(pilot);
  }

  async put(req: Request): Promise<Response> {
    const cpf = req.params.get("cpf");
    if (!cpf) {
      throw new HTTPError("Invalid CPF.", EStatusCode.BAD_REQUEST);
    }

    const pilot = await PilotDAO.get({ where: { cpf } });

    if (!pilot) {
      throw new HTTPError("Pilot not found.", EStatusCode.NOT_FOUND);
    }

    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", EStatusCode.BAD_REQUEST);
    }

    pilot.name = req.parsedBody.name;
    pilot.last_name = req.parsedBody.last_name;
    pilot.rg = req.parsedBody.rg;
    pilot.birth_date = req.parsedBody.birth_date;
    pilot.address_cep = req.parsedBody.address_cep;
    pilot.address_number = req.parsedBody.address_number;
    pilot.salary = req.parsedBody.salary;
    pilot.vaccination_number = req.parsedBody.vaccination_number;
    pilot.passport_number = req.parsedBody.passport_number;
    pilot.work_registration_number = req.parsedBody.work_registration_number;
    pilot.pilot_license_number = req.parsedBody.pilot_license_number;
    pilot.sex = req.parsedBody.sex;

    const savedPilot = await PilotDAO.save(pilot.cpf, pilot);

    return Response.json(savedPilot);
  }

  async delete(req: Request): Promise<Response> {
    const cpf = req.params.get("cpf");
    if (!cpf) {
      throw new HTTPError("Invalid CPF.", EStatusCode.BAD_REQUEST);
    }

    const pilot = await PilotDAO.get({ where: { cpf } });

    if (!pilot) {
      throw new HTTPError("Pilot not found.", EStatusCode.NOT_FOUND);
    }

    await PilotDAO.delete(pilot.cpf);

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
