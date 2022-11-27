import { Server } from "midori/app";
import { Auth } from "midori/auth";
import { AuthServiceProvider, HashServiceProvider } from "midori/providers";
import { HTTPError } from "midori/errors";
import { Hash } from "midori/hash";
import { EStatusCode, Handler, Request, Response } from "midori/http";

import UserDAO from "@core/dao/UserDAO.js";

export class Register extends Handler {
  #hash: Hash;

  constructor(server: Server) {
    super(server);

    this.#hash = server.services.get(HashServiceProvider);
  }

  async handle(req: Request): Promise<Response> {
    if (!req.parsedBody.username || !req.parsedBody.password) {
      throw new HTTPError("Invalid request.", EStatusCode.BAD_REQUEST);
    }

    const usernameAlreadyExists = await UserDAO.get({
      where: {
        username: req.parsedBody.username,
      },
    });

    if (usernameAlreadyExists) {
      console.log("Username already exists.");
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
}

export class User extends Handler {
  #auth: Auth;

  constructor(server: Server) {
    super(server);

    this.#auth = server.services.get(AuthServiceProvider);
  }

  async handle(req: Request): Promise<Response> {
    // Since the AuthBearer middleware is used, the user is already authenticated
    const user = this.#auth.user(req)!;

    return Response.json({ user, jwt: req.container.get("jwt") });
  }
}
