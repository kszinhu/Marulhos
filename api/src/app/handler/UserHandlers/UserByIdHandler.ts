import { EStatusCode, Handler, Request, Response } from "apiframework/http";
import { HTTPError } from "apiframework/errors";

import UserDAO from "@core/dao/UserDAO.js";

export default class UserByIdHandler extends Handler {
  async get(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", EStatusCode.BAD_REQUEST);
    }

    const user = await UserDAO.get({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      throw new HTTPError("User not found.", EStatusCode.NOT_FOUND);
    }

    return Response.json(user);
  }

  async put(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", EStatusCode.BAD_REQUEST);
    }

    const user = await UserDAO.get({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      throw new HTTPError("User not found.", EStatusCode.NOT_FOUND);
    }

    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", EStatusCode.BAD_REQUEST);
    }

    user.name = req.parsedBody.name;
    user.last_name = req.parsedBody.last_name;
    user.rg = req.parsedBody.rg;
    user.sex = req.parsedBody.sex;
    user.birth_date = req.parsedBody.birth_date;
    user.address_cep = req.parsedBody.address_cep;
    user.address_number = req.parsedBody.address_number;
    user.id = req.parsedBody.id;

    const savedUser = await UserDAO.save(user.id, user);

    return Response.json(savedUser);
  }

  async delete(req: Request): Promise<Response> {
    const id = req.params.get("id");
    if (!id) {
      throw new HTTPError("Invalid ID.", EStatusCode.BAD_REQUEST);
    }

    const user = await UserDAO.get({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      throw new HTTPError("User not found.", EStatusCode.NOT_FOUND);
    }

    await UserDAO.delete(user.id);

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
