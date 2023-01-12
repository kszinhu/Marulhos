import React from "react";

import { SchemaOf } from "yup";
import "dayjs/locale/pt-br";

import {
  Radio,
  NumberInput,
  TextInput,
} from "@mantine/core";
import InputMask from "react-input-mask";
import { DatePicker } from "@mantine/dates";

import { User, Man, Plane, Icon, PackgeImport, Briefcase } from "tabler-icons-react";

// Schemas
import { employeeSchema, pilotSchema } from "../schema";
import { terminalSchema } from "../schema/terminalSchema";
import { loginUserSchema, registerUserSchema } from "../schema/userSchema";
import { planeSchema } from "../schema/planeSchema";
import RelationInput from "@components/RelationInput";
import { companySchema } from "../schema/companySchema";

export enum FieldType {
  text = "text",
  number = "number",
  date = "date",
  select = "select",
  radio = "radio",
  modelSelect = "model-select",
  modelTable = "model-table",
}

type CommonFieldInterfaceProps = {
  inputComponent: any;
  name: string;
  type: FieldType;
  label: string;
  enableCreate?: boolean;
  endpoint?: string;
  component?: React.Component<any> | React.ComponentClass<any>;
  itemComponent?: React.FC<any>;
  isPrimaryKey?: boolean;
  placeholder?: string;
  description?: string;
  required?: boolean;
  defaultValue?: number | string;
  dateParser?: (value: any) => any;
  parser?: (value: any) => string;
  formatter?: (value: any) => any;
  options?: { label: string; value: string }[];
  locale?: string;
  omit?: boolean; // omit from table view
  customInputProps?: any;
}

export type FieldInterface = CommonFieldInterfaceProps

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
    inputComponent: TextInput,
    name: "cpf",
    type: FieldType.text,
    label: "CPF",
    required: true,
    isPrimaryKey: true,
  },
  {
    inputComponent: NumberInput,
    name: "rg",
    type: FieldType.number,
    label: "RG",
    omit: true,
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
    omit: true,
    required: true,
  },
  {
    inputComponent: DatePicker,
    name: "birth_date",
    type: FieldType.date,
    label: "Data de Nascimento",
    locale: "pt-br",
    omit: true,
    customInputProps: {
      allowFreeInput: true
    }
  },
  {
    inputComponent: TextInput,
    name: "address_cep",
    type: FieldType.text,
    label: "CEP",
    required: true,
    omit: true,
  },
  {
    inputComponent: TextInput,
    name: "address_number",
    type: FieldType.text,
    label: "Número",
    required: true,
    omit: true,
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
    inputComponent: NumberInput,
    name: "vaccination_number",
    type: FieldType.number,
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
    inputComponent: NumberInput,
    name: "work_registration_number",
    type: FieldType.number,
    label: "Número do Registro de Trabalho",
    required: true,
  },
];

export interface FormModelInterface {
  name: string;
  slug: string; // url friendly
  endpoint: string;
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
    endpoint: "pilots",
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
    endpoint: "fly_attendants",
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
    endpoint: "planes",
    icon: Plane,
    fields: [
      {
        inputComponent: NumberInput,
        name: 'id',
        type: FieldType.number,
        label: 'ID',
        isPrimaryKey: true,
      },
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
        label: "Data de Fabricação",
        locale: "pt-br",
        required: true,
        customInputProps: {
          allowFreeInput: true
        }
      },
      {
        inputComponent: RelationInput,
        type: FieldType.modelSelect,
        name: "company",
        endpoint: "companies",
        label: "Empresa",
        enableCreate: true,
        required: true,
      }
    ],
    schema: planeSchema,
  },
  {
    name: "terminal",
    slug: "terminais",
    title: "Terminal",
    endpoint: "terminals",
    icon: PackgeImport,
    fields: [
      {
        inputComponent: NumberInput,
        name: "id",
        type: FieldType.number,
        label: "#",
        isPrimaryKey: true,
      },
      {
        inputComponent: NumberInput,
        name: "capacity",
        type: FieldType.number,
        label: "Capacidade do Terminal",
        required: true,
      },
    ],
    schema: terminalSchema,
  },
  {
    name: "company",
    slug: "companhias",
    title: "Companhia",
    endpoint: "companies",
    icon: Briefcase,
    fields: [
      {
        inputComponent: TextInput,
        component: InputMask,
        name: "cnpj",
        type: FieldType.text,
        label: "CNPJ",
        required: true,
        isPrimaryKey: true,
        customInputProps: {
          mask: "99.999.999/9999-99",
        }
      },
      {
        inputComponent: TextInput,
        name: 'name',
        type: FieldType.text,
        label: 'Nome',
        required: true,
      },
      {
        inputComponent: TextInput,
        name: 'contact',
        type: FieldType.text,
        label: 'Contato',
        required: true,
      }
    ],
    schema: companySchema,
  },
];

interface FormAuthenticationInterface {
  endpoint: string; // api endpoint
  slug: string; // url friendly
  title: string;
  schema: SchemaOf<any>;
}

export const formAuthentications: FormAuthenticationInterface[] = [
  {
    endpoint: "auth/register",
    slug: "sign-up",
    title: "Cadastrar",
    schema: registerUserSchema,
  },
  {
    endpoint: "oauth/token",
    slug: "sign-in",
    title: "Entrar",
    schema: loginUserSchema,
  },
];
