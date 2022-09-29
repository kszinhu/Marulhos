import { useEffect } from "react";
import { useForm, yupResolver } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";

import { ManagerProps, handleFieldTypes } from "../";

import API from "@services/api";

import { Button, Group } from "@mantine/core";
import { Body } from "../styles";
import { IconX, IconCheck } from "@tabler/icons";

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

    API.get(`/api/${endpoint}`)
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
  }, [title]);

  return (
    <section>
      <Body sx={{ maxWidth: 600 }} mx='auto'>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          {schema.map((field) => handleFieldTypes(field, form))}
          <Group position='center' mt='md'>
            <Button type='submit' onClick={onSubmit} style={{ width: "100%" }}>
              Adicionar
            </Button>
          </Group>
        </form>
      </Body>
    </section>
  );
}
