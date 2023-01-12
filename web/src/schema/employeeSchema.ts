import * as Yup from "yup";

export const employeeSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  last_name: Yup.string().required("Sobrenome é obrigatório"),
  cpf: Yup.number().required("CPF é obrigatório"),
  rg: Yup.number(),
  sex: Yup.mixed().oneOf(["M", "F", "X"]),
  birth_date: Yup.date(),
  address_cep: Yup.number(),
  address_number: Yup.number(),
  salary: Yup.number().required("Salário é obrigatório"),
  vaccination_number: Yup.number().required(
    "Número da carteira de vacinação é obrigatório"
  ),
  passport_number: Yup.number().required("Número de passaporte é obrigatório"),
});
