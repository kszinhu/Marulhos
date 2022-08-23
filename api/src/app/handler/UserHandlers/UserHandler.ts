import { Handler, Request, Response } from "apiframework/http";
import { HTTPError } from "apiframework/errors";

import User from "../../models/User.js";

export default class UserHandler extends Handler {
  async get(req: Request): Promise<Response> {
    const data = await User.all();

    return Response.json(data);
  }

  async post(req: Request): Promise<Response> {
    if (!req.parsedBody) {
      throw new HTTPError("Invalid body.", 400);
    }

    const data = {
      ...req.parsedBody,
    };

    const savedUser = await User.create(data);
    if (!savedUser) {
      throw new HTTPError("Failed to save a new User.", 500);
    }

    return Response.json(savedUser).withStatus(201);
  }

  async handle(req: Request): Promise<Response> {
    switch (req.method) {
      case "GET":
        return await this.get(req);

      case "POST":
        return await this.post(req);
    }

    return Response.status(405);
  }
}
