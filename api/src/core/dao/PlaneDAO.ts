import { Prisma } from "@prisma/client";
import { HTTPError } from "midori/errors";
import { EStatusCode } from "midori/http";

import { ModelDAO } from "./BaseDAO.js";
import { Plane } from "../entities/Plane.js";

// Relationships
import CompanyDAO from "./CompanyDAO.js";

import { prisma } from "../lib/prisma.js";

import { z } from "zod";

class PlaneDAO implements ModelDAO<Plane> {
  definition = {
    name: "Plane",
    primary_key: {
      name: "id",
      validate: z.string(),
    },
    schemaValidator: z.object({
      model: z.string(),
      capacity: z.number(),
      manufacture_date: z.date().optional(),
      company: z
        .object({
          create: CompanyDAO.definition.schemaValidator.optional(),
          connect: z
            .object({
              [CompanyDAO.definition.primary_key.name]:
                CompanyDAO.definition.primary_key.validate,
            })
            .optional(),
        })
        .refine(
          (data) => data.create || data.connect,
          "Either create or connect must be provided"
        ),
    }),
  };

  validate(data: Plane | Prisma.PlaneCreateInput): boolean {
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

  async all(args?: Prisma.PlaneFindManyArgs): Promise<Plane[]> {
    return await prisma.plane.findMany(args);
  }

  async create(data: Prisma.PlaneCreateInput): Promise<Plane> {
    this.validate(data);

    return await prisma.plane.create({ data });
  }

  async get(args: Prisma.PlaneFindFirstArgs): Promise<Plane | null> {
    return await prisma.plane.findFirst(args);
  }

  async save(id: number, data: Plane): Promise<Plane> {
    return await prisma.plane.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Plane> {
    return await prisma.plane.delete({
      where: { id },
    });
  }
}

export default new PlaneDAO();
