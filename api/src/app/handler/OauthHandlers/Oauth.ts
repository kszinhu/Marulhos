import { EStatusCode, Handler, Request, Response } from "midori/http";
import { HTTPError } from "midori/errors";
import { Payload } from "midori/util/jwt.js";
import { generateUUID } from "midori/util/uuid.js";
import { Server } from "midori/app";
import { AuthServiceProvider, JWTServiceProvider } from "midori/providers";
import { JWT } from "midori/jwt";

import { Auth, User } from "midori/auth";

export default class Oauth2Handler extends Handler {
  #jwt: JWT;
  #auth: Auth;

  constructor(server: Server) {
    super(server);

    this.#jwt = server.services.get(JWTServiceProvider);
    this.#auth = server.services.get(AuthServiceProvider);
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
      scope: string;
    } = {
      iss: "http://localhost:3000",
      sub: user.id,
      exp: Math.ceil((issuedAt + expires) / 1000),
      iat: Math.floor(issuedAt / 1000),
      jti: generateUUID(),

      username: user.username,
      scope,
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
