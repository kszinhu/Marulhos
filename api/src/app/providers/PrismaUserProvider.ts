import { Hash } from "apiframework/hash";
import { Server } from "apiframework/app";

import UserDAO from "@core/dao/UserDAO.js";

interface UserData {
  id: number;
  cpf: string;
  email: string;
  username: string;
}

export default class PrismaUserProvider {
  #hash: Hash;

  constructor(server: Server) {
    this.#hash = server.providers.get("Hash");
  }

  async getUserById(id: number): Promise<UserData | null> {
    return await UserDAO.get({
      select: { id: true, cpf: true, username: true, password: true },
      where: { id: Number(id) },
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
