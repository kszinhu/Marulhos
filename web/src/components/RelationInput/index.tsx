import { useEffect, useState, useMemo } from "react";
import {
  Autocomplete,
  ActionIcon,
  AutocompleteProps,
  Tooltip,
} from "@mantine/core";
import { Plus } from "tabler-icons-react";

import ModalSchema from "@components/ModalInput";

import API from "@services/api";
import { getFormModel } from "../../utils/getFormModel";
import { UseFormReturnType } from "@mantine/form";
import { FormModelInterface } from "../../config/forms";
import useAPI from "@hooks/Services/useAPI";

type ConditionalComponentProps<T> =
  | {
      itemComponent: React.FC<T>;
      optionsMapper: (options: any[]) => T[];
    }
  | {
      itemComponent?: never;
      optionsMapper?: never;
    };

type RelationInputProps<T> = {
  name: string;
  endpoint: string;
  enableCreate?: boolean;
  form: UseFormReturnType<any>;
} & ConditionalComponentProps<T> &
  AutocompleteProps;

const RelationInput = ({
  name,
  endpoint,
  itemComponent,
  optionsMapper,
  enableCreate,
  form,
  ...props
}: RelationInputProps<any>) => {
  const [options, setOptions] = useState<any[]>([]),
    modalState = useState<boolean>(false),
    { call: fetchOptions } = useAPI({ path: endpoint }),
    [_opened, setOpen] = modalState,
    formModel = getFormModel(name)!,
    primaryKey = formModel.fields.find(
      ({ isPrimaryKey }) => isPrimaryKey
    )!.name;

  const modelSchema = useMemo(() => {
    formModel.fields = formModel.fields.map((field) => ({
      ...field,
      name: `${name}.${field.name}`,
    }));

    return formModel;
  }, [formModel, name]) as unknown as FormModelInterface;

  const rightSectionNode = (
    <Tooltip label={`Crie a relação ${name}`}>
      <ActionIcon onClick={() => setOpen(true)}>
        <Plus />
      </ActionIcon>
    </Tooltip>
  );

  useEffect(() => {
    fetchOptions().then(({ data }: { data: any[] }) => {
      setOptions(
        !!itemComponent
          ? optionsMapper(data)
          : data.map((data: any) => ({ value: data[primaryKey] }))
      );
    });
  }, [endpoint, itemComponent, optionsMapper]);

  return (
    <>
      <Autocomplete
        itemComponent={itemComponent}
        {...(enableCreate && { rightSection: rightSectionNode })}
        {...props}
        value={form.values[name][primaryKey]}
        data={options}
      />
      {enableCreate && formModel && (
        <ModalSchema state={modalState} modelSchema={modelSchema} form={form} />
      )}
    </>
  );
};

export default RelationInput;
