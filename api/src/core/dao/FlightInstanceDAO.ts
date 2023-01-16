import { Prisma } from "@prisma/client";

import { prisma } from "../lib/prisma.js";
import { ModelDAO, validate } from "./BaseDAO.js";

import { Flight_Instance } from "../entities/FlightInstance.js";
import { z } from "zod";

class FlightInstanceDAO implements ModelDAO<Flight_Instance> {
  definition = {
    name: "Flight_Instance",
    primary_key: {
      name: "id",
      validate: z.number(),
    },
    schemaValidator: z.object({
      departure_time: z.date(),
      arrival_time: z.date(),
      flight_id: z.number(),
      plane_id: z.number(),
      terminal_id: z.number(),
      pilot_cpf: z.string(),
      copilot_cpf: z.string(),
    }),
  };

  async all(
    args?: Prisma.Flight_InstanceFindManyArgs
  ): Promise<[number, Flight_Instance[]]> {
    return await Promise.all([
      prisma.flight_Instance.count(),
      prisma.flight_Instance.findMany(args),
    ]);
  }

  async create(
    data: Prisma.Flight_InstanceCreateInput
  ): Promise<Flight_Instance> {
    return await prisma.flight_Instance.create({ data });
  }

  async get(
    args: Prisma.Flight_InstanceFindFirstArgs
  ): Promise<Flight_Instance | null> {
    return await prisma.flight_Instance.findFirst(args);
  }

  async save(id: number, data: Flight_Instance): Promise<Flight_Instance> {
    return await prisma.flight_Instance.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Flight_Instance> {
    return await prisma.flight_Instance.delete({
      where: { id },
    });
  }

  validate(data: Flight_Instance | Prisma.Flight_InstanceCreateInput): boolean {
    return validate(data, this.definition.schemaValidator);
  }
}

export default new FlightInstanceDAO();
