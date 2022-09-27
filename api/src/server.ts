import dotenv from "dotenv";

import { Server } from "apiframework/app";

// import router from "./app/routes/index.js";
import pipeline from "./pipeline.js";
import providers from "./providers.js";
import { prisma } from "./core/lib/prisma.js";

dotenv.config({ path: "./.env.dev", override: true });
dotenv.config({ override: true });

export const server = new Server();

providers(server);
pipeline(server);

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
