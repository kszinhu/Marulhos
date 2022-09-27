import { Prisma } from "@prisma/client";

import { prisma } from "../lib/prisma.js";
import { User } from "../entities/User.js";

export default class UserDAO {
  static async all(args?: Prisma.UserFindManyArgs): Promise<User[]> {
    return await prisma.user.findMany(args);
  }

  static async create(data: Prisma.UserCreateInput): Promise<User> {
    return await prisma.user.create({ data });
  }

  static async get(args: Prisma.UserFindFirstArgs): Promise<User | null> {
    return await prisma.user.findFirst(args);
  }

  static async save(id: number, data: User): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  static async delete(id: number): Promise<User> {
    return await prisma.user.delete({
      where: { id },
    });
  }
}
