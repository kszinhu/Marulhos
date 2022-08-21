import { SchemaOf } from "yup";
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

// Schemas
import { employeeSchema, pilotSchema } from "../schema";

enum fieldType {
  text = "text",
  number = "number",
  date = "date",
  select = "select",
  radio = "radio",
}

interface FieldInterface {
  inputComponent: Function;
  name: string;
  type: fieldType;
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
  schema: SchemaOf<any>;
}

const employeeFields: FieldInterface[] = [
  {
    inputComponent: TextInput,
    name: "name",
    type: fieldType.text,
    label: "Nome",
    required: true,
  },
  {
    inputComponent: TextInput,
    name: "last_name",
    type: fieldType.text,
    label: "Sobrenome",
    required: true,
  },
  {
    inputComponent: NumberInput,
    name: "CPF",
    type: fieldType.number,
    label: "CPF",
    required: true,
  },
  {
    inputComponent: NumberInput,
    name: "RG",
    type: fieldType.number,
    label: "RG",
  },
  {
    inputComponent: Radio,
    name: "sex",
    type: fieldType.radio,
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
    name: "birth_date",
    type: fieldType.date,
    label: "Data de Nascimento",
    locale: "pt-br",
  },
  {
    inputComponent: NumberInput,
    name: "address_cep",
    type: fieldType.number,
    label: "CEP",
    required: true,
  },
  {
    inputComponent: NumberInput,
    name: "address_number",
    type: fieldType.number,
    label: "Número",
    required: true,
  },
  {
    inputComponent: NumberInput,
    name: "salary",
    type: fieldType.number,
    label: "Salário",
    required: true,
    parser: (value) => value.replace(/\R\$\s?|(,*)/g, ""),
    formatter: (value) =>
      !Number.isNaN(parseFloat(value))
        ? `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : "R$ ",
  },
  {
    inputComponent: TextInput,
    name: "vaccination_number",
    type: fieldType.text,
    label: "Número da Carteira de vacinação",
    required: true,
  },
  {
    inputComponent: NumberInput,
    name: "passport_number",
    type: fieldType.number,
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
        name: "pilot_license_number",
        type: fieldType.number,
        label: "Número da Habilitação",
        required: true,
      },
    ],
    schema: pilotSchema,
  },
  {
    name: "Flight_Attendant",
    slug: "comissario",
    fields: employeeFields,
    schema: employeeSchema,
  },
];
