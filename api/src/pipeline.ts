import { Server } from "apiframework/app";
import {
  CORSMiddleware,
  DispatchMiddleware,
  ErrorMiddleware,
  ErrorLoggerMiddleware,
  HTTPErrorMiddleware,
  ImplicitHeadMiddleware,
  ImplicitOptionsMiddleware,
  MethodNotAllowedMiddleware,
  NotFoundMiddleware,
  ParseBodyMiddleware,
  ReadBodyMiddleware,
  RequestLoggerMiddleware,
  ResponseCompressionMiddleware,
  RouterMiddleware,
} from "apiframework/middlewares";

export default function pipeline(server: Server): void {
  /**
   * Log every request using the Logger Service Provider
   *
   * Put this middleware before the ErrorMiddleware to log every request, even 500
   */
  server.pipe(RequestLoggerMiddleware);

  /**
   * Handle any uncaught Error during the request processing
   *
   * This middleware should be one of the first middlewares in the pipeline
   */
  server.pipe(ErrorMiddleware({ exposeErrors: !!process.env.EXPOSE_ERRORS }));

  /**
   * Log every error using the Logger Service Provider
   *
   * This middleware throws every error it receives, so it should be after ErrorMiddleware in the pipeline
   */
  server.pipe(ErrorLoggerMiddleware);

  /**
   * Compress the response using the Accept-Encoding header
   */
  server.pipe(ResponseCompressionMiddleware({ contentTypes: ["*/*"] }));

  /**
   * Handle any uncaught HTTPError, and return a JSON response
   */
  server.pipe(HTTPErrorMiddleware);

  /**
   * Register the router middleware, which will handle all incoming requests
   *
   * The Router Middleware saves the matched route in the request context, and calls the next middleware
   */
  server.pipe(RouterMiddleware);

  /**
   * ImplicitHeadMiddleware will automatically respond to HEAD requests with the same response as the corresponding GET request, but without the body
   * ImplicitOptionsMiddleware will automatically respond to OPTIONS requests with the allowed methods for the requested route
   * MethodNotAllowedMiddleware will automatically respond to requests with an invalid method with a 405 Method Not Allowed response
   */
  server.pipe(ImplicitHeadMiddleware);
  server.pipe(ImplicitOptionsMiddleware);
  server.pipe(MethodNotAllowedMiddleware);

  /**
   * Read the request body, then parse it based on the Content-Type header
   */
  server.pipe(ReadBodyMiddleware);
  server.pipe(ParseBodyMiddleware);

  server.pipe(CORSMiddleware({ origin: "*" }));

  /**
   * Dispatch the Middleware Chain the Router Middleware found
   */
  server.pipe(DispatchMiddleware);

  /**
   * Called when no route was found
   *
   */
  server.pipe(NotFoundMiddleware);
}
