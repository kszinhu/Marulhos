import "dayjs/locale/pt-br";
import {
  Autocomplete,
  Checkbox,
  Radio,
  Switch,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";

interface FieldInterface {
  inputComponent: Function;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  defaultValue?: number | string;
  parser?: (value: any) => any;
  formatter?: (value: any) => any;
  options?: { label: string; value: string }[];
  locale?: string;
}

interface FormModel {
  name: string;
  slug: string; // url friendly
  fields: FieldInterface[];
}

const employeeFields: FieldInterface[] = [
  {
    inputComponent: TextInput,
    name: "name",
    label: "Nome",
    required: true,
  },
  {
    inputComponent: TextInput,
    name: "lastName",
    label: "Sobrenome",
    required: true,
  },
  {
    inputComponent: NumberInput,
    name: "CPF",
    label: "CPF",
    required: true,
  },
  {
    inputComponent: NumberInput,
    name: "RG",
    label: "RG",
  },
  {
    inputComponent: Radio,
    name: "Sex",
    label: "Sexo",
    options: [
      { label: "Masculino", value: "M" },
      { label: "Feminino", value: "F" },
      { label: "Não Definido", value: "X" },
    ],
    required: true,
  },
  {
    inputComponent: DatePicker,
    name: "birthDate",
    label: "Data de Nascimento",
    locale: "pt-br",
  },
  {
    inputComponent: NumberInput,
    name: "address_cep",
    label: "CEP",
    required: true,
  },
  {
    inputComponent: NumberInput,
    name: "address_number",
    label: "Número",
    required: true,
  },
  {
    inputComponent: NumberInput,
    name: "salary",
    label: "Salário",
    required: true,
    parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
    formatter: (value) =>
      !Number.isNaN(parseFloat(value))
        ? `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : "$$ ",
  },
  {
    inputComponent: TextInput,
    name: "vaccination_number",
    label: "Número da Carteira de vacinação",
    required: true,
  },
  {
    inputComponent: NumberInput,
    name: "passport_number",
    label: "Número do Passaporte",
    required: true,
  },
];

export const formModels: FormModel[] = [
  {
    name: "Pilot",
    slug: "piloto",
    fields: [
      ...employeeFields,
      {
        inputComponent: NumberInput,
        name: "pilotLicenseNumber",
        label: "Número da Habilitação",
        required: true,
      },
    ],
  },
  {
    name: "Flight_Attendant",
    slug: "comissario",
    fields: employeeFields,
  },
];
