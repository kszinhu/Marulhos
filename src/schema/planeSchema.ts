import * as Yup from "yup";

export const planeSchema = Yup.object().shape({
  capacity: Yup.number().required("Capacidade é obrigatório"),
  model: Yup.string().required("Modelo é obrigatório"),
  manufacture_date: Yup.date().required("Data de fabricação é obrigatório"),
});
