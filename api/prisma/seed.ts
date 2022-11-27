import { PrismaClient } from "@prisma/client";

import { SeedFunction, Seeds } from "./seeds/index.js";

const prisma = new PrismaClient();

async function main() {
  Seeds.forEach(async (seeder: SeedFunction) => {
    await seeder(prisma).catch((err: Error) => {
      console.error(err);
    });
  });
}

main();
