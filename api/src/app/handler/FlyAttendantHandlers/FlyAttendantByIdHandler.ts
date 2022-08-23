import { Handler, Request, Response } from "apiframework/http";
import { HTTPError } from "apiframework/errors";

import FlyAttendant from "../../models/FlyAttendant.js";

export default class FlyAttendantByIdHandler extends Handler {
  async get(req: Request): Promise<Response> {
    const cpf = req.params.get("cpf");
    if (!cpf) {
      throw new HTTPError("Invalid CPF.", 400);
    }

    const flight = await FlyAttendant.get(cpf);

    if (!flight) {
      throw new HTTPError("Fly Attendant not found.", 404);
    }

    return Response.json(flight);
  }

  async put(req: Request): Promise<Response> {
    const cpf = req.params.get("cpf");
    if (!cpf) {
      throw new HTTPError("Invalid CPF.", 400);
    }

    const flyAttendant = await FlyAttendant.get(cpf);

    if (!flyAttendant) {
      throw new HTTPError("Fly Attendant not found.", 404);
    }

    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", 400);
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
    flyAttendant.flights = req.parsedBody.flights;

    await FlyAttendant.save(flyAttendant.cpf, flyAttendant);

    return Response.json(flyAttendant);
  }

  async delete(req: Request): Promise<Response> {
    const cpf = req.params.get("cpf");
    if (!cpf) {
      throw new HTTPError("Invalid CPF.", 400);
    }

    const flight = await FlyAttendant.get(cpf);

    if (!flight) {
      throw new HTTPError("Fly Attendant not found.", 404);
    }

    await FlyAttendant.delete(flight.cpf);

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
