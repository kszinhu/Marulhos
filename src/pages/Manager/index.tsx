import { useForm, yupResolver } from '@mantine/form';

import { Button } from '@mantine/core';

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

interface ManagerProps {
  schema: FieldInterface[];
  onSubmit: (values: any) => void; // OnSubmit is a function that takes the form values and submits them to the server
};

export default function Manager({ schema, onSubmit }: ManagerProps) {
  return (
    <div>
      <h1>Manager</h1>
    </div>
  );
}
