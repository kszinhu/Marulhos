import { Prisma } from "@prisma/client";
import { HTTPError } from "midori/errors";
import { EStatusCode } from "midori/http";

import { ModelDAO, validate } from "./BaseDAO.js";
import { User } from "../entities/User.js";

import { prisma } from "../lib/prisma.js";
import { isValidCPF } from "../../utils/validateCPF.js";

import { z } from "zod";

class UserDAO implements ModelDAO<User> {
  definition = {
    name: "User",
    primary_key: {
      name: "id",
      validate: z.string(),
    },
    schemaValidator: z.object({
      cpf: z.string().refine((cpf) => isValidCPF(cpf), "CPF inválido"),
      name: z.string(),
      email: z.string().email("Email inválido"),
      password: z.string().min(8, "Senha muito curta"),
      last_name: z.string(),
      address_cep: z.string(),
      address_number: z.string(),
      birth_date: z.optional(z.date()),
      username: z.string({ required_error: "Requirido" }),
      sex: z.string(),
      rg: z.optional(z.string()),
    }),
  };

  validate(data: User | Prisma.UserCreateInput): boolean {
    return validate(data, this.definition.schemaValidator);
  }

  async all(args?: Prisma.UserFindManyArgs): Promise<[number, User[]]> {
    return await Promise.all([prisma.user.count(), prisma.user.findMany(args)]);
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    this.validate(data);

    return await prisma.user.create({ data });
  }

  async get(args: Prisma.UserFindFirstArgs): Promise<User | null> {
    return await prisma.user.findFirst(args);
  }

  async save(id: string, data: User): Promise<User> {
    this.validate(data);

    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<User> {
    return await prisma.user.delete({
      where: { id },
    });
  }
}

export default new UserDAO();
