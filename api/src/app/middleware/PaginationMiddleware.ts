import { HTTPError } from "midori/errors";
import { EStatusCode, Middleware, Request, Response } from "midori/http";
import { Constructor } from "midori/util/types.js";

/**
 * Capture on the body pagination parameters and add them to the request
 */
export default function PaginationMiddleware(): Constructor<Middleware> {
  return class extends Middleware {
    async process(
      req: Request,
      next: (req: Request) => Promise<Response>
    ): Promise<Response> {
      const page = Number(req.query.get("page") ?? 1),
        per = Number(req.query.get("per") ?? 10);

      if (page && per) {
        const prismaPagination = {
          skip: (page - 1) * per, // calculate the number of records to skip (offset)
          take: per, // get the number of records to take (limit)
        };

        if (prismaPagination.skip < 0 || prismaPagination.take < 0) {
          throw new HTTPError(
            "Invalid pagination parameters.",
            EStatusCode.BAD_REQUEST
          );
        }

        // remove pagination parameters from query
        req.query.delete("page");
        req.query.delete("per");

        // add formatted pagination parameters to body
        for (const [key, value] of Object.entries(prismaPagination)) {
          req.query.set(key, String(value));
        }
      }

      const response = await next(req);

      const newBody: [number, any] = await new Promise((resolve) => {
        response.body.on("data", (chunk) => {
          resolve(JSON.parse(chunk));
        });
      });

      const [count, data] = newBody;

      return response.empty().json({
        data,
        meta: {
          page,
          per,
          total: count,
        },
      });
    }
  };
}
