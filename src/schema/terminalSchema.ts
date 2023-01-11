import * as Yup from "yup";

export const terminalSchema = Yup.object().shape({
  capacity: Yup.number().required("Capacidade é obrigatório"),
});
