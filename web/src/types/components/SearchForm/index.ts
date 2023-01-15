import { SchemaOf } from "yup";

import { FieldType } from "../../../pages/Manager";

export interface IField {
  inputComponent: React.FC<any>;
  name: string;
  type: FieldType;
  label: string;
  required?: boolean;
  defaultValue?: any;
  parser?: (value: any) => string;
  formatter?: (value: any) => any;
  locale?: string;
}

export interface ISearchFormProps {
  yupSchema: SchemaOf<any>;
  schema: IField[];
  endpoint: string;
}
