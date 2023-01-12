import { SchemaOf } from "yup";
import { UseFormReturnType } from "@mantine/form";
import { FieldInterface, FieldType } from "../../config/forms";

import ManagerAddModel from "./Add";
import ManagerEditModel from "./Edit";
import ManagerViewModel from "./Show";
import ManagerListModel from "./List";

interface Response {
  data: {
    [key: string]: any;
  };
  message: string;
  status: number;
}

export interface ManagerProps {
  endpoint: string;
  title: string;
  modelName: string;
  schema: FieldInterface[];
  yupSchema: SchemaOf<any>;
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
    itemComponent: Item,
    name,
    type,
    label,
    isPrimaryKey,
    placeholder,
    description,
    required,
    defaultValue,
    parser,
    formatter,
    options,
    locale,
    endpoint,
    customInputProps,
    ...restInputProps
  }: FieldInterface,
  form: UseFormReturnType<any>
) => {
  if (isPrimaryKey && !required) return null;

  switch (type) {
    case FieldType.text:
      return (
        <Input
          {...restInputProps}
          {...customInputProps}
          key={name}
          label={label}
          placeholder={placeholder}
          description={description}
          required={required}
          defaultValue={defaultValue}
          {...((form.errors[name] && { error: form.errors[name] }) || {})}
          {...form.getInputProps(name)}
        />
      );

    case FieldType.number:
      return (
        <Input
          {...restInputProps}
          {...customInputProps}
          key={name}
          label={label}
          placeholder={placeholder}
          description={description}
          required={required}
          defaultValue={defaultValue}
          parser={parser}
          formatter={formatter}
          {...((form.errors[name] && { error: form.errors[name] }) || {})}
          {...form.getInputProps(name)}
        />
      );

    case FieldType.date:
      return (
        <Input
          {...restInputProps}
          {...customInputProps}
          key={name}
          label={label}
          placeholder={placeholder}
          description={description}
          required={required}
          defaultValue={defaultValue}
          locale={locale}
          {...((form.errors[name] && { error: form.errors[name] }) || {})}
          {...form.getInputProps(name)}
        />
      );

    case FieldType.select:
      return (
        <Input
          {...restInputProps}
          {...customInputProps}
          key={name}
          label={label}
          placeholder={placeholder}
          description={description}
          required={required}
          defaultValue={defaultValue}
          data={options}
          {...((form.errors[name] && { error: form.errors[name] }) || {})}
          {...form.getInputProps(name)}
        />
      );

    case FieldType.radio:
      return (
        <Input.Group
          key={`${name}-group`}
          {...customInputProps}
          {...restInputProps}
          {...form.getInputProps(name)}
        >
          {options &&
            options.length > 0 &&
            options.map(({ label, value }) => (
              <Input key={value} value={value} label={label} />
            ))}
        </Input.Group>
      );

    case FieldType.modelSelect:
      return (
        <Input
          {...restInputProps}
          {...customInputProps}
          key={name}
          name={name}
          label={label}
          endpoint={endpoint}
          optionsMapper={formatter}
          itemComponent={Item}
          form={form}
          {...((form.errors[name] && { error: form.errors[name] }) || {})}
          {...form.getInputProps(name)}
        />
      );

    default:
      throw new Error("Field type not supported");
  }
};

export { Manager, FieldType, handleFieldTypes };
