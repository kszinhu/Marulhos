import { Prisma } from "@prisma/client";

import { prisma } from "../lib/prisma.js";
import { Plane } from "../entities/Plane.js";

export default class PlaneDAO {
  static async all(args?: Prisma.PlaneFindManyArgs): Promise<Plane[]> {
    return await prisma.plane.findMany(args);
  }

  static async create(data: Prisma.PlaneCreateInput): Promise<Plane> {
    return await prisma.plane.create({ data });
  }

  static async get(args: Prisma.PlaneFindFirstArgs): Promise<Plane | null> {
    return await prisma.plane.findFirst(args);
  }

  static async save(id: number, data: Plane): Promise<Plane> {
    return await prisma.plane.update({
      where: { id },
      data,
    });
  }

  static async delete(id: number): Promise<Plane> {
    return await prisma.plane.delete({
      where: { id },
    });
  }
}
