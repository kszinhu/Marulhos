import { Prisma, Sex } from "@prisma/client";
import { HTTPError } from "apiframework/errors";
import { EStatusCode } from "apiframework/http";

import { ModelDAO } from "./BaseDAO.js";
import { User } from "../entities/User.js";

import { prisma } from "../lib/prisma.js";
import { isValidCPF } from "src/utils/validateCPF.js";

import { z } from "zod";

class UserDAO implements ModelDAO<User> {
  #schema = z.object({
    name: z.string(),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Senha muito curta"),
    last_name: z.string(),
    cpf: z.string().refine((cpf) => isValidCPF(cpf), "CPF inválido"),
    address_cep: z.string(),
    address_number: z.string(),
    birth_date: z.optional(z.date()),
    username: z.string({ required_error: "Requirido" }),
    sex: z.nativeEnum(Sex),
    id: z.number({ required_error: "Requirido" }),
    rg: z.optional(z.string()),
    created_at: z.date({
      required_error: "Requirido",
      invalid_type_error: "Data Inválida",
    }),
    updated_at: z.optional(z.date()),
  });

  validate(data: User | Prisma.UserCreateInput): boolean {
    try {
      this.#schema.parse(data);
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

  async all(args?: Prisma.UserFindManyArgs): Promise<User[]> {
    return await prisma.user.findMany(args);
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    this.validate(data);

    return await prisma.user.create({ data });
  }

  async get(args: Prisma.UserFindFirstArgs): Promise<User | null> {
    return await prisma.user.findFirst(args);
  }

  async save(id: number, data: User): Promise<User> {
    this.validate(data);

    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<User> {
    return await prisma.user.delete({
      where: { id },
    });
  }
}

export default new UserDAO();
