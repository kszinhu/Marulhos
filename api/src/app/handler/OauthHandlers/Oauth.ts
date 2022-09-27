import { EStatusCode, Handler, Request, Response } from "apiframework/http";
import { HTTPError } from "apiframework/errors";
import { Payload } from "apiframework/util/jwt.js";
import { generateUUID } from "apiframework/util/uuid.js";
import { Server } from "apiframework/app";
import { JWT } from "apiframework/jwt";

import { Auth, User } from "apiframework/auth";

export default class Oauth2Handler extends Handler {
  #jwt: JWT;
  #auth: Auth;

  constructor(server: Server) {
    super(server);

    this.#jwt = server.providers.get("JWT");
    this.#auth = server.providers.get("Auth");
  }

  async handlePasswordGrant(req: Request): Promise<Response> {
    if (
      (!req.parsedBody.username && !req.parsedBody.email) ||
      !req.parsedBody.password
    ) {
      throw new HTTPError("Invalid request.", EStatusCode.BAD_REQUEST);
    }

    const user: (User & { email?: string }) | null = await this.#auth.attempt(
      req.parsedBody.username,
      req.parsedBody.password
    );

    if (!user) {
      throw new HTTPError(
        "Wrong username or password.",
        EStatusCode.BAD_REQUEST
      );
    }

    const scope = req.parsedBody.scope || "";

    const issuedAt = Date.now();
    const expires = 1000 * 60 * 60 * 1; // 1 hour

    const data: Payload & {
      username: string;
      // email: string;
      scopes: string[];
    } = {
      iss: "http://localhost:3000",
      sub: user.id,
      exp: Math.ceil((issuedAt + expires) / 1000),
      iat: Math.floor(issuedAt / 1000),
      jti: generateUUID(),

      // email: user.email!,
      username: user.username,
      scopes: scope.split(" "),
    };

    const jwt = this.#jwt.sign(data);

    return Response.json({
      access_token: jwt,
      expires_in: expires / 1000,
      token_type: "Bearer",
      scope,
    }).withStatus(EStatusCode.CREATED);
  }

  async handleRefreshTokenGrant(req: Request): Promise<Response> {
    throw new HTTPError("Invalid request.", EStatusCode.UNAUTHORIZED);
  }

  async handle(req: Request): Promise<Response> {
    if (!req.parsedBody || !req.parsedBody.grant_type) {
      throw new HTTPError("Invalid request.", EStatusCode.UNAUTHORIZED);
    }

    switch (req.parsedBody.grant_type) {
      case "password":
        return await this.handlePasswordGrant(req);
      case "refresh_token":
        return await this.handleRefreshTokenGrant(req);
    }

    throw new HTTPError("Invalid request.", EStatusCode.UNAUTHORIZED);
  }
}
