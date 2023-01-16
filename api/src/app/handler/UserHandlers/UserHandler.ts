import { EStatusCode, Handler, Request, Response } from "midori/http";
import { HTTPError } from "midori/errors";

import UserDAO from "@core/dao/UserDAO.js";
import formatQueryParams from "src/utils/formatQueryParams.js";

export default class UserHandler extends Handler {
  async get(req: Request): Promise<Response> {
    const query = formatQueryParams(req.query),
      data = await UserDAO.all(query);

    return Response.json(data);
  }

  async post(req: Request): Promise<Response> {
    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", EStatusCode.BAD_REQUEST);
    }

    const data = {
      ...req.parsedBody,
    };

    const savedUser = await UserDAO.create(data);
    if (!savedUser) {
      throw new HTTPError(
        "Failed to save a new User.",
        EStatusCode.INTERNAL_SERVER_ERROR
      );
    }

    return Response.json(savedUser).withStatus(EStatusCode.CREATED);
  }

  async handle(req: Request): Promise<Response> {
    switch (req.method) {
      case "GET":
        return await this.get(req);

      case "POST":
        return await this.post(req);
    }

    return Response.status(EStatusCode.METHOD_NOT_ALLOWED);
  }
}
