import { Prisma } from "@prisma/client";

import { prisma } from "../lib/prisma.js";
import { Company } from "../entities/Company.js";

export default class UserDAO {
  static async all(args?: Prisma.CompanyFindManyArgs): Promise<Company[]> {
    return await prisma.company.findMany(args);
  }

  static async create(data: Prisma.CompanyCreateInput): Promise<Company> {
    return await prisma.company.create({ data });
  }

  static async get(args: Prisma.CompanyFindFirstArgs): Promise<Company | null> {
    return await prisma.company.findFirst(args);
  }

  static async save(cnpj: string, data: Company): Promise<Company> {
    return await prisma.company.update({
      where: { cnpj },
      data,
    });
  }

  static async delete(cnpj: string): Promise<Company> {
    return await prisma.company.delete({
      where: { cnpj },
    });
  }
}
