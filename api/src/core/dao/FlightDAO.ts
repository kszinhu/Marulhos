import { Prisma } from "@prisma/client";

import { prisma } from "../lib/prisma.js";
import { ModelDAO, validate } from "./BaseDAO.js";

import { Flight } from "../entities/Flight.js";
import { z } from "zod";

class FlightDAO implements ModelDAO<Flight> {
  definition = {
    name: "Flight",
    primary_key: {
      name: "id",
      validate: z.number(),
    },
    schemaValidator: z.object({
      estimated_departure_date: z.date(),
      estimated_arrival_date: z.date(),
      origin: z.string(),
      destination: z.string(),
    }),
  };

  async all(args?: Prisma.FlightFindManyArgs): Promise<[number, Flight[]]> {
    return await Promise.all([
      prisma.flight.count(),
      prisma.flight.findMany(args),
    ]);
  }

  async create(data: Prisma.FlightCreateInput): Promise<Flight> {
    return await prisma.flight.create({ data });
  }

  async get(args: Prisma.FlightFindFirstArgs): Promise<Flight | null> {
    return await prisma.flight.findFirst(args);
  }

  async save(id: number, data: Flight): Promise<Flight> {
    return await prisma.flight.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Flight> {
    return await prisma.flight.delete({
      where: { id },
    });
  }

  validate(data: Flight | Prisma.FlightCreateInput): boolean {
    return validate(data, this.definition.schemaValidator);
  }
}

export default new FlightDAO();
