import { Prisma } from "@prisma/client";

import { prisma } from "../lib/prisma.js";
import { Flight_Instance } from "../entities/FlightInstance.js";

export default class FlightInstanceDAO {
  static async all(
    args?: Prisma.Flight_InstanceFindManyArgs
  ): Promise<Flight_Instance[]> {
    return await prisma.flight_Instance.findMany(args);
  }

  static async create(
    data: Prisma.Flight_InstanceCreateInput
  ): Promise<Flight_Instance> {
    return await prisma.flight_Instance.create({ data });
  }

  static async get(
    args: Prisma.Flight_InstanceFindFirstArgs
  ): Promise<Flight_Instance | null> {
    return await prisma.flight_Instance.findFirst(args);
  }

  static async save(
    id: number,
    data: Flight_Instance
  ): Promise<Flight_Instance> {
    return await prisma.flight_Instance.update({
      where: { id },
      data,
    });
  }

  static async delete(id: number): Promise<Flight_Instance> {
    return await prisma.flight_Instance.delete({
      where: { id },
    });
  }
}
