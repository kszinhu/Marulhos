import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useForm, yupResolver } from "@mantine/form";
import { Button } from "@mantine/core";

import useAPI from "@hooks/Services/useAPI";

import { ManagerProps, handleFieldTypes } from "../";

import { Body } from "../styles";

export default function ManagerEditModel({
  schema,
  yupSchema,
  endpoint,
  title,
  onSubmit,
}: ManagerProps) {
  const { id } = useParams(),
    { call: fetchModel } = useAPI({ path: `${endpoint}/${id}` });

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
    fetchModel().then(({ data }: any) => {
      const { manufacture_date: manufactureDate, ...rest } = data;
      form.setValues({
        ...rest,
        manufacture_date: new Date(manufactureDate),
      });
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
