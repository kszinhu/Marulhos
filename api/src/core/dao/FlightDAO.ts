import { Prisma } from "@prisma/client";

import { prisma } from "../lib/prisma.js";
import { Flight } from "../entities/Flight.js";

export default class FlightDAO {
  static async all(args?: Prisma.FlightFindManyArgs): Promise<Flight[]> {
    return await prisma.flight.findMany(args);
  }

  static async create(data: Prisma.FlightCreateInput): Promise<Flight> {
    return await prisma.flight.create({ data });
  }

  static async get(args: Prisma.FlightFindFirstArgs): Promise<Flight | null> {
    return await prisma.flight.findFirst(args);
  }

  static async save(id: number, data: Flight): Promise<Flight> {
    return await prisma.flight.update({
      where: { id },
      data,
    });
  }

  static async delete(id: number): Promise<Flight> {
    return await prisma.flight.delete({
      where: { id },
    });
  }
}
