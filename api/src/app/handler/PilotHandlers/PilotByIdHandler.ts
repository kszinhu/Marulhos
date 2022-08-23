import { Handler, Request, Response } from "apiframework/http";
import { HTTPError } from "apiframework/errors";

import Pilot from "../../models/Pilot.js";

export default class PilotByIdHandler extends Handler {
  async get(req: Request): Promise<Response> {
    const cpf = req.params.get("cpf");
    if (!cpf) {
      throw new HTTPError("Invalid CPF.", 400);
    }

    const pilot = await Pilot.get(cpf);
    if (!pilot) {
      throw new HTTPError("Pilot not found.", 404);
    }

    return Response.json(pilot);
  }

  async put(req: Request): Promise<Response> {
    const cpf = req.params.get("cpf");
    if (!cpf) {
      throw new HTTPError("Invalid CPF.", 400);
    }

    const pilot = await Pilot.get(cpf);

    if (!pilot) {
      throw new HTTPError("Pilot not found.", 404);
    }

    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", 400);
    }

    pilot.cpf = req.parsedBody.cpf;
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
    pilot.flights = req.parsedBody.flights;
    pilot.co_flights = req.parsedBody.co_flights;
    pilot.sex = req.parsedBody.sex;

    await Pilot.save(pilot.cpf, pilot);

    return Response.json(pilot);
  }

  async delete(req: Request): Promise<Response> {
    const cpf = req.params.get("cpf");
    if (!cpf) {
      throw new HTTPError("Invalid CPF.", 400);
    }

    const pilot = await Pilot.get(cpf);

    if (!pilot) {
      throw new HTTPError("Pilot not found.", 404);
    }

    await Pilot.delete(pilot.cpf);

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
