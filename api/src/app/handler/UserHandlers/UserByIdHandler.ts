import { Handler, Request, Response } from "apiframework/http";
import { HTTPError } from "apiframework/errors";

import User from "../../models/User.js";

export default class UserByIdHandler extends Handler {
  async get(req: Request): Promise<Response> {
    const cpf = req.params.get("cpf");
    if (!cpf) {
      throw new HTTPError("Invalid CPF.", 400);
    }

    const user = await User.get(cpf);

    if (!user) {
      throw new HTTPError("User not found.", 404);
    }

    return Response.json(user);
  }

  async put(req: Request): Promise<Response> {
    const cpf = req.params.get("cpf");
    if (!cpf) {
      throw new HTTPError("Invalid CPF.", 400);
    }

    const user = await User.get(cpf);

    if (!user) {
      throw new HTTPError("User not found.", 404);
    }

    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", 400);
    }

    user.name = req.parsedBody.name;
    user.last_name = req.parsedBody.last_name;
    user.rg = req.parsedBody.rg;
    user.sex = req.parsedBody.sex;
    user.birth_date = req.parsedBody.birth_date;
    user.address_cep = req.parsedBody.address_cep;
    user.address_number = req.parsedBody.address_number;
    user.tickets = req.parsedBody.tickets;

    await User.save(user.cpf, user);

    return Response.json(user);
  }

  async delete(req: Request): Promise<Response> {
    const cpf = req.params.get("id");
    if (!cpf) {
      throw new HTTPError("Invalid CPF.", 400);
    }

    const user = await User.get(cpf);

    if (!user) {
      throw new HTTPError("User not found.", 404);
    }

    await User.delete(user.cpf);

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
