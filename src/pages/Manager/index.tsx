import { SchemaOf } from "yup";

import ManagerAddModel from "./add";
import ManagerEditModel from "./edit";
import ManagerViewModel from "./view";
import ManagerListModel from "./list";

interface FieldInterface {
  inputComponent: any;
  name: string;
  type: string;
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

export interface ManagerProps {
  endpoint: string;
  schema: FieldInterface[];
  yupSchema: SchemaOf<any>;
  title: string;
  onSubmit: (values: any) => void; // OnSubmit is a function that takes the form values and submits them to the server
}

export const Manager = {
  Add: ManagerAddModel,
  Edit: ManagerEditModel,
  View: ManagerViewModel,
  List: ManagerListModel,
};
