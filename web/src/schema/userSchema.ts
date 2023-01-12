import * as Yup from "yup";

export const registerUserSchema = Yup.object().shape({
  username: Yup.string().required("Nome de usuário é obrigatório"),
  password: Yup.string().required("Senha é obrigatória"),
  name: Yup.string().required("Nome é obrigatório"),
  last_name: Yup.string(),
  cpf: Yup.string().required("CPF é obrigatório"),
  sex: Yup.mixed().oneOf(["M", "F", "X"]),
  address_cep: Yup.string().required("CEP é obrigatório"),
  address_number: Yup.string().required("Número da Casa é obrigatório"),
});

export const loginUserSchema = Yup.object().shape({
  credentialName: Yup.string().required(
    "Email ou nome de usuário é obrigatório"
  ),
  password: Yup.string().required("Senha é obrigatória"),
});
