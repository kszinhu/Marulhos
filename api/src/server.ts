import dotenv from "dotenv";

import { Server } from "apiframework/app";
import { ConsoleLogger, LogLevel } from "apiframework/log";
import { Scrypt } from "apiframework/hash";

import router from "./app/routes/index.js";
import { prisma } from "./app/lib/Prisma.js";

dotenv.config({ path: "./.env.dev", override: true });
dotenv.config({ override: true });

export const server = new Server({
  providers: {
    router,
    logger: new ConsoleLogger({ minLevel: LogLevel.DEBUG }),
    hash: new Scrypt(),
  },
});

const port = parseInt(process.env.API_PORT || "3000");

await new Promise<void>((resolve, reject) => {
  server
    .listen(port)
    .on("listening", async () => {
      await prisma.$connect();
      console.log(`Server is running on port ${port}\n`);
      resolve();
    })
    .on("close", async () => {
      await prisma.$disconnect();
    });
});
