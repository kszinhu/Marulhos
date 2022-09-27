import { Server } from "apiframework/app";
import { HTTPError } from "apiframework/errors";
import { Hash } from "apiframework/hash";
import { EStatusCode, Handler, Request, Response } from "apiframework/http";

import UserDAO from "@core/dao/UserDAO.js";
import { Auth } from "apiframework/auth";

export default class AuthHandler extends Handler {
  #hash: Hash;
  #auth: Auth;

  constructor(server: Server) {
    super(server);

    this.#hash = server.providers.get("Hash");
    this.#auth = server.providers.get("Auth");
  }

  async register(req: Request): Promise<Response> {
    if (!req.parsedBody.username || !req.parsedBody.password) {
      throw new HTTPError("Invalid request.", EStatusCode.BAD_REQUEST);
    }

    const usernameAlreadyExists = await UserDAO.get({
      where: {
        username: req.parsedBody.username,
      },
    });

    if (usernameAlreadyExists) {
      throw new HTTPError("Username already taken.", EStatusCode.BAD_REQUEST);
    }

    const password = this.#hash.hash(req.parsedBody.password);

    await UserDAO.create({
      ...req.parsedBody, // optional data spread
      cpf: req.parsedBody.cpf,
      email: req.parsedBody.email,
      username: req.parsedBody.username,
      password,
      name: req.parsedBody.name,
      last_name: req.parsedBody.last_name,
      sex: req.parsedBody.sex,
      address_cep: req.parsedBody.address_cep,
      address_number: req.parsedBody.address_number,
    });

    return Response.status(EStatusCode.CREATED);
  }

  async user(req: Request): Promise<Response> {
    // Since the AuthBearer middleware is used, the user is already authenticated
    const user = this.#auth.user(req)!;

    return Response.json({ user, jwt: req.container.get("jwt") });
  }

  async handle(req: Request): Promise<Response> {
    if (req.path === "/api/auth/register/") {
      return await this.register(req);
    } else if (req.path === "/api/auth/user/") {
      return await this.user(req);
    }

    return Response.status(EStatusCode.NOT_FOUND);
  }
}
