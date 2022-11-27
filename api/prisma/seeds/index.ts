import { PrismaClient } from "@prisma/client";
// @ts-ignore
import UserSeeds from "./users/index.js";

export interface SeedFunction {
  (prisma: PrismaClient): Promise<void>;
}

export const Seeds: SeedFunction[] = [UserSeeds];
