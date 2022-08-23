import { Prisma, Plane } from "@prisma/client";
import { prisma } from "../lib/Prisma.js";

export default class Company {
  static async all() {
    return await prisma.company.findMany({ include: { planes: true } });
  }

  static async create(data: Prisma.CompanyCreateInput) {
    return await prisma.company.create({
      data,
    });
  }

  static async get(cnpj: string) {
    return await prisma.company.findFirst({
      where: {
        cnpj,
      },
      include: {
        planes: true,
      },
    });
  }

  static async save(
    cnpj: string,
    {
      name,
      contact,
      planes,
    }: {
      name: string;
      contact: string;
      planes: {
        id?: number;
        model: string;
        capacity: number;
        manufacture_date: any;
      }[];
    }
  ) {
    console;
    return await prisma.company.update({
      where: {
        cnpj,
      },
      data: {
        name,
        contact,
        planes: {
          connect: planes
            .filter((p) => p.id)
            .map((plane) => ({ id: plane.id! })),
          create: planes
            .filter((p) => !p.id)
            .map((plane) => ({
              model: plane.model,
              capacity: plane.capacity,
              manufacture_date: plane.manufacture_date,
            })),
        },
      },
      include: {
        planes: true,
      },
    });
  }

  static async delete(cnpj: string) {
    return await prisma.company.delete({
      where: {
        cnpj,
      },
    });
  }
}
