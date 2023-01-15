import dotenv from "dotenv";

import { Server } from "midori/app";

import pipeline from "./pipeline.js";
import providers from "./providers.js";

import { prisma } from "@core/lib/prisma.js";
import { Prisma } from "@prisma/client";

dotenv.config({ override: true });
dotenv.config({ path: "./.env.dev", override: true });

export const server = new Server({
  production: process.env.NODE_ENV?.toUpperCase() === "PRODUCTION",
});

providers(server);
pipeline(server);

const port = parseInt(process.env.API_PORT || "3000");

await new Promise<void>((resolve, reject) => {
  server
    .listen(port)
    .on("listening", async () => {
      await prisma.$connect();
      console.log(`\n Server is running on port ${port}\n`);
      resolve();
    })
    .on("close", async () => {
      await prisma.$disconnect();
    });
});
