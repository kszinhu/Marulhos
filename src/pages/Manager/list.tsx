import { useEffect } from "react";
import { useForm, yupResolver } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";

import { ManagerProps } from ".";

import API from "../../services/api";

import { Box, Button, Group } from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons";

enum fieldType {
  text = "text",
  number = "number",
  date = "date",
  select = "select",
  radio = "radio",
}

export default function ManagerListModel({
  endpoint,
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

    showNotification({
      id: `${endpoint}-list`,
      message: `Conectando ao servidor`,
      loading: true,
      disallowClose: true,
    });

    API.get(`${import.meta.env.VITE_API_URL}${endpoint}`)
      .then(({ data }: any) => {
        form.setValues(data);
        updateNotification({
          id: `${endpoint}-list`,
          message: `Lista de ${title} carregada com sucesso!`,
          color: "teal",
          icon: <IconCheck size={20} />,
          loading: false,
          autoClose: 1500,
        });
      })
      .catch((err: any) => {
        console.error(err);
        updateNotification({
          id: `${endpoint}-list`,
          message: "Não foi possível carregar",
          color: "red",
          icon: <IconX size={20} />,
          loading: false,
          autoClose: 1500,
        });
      });
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
          <Group position='center' mt='md'>
            <Button type='submit' onClick={onSubmit} style={{ width: "100%" }}>
              Adicionar
            </Button>
          </Group>
        </form>
      </Box>
    </section>
  );
}
