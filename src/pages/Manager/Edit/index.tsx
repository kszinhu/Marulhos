import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm, yupResolver } from "@mantine/form";

import { ManagerProps, handleFieldTypes } from "../";

import { Button } from "@mantine/core";
import { Body } from "../styles";
import API from "@services/api";

export default function ManagerEditModel({
  schema,
  yupSchema,
  endpoint,
  title,
  onSubmit,
}: ManagerProps) {
  const { id } = useParams();

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

    // call api to get data
    API.get(`/api/${endpoint}/${id}`).then(({ data }: any) => {
      const { manufacture_date: manufactureDate, ...rest } = data;
      form.setValues({ ...rest, manufacture_date: new Date(manufactureDate) });
    });
  }, []);

  return (
    <section>
      <Body sx={{ maxWidth: 600 }} mx='auto'>
        <form onSubmit={form.onSubmit(onSubmit)}>
          {schema.map((field) => handleFieldTypes(field, form))}
          <Button type='submit' onClick={onSubmit}>
            Adicionar
          </Button>
        </form>
      </Body>
    </section>
  );
}
