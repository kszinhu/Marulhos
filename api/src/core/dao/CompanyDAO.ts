import { Prisma } from "@prisma/client";
import { HTTPError } from "midori/errors";
import { EStatusCode } from "midori/http";

import { ModelDAO } from "./BaseDAO.js";
import { Company } from "../entities/Company.js";

import { prisma } from "../lib/prisma.js";

import { z } from "zod";

class CompanyDAO implements ModelDAO<Company> {
  definition = {
    name: "Company",
    primary_key: {
      name: "cnpj",
      validate: z.string(),
    },
    schemaValidator: z.object({
      cnpj: z.string(),
      name: z.string(),
      contact: z.string(),
    }),
  };

  validate(data: Company | Prisma.CompanyCreateInput): boolean {
    try {
      this.definition.schemaValidator.parse(data);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.formErrors.fieldErrors);

        throw new HTTPError(
          "Dados não correspondem ao formato esperado",
          EStatusCode.UNPROCESSABLE_ENTITY
        );
      }

      return false;
    }
  }

  async all(args?: Prisma.CompanyFindManyArgs): Promise<Company[]> {
    return await prisma.company.findMany(args);
  }

  async create(data: Prisma.CompanyCreateInput): Promise<Company> {
    this.validate(data);

    return await prisma.company.create({ data });
  }

  async get(args: Prisma.CompanyFindFirstArgs): Promise<Company | null> {
    return await prisma.company.findFirst(args);
  }

  async save(cnpj: string, data: Company): Promise<Company> {
    this.validate(data);

    return await prisma.company.update({
      where: { cnpj },
      data,
    });
  }

  async delete(cnpj: string): Promise<Company> {
    return await prisma.company.delete({
      where: { cnpj },
    });
  }
}

export default new CompanyDAO();
