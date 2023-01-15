import { HTTPError } from "midori/errors";
import { EStatusCode, Middleware, Request, Response } from "midori/http";
import { Constructor } from "midori/util/types.js";

export default function OauthScopeMiddleware(options: {
  scopes: string[];
}): Constructor<Middleware> {
  return class extends Middleware {
    async process(
      req: Request,
      next: (req: Request) => Promise<Response>
    ): Promise<Response> {
      if (req.container.get("jwt")) {
        const userScopes = (req.container.get("jwt").scope ?? "").split(" ");

        for (const scope of options.scopes) {
          if (!userScopes.includes(scope)) {
            const scopeCapitalized =
              scope.charAt(0).toUpperCase() + scope.slice(1);
            throw new HTTPError(
              `Insufficient permissions: ${scopeCapitalized}.`,
              EStatusCode.FORBIDDEN
            );
          }
        }
      }

      return await next(req);
    }
  };
}
