import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm, yupResolver } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";

import { ManagerProps, handleFieldTypes } from "../";

import API from "@services/api";

import { Button } from "@mantine/core";
import { Body } from "../styles";
import { IconX, IconCheck } from "@tabler/icons";

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
      <Body sx={{ maxWidth: 600 }} mx='auto'>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          {schema.map((field) => handleFieldTypes(field, form))}
          <Button type='submit' onClick={onSubmit}>
            Adicionar
          </Button>
        </form>
      </Body>
    </section>
  );
}
