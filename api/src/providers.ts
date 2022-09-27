import { Server } from "apiframework/app";
import { Auth } from "apiframework/auth";
import { Scrypt } from "apiframework/hash";
import { JWT } from "apiframework/jwt";
import { ConsoleLogger, LogLevel } from "apiframework/log";

import PrismaUserProvider from "./app/providers/PrismaUserProvider.js";

import router from "./app/routes/index.js";

export default function providers(server: Server): void {
  server.install("Router", router);
  server.install(
    "Logger",
    new ConsoleLogger({ colorsEnabled: true, minLevel: LogLevel.DEBUG })
  );

  server.install(
    "JWT",
    new JWT(
      process.env.JWT_ALGORITHM || "HS256",
      process.env.JWT_SECRET || "secret",
      process.env.JWT_PUBLIC_KEY,
      process.env.JWT_PRIVATE_KEY
    )
  );
  server.install("Hash", new Scrypt());
  server.install("User", new PrismaUserProvider(server));
  server.install("Auth", new Auth(server));
}
