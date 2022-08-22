import { Prisma } from "@prisma/client";
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
    return await prisma.company.update({
      where: {
        cnpj,
      },
      data: {
        name,
        contact,
        planes: {
          createMany: {
            data: planes.map(({ model, capacity, manufacture_date }) => ({
              model,
              capacity,
              manufacture_date,
            })),
          },
        },
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
