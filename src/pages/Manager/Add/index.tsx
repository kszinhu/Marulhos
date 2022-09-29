import { useEffect } from "react";
import { useForm, yupResolver } from "@mantine/form";

import { ManagerProps, handleFieldTypes } from "../";

import { Button } from "@mantine/core";
import { Body } from "../styles";

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
