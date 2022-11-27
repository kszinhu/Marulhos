import { PrismaClient } from "@prisma/client";

export default async function UserSeeds(prisma: PrismaClient) {
  await prisma.user.create({
    data: {
      name: "Pedro",
      last_name: "Caliman",
      rg: "111",
      cpf: "111",
      sex: "M",
      email: "pedro@gmail.com",
      username: "pcaliman",
      password: "12345678",
      birth_date: new Date("2002/11/22"),
      address_cep: "111",
      address_number: "1111",
    },
  });
}
