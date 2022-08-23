import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/index.js";
import { prisma } from "../lib/Prisma.js";

export default class FlightInstance {
  static async all() {
    return await prisma.flight_Instance.findMany({
      include: {
        tickets: {
          select: {
            id: true,
            price: true,
            passenger_cpf: true,
          },
        },
        plane: {
          select: {
            id: true,
            company: {
              select: {
                cnpj: true,
                name: true,
              },
            },
          },
        },
        pilot: {
          select: {
            cpf: true,
          },
        },
        copilot: {
          select: {
            cpf: true,
          },
        },
        fly_attendants: {
          select: {
            cpf: true,
          },
        },
      },
    });
  }

  static async create(data: Prisma.Flight_InstanceCreateInput) {
    return await prisma.flight_Instance.create({
      data: {
        ...data,
      },
      include: {
        tickets: {
          select: {
            id: true,
            price: true,
            passenger_cpf: true,
          },
        },
        plane: {
          select: {
            id: true,
            company: {
              select: {
                cnpj: true,
                name: true,
              },
            },
          },
        },
        pilot: {
          select: {
            cpf: true,
          },
        },
        copilot: {
          select: {
            cpf: true,
          },
        },
        fly_attendants: {
          select: {
            cpf: true,
          },
        },
      },
    });
  }

  static async get(id: number) {
    return await prisma.flight_Instance.findFirst({
      where: {
        id,
      },
      include: {
        tickets: {
          select: {
            id: true,
            price: true,
            passenger_cpf: true,
          },
        },
        plane: {
          select: {
            id: true,
            company: {
              select: {
                cnpj: true,
                name: true,
              },
            },
          },
        },
        flight: {
          select: {
            id: true,
          },
        },
        pilot: {
          select: {
            cpf: true,
          },
        },
        copilot: {
          select: {
            cpf: true,
          },
        },
        fly_attendants: {
          select: {
            cpf: true,
          },
        },
      },
    });
  }

  static async save(
    id: number,
    {
      departure_date,
      arrival_date,
      terminal_id,
      plane,
      pilot,
      copilot,
      flight,
      tickets,
      fly_attendants,
    }: {
      departure_date: Date;
      arrival_date: Date;
      terminal_id: number;
      pilot: {
        cpf: string;
      };
      copilot: {
        cpf: string;
      };
      flight: {
        id: number;
      };
      plane: {
        id: number;
      };
      tickets: {
        id: number;
        price: Decimal;
        passenger_cpf: string;
      }[];
      fly_attendants: {
        cpf: string;
      }[];
    }
  ) {
    return await prisma.flight_Instance.update({
      where: {
        id,
      },
      data: {
        departure_date,
        arrival_date,
        terminal_id,
        tickets: {
          connectOrCreate: tickets.map((ticket) => ({
            where: { id: ticket.id },
            create: { ...ticket },
          })),
        },
        fly_attendants: {
          connect: fly_attendants.map((fly_attendant) => ({
            cpf: fly_attendant.cpf,
          })),
        },
        plane: {
          connect: {
            id: plane.id,
          },
        },
        flight: {
          connect: {
            id: flight.id,
          },
        },
        pilot: {
          connect: {
            cpf: pilot.cpf,
          },
        },
        copilot: {
          connect: {
            cpf: copilot.cpf,
          },
        },
      },
      include: {
        tickets: {
          select: {
            id: true,
            price: true,
            passenger_cpf: true,
          },
        },
        plane: {
          select: {
            id: true,
            company: {
              select: {
                cnpj: true,
                name: true,
              },
            },
          },
        },
        pilot: {
          select: {
            cpf: true,
          },
        },
        copilot: {
          select: {
            cpf: true,
          },
        },
        fly_attendants: {
          select: {
            cpf: true,
          },
        },
      },
    });
  }

  static async delete(id: number) {
    return await prisma.flight_Instance.delete({
      where: {
        id,
      },
    });
  }
}
