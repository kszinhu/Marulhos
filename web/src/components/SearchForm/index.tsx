import { useForm, yupResolver } from "@mantine/form";

import { ISearchFormProps } from "@applicationTypes/components/SearchForm";
import { Box } from "@mantine/core";

import { useStyles } from "./styles";
import useAPI from "@hooks/Services/useAPI";
import { handleFieldTypes } from "../../pages/Manager";

const SearchForm = ({ schema, endpoint, yupSchema }: ISearchFormProps) => {
  const form = useForm({
      initialValues: schema.reduce((acc, field) => {
        (acc as any)[field.name] = field.defaultValue;
        return acc;
      }, {}),
      validate: yupResolver(yupSchema),
    }),
    { call: onSubmit } = useAPI({
      path: endpoint,
      method: "POST",
    }),
    { classes } = useStyles();

  const handleSubmit = async (values: any) => {
    // TODO: Adicionar middleware para filtros
    onSubmit(values);
  };

  return (
    <Box className={classes.root}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {schema.map((field) => handleFieldTypes(field, form))}
      </form>
    </Box>
  );
};

export default SearchForm;
