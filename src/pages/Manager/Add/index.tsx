import { useEffect } from "react";
import { useForm, yupResolver } from "@mantine/form";

import { ManagerProps } from "..";

import { Box, Button } from "@mantine/core";


enum fieldType {
  text = "text",
  number = "number",
  date = "date",
  select = "select",
  radio = "radio",
}

export default function ManagerAddModel({
  schema,
  yupSchema,
  title,
  onSubmit,
}: ManagerProps) {
  const form = useForm({
    initialValues: schema.reduce((acc, field) => {
      (acc as any)[field.name] = field.defaultValue;
      return acc;
    }, {}),
    validate: yupResolver(yupSchema),
  });

  useEffect(() => {
    // change title of the page
    document.title = `Manager - ${title}`;
  }, []);

  return (
    <section>
      <Box sx={{ maxWidth: 600 }} mx='auto'>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          {schema.map(
            ({
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
            }) => {
              if (type === fieldType.text) {
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
              } else if (type === fieldType.number) {
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
              } else if (type === fieldType.date) {
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
              } else if (type === fieldType.select) {
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
              } else if (type === fieldType.radio) {
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
              }
            }
          )}
          <Button type='submit' onClick={onSubmit}>
            Adicionar
          </Button>
        </form>
      </Box>
    </section>
  );
}
