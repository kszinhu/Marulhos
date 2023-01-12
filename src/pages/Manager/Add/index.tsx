import { useEffect } from "react";
import { useForm, yupResolver } from "@mantine/form";

import { ManagerProps, handleFieldTypes } from "../";

import { Button } from "@mantine/core";
import { Body } from "../styles";
import { getFormModel } from "../../../utils/getFormModel";

export default function ManagerAddModel({
  schema,
  yupSchema,
  title,
  onSubmit,
  modelName,
}: ManagerProps) {
  const form = useForm({
    initialValues: schema.reduce((acc, field) => {
      const isRelation = field.type.includes("model");
      if (isRelation) {
        const relationFormModel = getFormModel(field.name)!;
        (acc as any)[field.name] = relationFormModel.fields.reduce(
          (acc, field) => {
            (acc as any)[field.name] = field.defaultValue;
            return acc;
          },
          {}
        );
        return acc;
      } else {
        (acc as any)[field.name] = field.defaultValue;
        return acc;
      }
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
        <form onSubmit={form.onSubmit(onSubmit)}>
          {schema.map((field) => handleFieldTypes(field, form))}
          <Button type='submit'>Adicionar</Button>
        </form>
      </Body>
    </section>
  );
}
