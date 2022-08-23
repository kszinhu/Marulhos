import { PrismaClient } from "@prisma/client";

// @ts-ignore
import { SeedFunction, Seeds } from "./seeds/index";

const prisma = new PrismaClient();

async function main() {
  Seeds.forEach(async (seeder: SeedFunction) => {
    await seeder(prisma).catch((err: Error) => {
      console.error(err);
    });
  });
}

main();
