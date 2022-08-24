import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm, yupResolver } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";

import { ManagerProps } from ".";

import API from "../../services/api";

import { Box, Button } from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons";

enum fieldType {
  text = "text",
  number = "number",
  date = "date",
  select = "select",
  radio = "radio",
}

export default function ManagerViewModel({
  endpoint,
  schema,
  yupSchema,
  title,
  onSubmit,
}: ManagerProps) {
  const { id } = useParams();

  const form = useForm({
    initialValues: schema.reduce(
      (
        acc: any,
        { name, defaultValue }: { name: string; defaultValue?: any }
      ) => {
        acc[name] = defaultValue || "";
        return acc;
      },
      {}
    ),
    validate: yupResolver(yupSchema),
  });

  useEffect(() => {
    // change title of the page
    document.title = `Manager - ${title}`;

    // call api to get data
    showNotification({
      id: `${endpoint}-list`,
      message: `Conectando ao servidor`,
      loading: true,
      disallowClose: true,
    });

    API.get(`${import.meta.env.VITE_API_URL}${endpoint}/${id}`)
      .then(({ data: values }: any) => {
        form.setValues(values);
        updateNotification({
          id: `${endpoint}-list`,
          message: `${title} carregado com sucesso!`,
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
                const props = form.getInputProps(name);

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
                    {...props}
                    value={parseInt(props.value)}
                  />
                );
              } else if (type === fieldType.date) {
                const props = form.getInputProps(name);

                return (
                  <Input
                    key={name}
                    label={label}
                    placeholder={placeholder}
                    description={description}
                    required={required}
                    defaultValue={defaultValue}
                    locale={locale}
                    {...props}
                    value={new Date(props.value)}
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
