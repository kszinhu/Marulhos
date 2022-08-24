import { Server } from "apiframework/app";
import { Middleware, Request, Response } from "apiframework/http";

export class CorsMiddleware extends Middleware {
  async process(
    req: Request,
    next: (req: Request) => Promise<Response>,
    server: Server
  ): Promise<Response> {
    const res = await next(req);

    return res
      .withHeader("Access-Control-Allow-Origin", "*")
      .withHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      )
      .withHeader("Access-Control-Allow-Headers", "*");
  }
}
