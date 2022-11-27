import { Server } from "midori/app";
import { Scrypt } from "midori/hash";
import { JWT } from "midori/jwt";
import { ConsoleLogger, LogLevel } from "midori/log";
import { UserService } from "midori/auth";
import {
  AuthServiceProvider,
  HashServiceProvider,
  HashServiceProviderFactory,
  JWTServiceProviderFactory,
  LoggerServiceProviderFactory,
  RouterServiceProviderFactory,
  UserServiceProviderFactory,
} from "midori/providers";

import PrismaUserService from "@app/services/PrismaUserService.js";
import router from "@app/routes/index.js";

export default function providers(server: Server): void {
  server.install(RouterServiceProviderFactory(router));
  server.install(
    LoggerServiceProviderFactory(
      new ConsoleLogger({ colorsEnabled: true, minLevel: LogLevel.DEBUG })
    )
  );

  // { alg: process.env.JWT_ALGORITHM || 'HS256', secret: process.env.JWT_SECRET || 'secret', privateKeyFile: process.env.JWT_PRIVATE_KEY_FILE }, { alg: process.env.JWT_ALGORITHM || 'HS256', secret: process.env.JWT_SECRET || 'secret', enc: process.env.JWT_ENC || 'base64', privateKeyFile: process.env.JWT_PRIVATE_KEY_FILE || './keys/private.pem' }
  server.install(
    JWTServiceProviderFactory(
      new JWT(
        {
          alg: process.env.JWT_ALGORITHM || "HS256",
          secret: process.env.JWT_SECRET || "secret",
          privateKeyFile: process.env.JWT_PRIVATE_KEY_FILE,
        },
        {
          alg: process.env.JWT_ALGORITHM || "HS256",
          enc: process.env.JWT_ENC || "base64",
          secret: process.env.JWT_SECRET || "secret",
          privateKeyFile:
            process.env.JWT_PRIVATE_KEY_FILE || "../keys/private.pem",
        }
      )
    )
  );
  server.install(HashServiceProviderFactory(new Scrypt()));
  server.install(
    UserServiceProviderFactory(
      new PrismaUserService(server.services.get(HashServiceProvider))
    )
  );
  server.install(AuthServiceProvider);
}
