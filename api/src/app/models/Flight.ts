import { Prisma } from "@prisma/client";
import { prisma } from "../lib/Prisma.js";

export default class Flight {
  static async all() {
    return await prisma.flight.findMany();
  }

  static async create(data: Prisma.FlightCreateInput) {
    return await prisma.flight.create({
      data,
    });
  }

  static async get(id: number) {
    return await prisma.flight.findFirst({
      where: {
        id,
      },
    });
  }

  static async save(
    id: number,
    {
      estimated_departure_date,
      estimated_arrival_date,
      origin,
      destination,
    }: {
      estimated_departure_date: any;
      estimated_arrival_date: any;
      origin: string;
      destination: string;
    }
  ) {
    return await prisma.flight.update({
      where: {
        id,
      },
      data: {
        estimated_departure_date,
        estimated_arrival_date,
        origin,
        destination,
      },
    });
  }

  static async delete(id: number) {
    return await prisma.flight.delete({
      where: {
        id,
      },
    });
  }
}
