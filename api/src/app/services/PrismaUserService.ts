import { Hash } from "midori/hash";
import { Server } from "midori/app";
import { UserService } from "midori/auth";

import UserDAO from "@core/dao/UserDAO.js";

interface UserData {
  id: string;
  cpf: string;
  email: string;
  username: string;
}

export default class PrismaUserService {
  #hash: Hash;

  constructor(hash: Hash) {
    this.#hash = hash;
  }

  async getUserById(id: string): Promise<UserData | null> {
    return await UserDAO.get({
      select: { id: true, cpf: true, username: true, password: true },
      where: { id: id },
    });
  }

  async getUserByCredentials(
    credentialName: string,
    password: string
  ): Promise<UserData | null> {
    const user = await UserDAO.get({
      select: { id: true, cpf: true, username: true, password: true },
      where: { OR: [{ username: credentialName }, { email: credentialName }] },
    });

    if (!user || !this.#hash.verify(user.password, password)) {
      return null;
    }

    return {
      id: user.id,
      cpf: user.cpf,
      username: user.username,
      email: user.email,
    };
  }
}
