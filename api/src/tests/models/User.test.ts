import { expect } from "chai";
import UserDAO from "@core/dao/UserDAO.js";
import { Sex } from "@prisma/client";

describe("UserDAO", () => {
  describe("Validate", () => {
    it("should return true if the data is valid", () => {
      const data = {
        cpf: "25739174015",
        email: "test@test.com",
        username: "test_user",
        password: "12345678",
        name: "Test",
        last_name: "Name",
        sex: Sex.X,
        address_cep: "Rua do Teste",
        address_number: "124",
      };

      expect(UserDAO.validate(data)).to.be.true;
    });

    it("should throw error if data is invalid", () => {
      const data = {
        cpf: "12345678910",
        email: "test@test.com",
        username: "test_user",
        password: "12345678",
        name: "Test",
        last_name: "Name",
        sex: Sex.X,
        address_cep: "Rua do Teste",
        address_number: "124",
      };

      expect(UserDAO.validate.bind(UserDAO, data)).to.throw(
        "Dados não correspondem ao formato esperado"
      );
    });
  });
});
