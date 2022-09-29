import React from "react";

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

import { User, Man, Plane, Icon, PackgeImport } from "tabler-icons-react";

// Schemas
import { employeeSchema, pilotSchema } from "../schema";
import { terminalSchema } from "../schema/terminalSchema";

export enum FieldType {
  text = "text",
  number = "number",
  date = "date",
  select = "select",
  radio = "radio",
  modelSelect = "model-select",
  modelTable = "model-table",
}

export interface FieldInterface {
  inputComponent: any;
  name: string;
  type: FieldType;
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  allowFreeInput?: boolean;
  defaultValue?: number | string;
  dateParser?: (value: any) => any;
  parser?: (value: any) => string;
  formatter?: (value: any) => string;
  options?: { label: string; value: string }[];
  locale?: string;
}

const employeeFields: FieldInterface[] = [
  {
    inputComponent: TextInput,
    name: "name",
    type: FieldType.text,
    label: "Nome",
    required: true,
  },
  {
    inputComponent: TextInput,
    name: "last_name",
    type: FieldType.text,
    label: "Sobrenome",
    required: true,
  },
  {
    inputComponent: NumberInput,
    name: "cpf",
    type: FieldType.number,
    label: "CPF",
    required: true,
  },
  {
    inputComponent: NumberInput,
    name: "rg",
    type: FieldType.number,
    label: "RG",
  },
  {
    inputComponent: Radio,
    name: "sex",
    type: FieldType.radio,
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
    type: FieldType.date,
    label: "Data de Nascimento",
    locale: "pt-br",
  },
  {
    inputComponent: TextInput,
    name: "address_cep",
    type: FieldType.text,
    label: "CEP",
    required: true,
  },
  {
    inputComponent: TextInput,
    name: "address_number",
    type: FieldType.text,
    label: "Número",
    required: true,
  },
  {
    inputComponent: NumberInput,
    name: "salary",
    type: FieldType.number,
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
    type: FieldType.text,
    label: "Número da Carteira de vacinação",
    required: true,
  },
  {
    inputComponent: NumberInput,
    name: "passport_number",
    type: FieldType.number,
    label: "Número do Passaporte",
    required: true,
  },
  {
    inputComponent: TextInput,
    name: "work_registration_number",
    type: FieldType.text,
    label: "Número do Registro de Trabalho",
    required: true,
  },
];

interface FormModelInterface {
  name: string;
  slug: string; // url friendly
  title: string;
  icon: Icon;
  fields: FieldInterface[];
  schema: SchemaOf<any>;
}

export const formModels: FormModelInterface[] = [
  {
    name: "pilot",
    slug: "pilotos",
    title: "Piloto",
    icon: User,
    fields: [
      ...employeeFields,
      {
        inputComponent: NumberInput,
        name: "pilot_license_number",
        type: FieldType.number,
        label: "Número da Habilitação",
        required: true,
      },
    ],
    schema: pilotSchema,
  },
  {
    name: "fly_attendant",
    slug: "comissarios",
    title: "Comissário",
    icon: User,
    fields: [
      ...employeeFields,
      {
        inputComponent: NumberInput,
        name: "work_registration_number",
        type: FieldType.number,
        label: "Número do Registro",
        required: true,
      },
    ],
    schema: employeeSchema,
  },
  {
    name: "plane",
    slug: "avioes",
    title: "Avião",
    icon: Plane,
    fields: [
      {
        inputComponent: NumberInput,
        name: "capacity",
        type: FieldType.number,
        label: "Capacidade",
        required: true,
      },
      {
        inputComponent: TextInput,
        name: "model",
        type: FieldType.text,
        label: "Modelo",
        required: true,
      },
      {
        inputComponent: DatePicker,
        name: "manufacture_date",
        type: FieldType.date,
        label: "Ano de Fabricação",
        allowFreeInput: true,
        locale: "pt-br",
        required: true,
      },
    ],
    schema: employeeSchema,
  },
  {
    name: "terminal",
    slug: "terminais",
    title: "Terminal",
    icon: PackgeImport,
    fields: [
      {
        inputComponent: NumberInput,
        name: "terminal_number",
        type: FieldType.number,
        label: "Número do Terminal",
        required: true,
      },
      {
        inputComponent: NumberInput,
        name: "terminal_capacity",
        type: FieldType.number,
        label: "Capacidade do Terminal",
        required: true,
      },
    ],
    schema: terminalSchema,
  },
];
