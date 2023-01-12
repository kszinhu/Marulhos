import * as Yup from 'yup';

export const companySchema = Yup.object().shape({
  cnpj: Yup.number().required('CNPJ é obrigatório'),
  name: Yup.string().required('Nome é obrigatório'),
  contact: Yup.string().required('Contato é obrigatório'),
})