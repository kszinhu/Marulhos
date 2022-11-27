import { SchemaOf } from "yup";
import { UseFormReturnType } from "@mantine/form";
import { FieldInterface, FieldType } from "../../config/forms";

import ManagerAddModel from "./Add";
import ManagerEditModel from "./Edit";
import ManagerViewModel from "./Show";
import ManagerListModel from "./List";
import { AxiosResponse } from "axios";

interface Response {
  data: {
    [key: string]: any;
  };
  message: string;
  status: number;
}

export interface ManagerProps {
  endpoint: string;
  schema: FieldInterface[];
  yupSchema: SchemaOf<any>;
  title: string;
  onSubmit: (values: any) => any;
}

const Manager = {
  Add: ManagerAddModel,
  Edit: ManagerEditModel,
  View: ManagerViewModel,
  List: ManagerListModel,
};

const handleFieldTypes = (
  {
    inputComponent: Input,
    name,
    type,
    label,
    placeholder,
    description,
    required,
    defaultValue,
    parser,
    formatter,
    options,
    locale,
  }: FieldInterface,
  form: UseFormReturnType<any>
) => {
  switch (type) {
    case FieldType.text:
      return (
        <Input
          key={name}
          label={label}
          placeholder={placeholder}
          description={description}
          required={required}
          defaultValue={defaultValue}
          {...form.getInputProps(name)}
        />
      );

    case FieldType.number:
      return (
        <Input
          key={name}
          label={label}
          placeholder={placeholder}
          description={description}
          required={required}
          defaultValue={defaultValue}
          parser={parser}
          formatter={formatter}
          {...form.getInputProps(name)}
        />
      );

    case FieldType.date:
      return (
        <Input
          key={name}
          label={label}
          placeholder={placeholder}
          description={description}
          required={required}
          defaultValue={defaultValue}
          locale={locale}
          {...form.getInputProps(name)}
        />
      );

    case FieldType.select:
      return (
        <Input
          key={name}
          label={label}
          placeholder={placeholder}
          description={description}
          required={required}
          defaultValue={defaultValue}
          data={options}
          {...form.getInputProps(name)}
        />
      );

    case FieldType.radio:
      return (
        <Input.Group
          key={`${name}-group`}
          onChange={(value: any) => form.setFieldValue(name, value)}
          {...form.getInputProps(name)}
        >
          {options &&
            options.length > 0 &&
            options.map(({ label, value }) => (
              <Input key={value} value={value} label={label} />
            ))}
        </Input.Group>
      );

    default:
      throw new Error("Field type not supported");
  }
};

export { Manager, FieldType, handleFieldTypes };
