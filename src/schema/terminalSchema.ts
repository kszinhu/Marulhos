import * as Yup from "yup";

export const terminalSchema = Yup.object().shape({
  terminal_number: Yup.number().required("Número do Terminal é obrigatório"),
  terminal_capacity: Yup.number().required("Capacidade é obrigatório"),
});
