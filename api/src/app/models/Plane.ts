import { Prisma } from "@prisma/client";
import { prisma } from "../lib/Prisma.js";

export default class Plane {

  static async all() {
    return await prisma.plane.findMany();
  }

  static async create(data: Prisma.PlaneCreateInput) {
    return await prisma.plane.create({
      data,
    });
  }

  static async get(id: number): Promise<any> {
    return await prisma.plane.findFirst({
      where: {
        id,
      },
    });
  }

  static async save(
    id: number,
    { capacity, model, manufacture_date, company_cnpj }: { capacity: number; model: string; manufacture_date: string; company_cnpj: string }
  ) {
    return await prisma.plane.update({
      where: {
        id,
      },
      data: {
        capacity,
        model,
        manufacture_date,
        company_cnpj,
      },
    });
  }

  static async delete(id: number) {
    return await prisma.plane.delete({
      where: {
        id,
      },
    });
  }
}
