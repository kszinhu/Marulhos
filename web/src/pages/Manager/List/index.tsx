import { useEffect, useState } from "react";
import { showNotification, updateNotification } from "@mantine/notifications";

import { ManagerProps } from "../";

import useAPI from "@hooks/Services/useAPI";

import { ActionIcon, Group, Table, ScrollArea, Center } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconPencil, IconTrash, IconCheck, IconX } from "@tabler/icons";

export default function ManagerListModel({
  endpoint,
  schema,
  yupSchema,
  title,
  onSubmit,
}: ManagerProps) {
  const [dataModel, setDataModel] = useState([]),
    { call: fetchModel } = useAPI({ path: endpoint }),
    primaryKey = schema.find((field) => field.isPrimaryKey)!.name,
    { call: deleteModel } = useAPI({
      path: `${endpoint}/${primaryKey}`,
      method: "DELETE",
    });

  const onRemove = (primaryKey: string | number) => {
    deleteModel().then(() => {
      setDataModel((prevData) =>
        prevData.filter((data) => data[primaryKey] !== primaryKey)
      );
      updateNotification({
        id: `${endpoint}-list`,
        message: `Registro removido com sucesso!`,
        color: "teal",
        icon: <IconCheck size={20} />,
        loading: false,
        autoClose: 1500,
      });
    });
  };

  useEffect(() => {
    // change title of the page
    document.title = `Manager - ${title}`;

    showNotification({
      id: `${endpoint}-list`,
      message: `Conectando ao servidor`,
      loading: true,
      disallowClose: true,
    });

    fetchModel()
      .then((data: any) => {
        debugger;
        setDataModel(data);
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
  }, [title, endpoint]);

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing='sm'>
        <thead>
          <tr>
            {schema
              .sort(({ isPrimaryKey }) => (isPrimaryKey ? -1 : 1))
              .map(
                ({ label, omit }, index) =>
                  !omit && <th key={`label-${index}`}>{label}</th>
              )}
            <th>Ações</th>
          </tr>
        </thead>
        {dataModel.length > 0 && (
          <tbody>
            {dataModel.map((item: any) => (
              <tr key={`primary-key-${item[primaryKey]}`}>
                <td>{item[primaryKey]}</td>
                {schema.map(({ name, omit, isPrimaryKey, type, locale }) => {
                  const value = item[name as keyof typeof item];

                  return (
                    value &&
                    !omit &&
                    !isPrimaryKey && (
                      <td>
                        {type === "date"
                          ? Intl.DateTimeFormat(locale).format(new Date(value))
                          : value}
                      </td>
                    )
                  );
                })}
                <td>
                  <Group spacing={0} position='left'>
                    <ActionIcon component={Link} to={`${item.id}/edit`}>
                      <IconPencil size={16} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon onClick={() => onRemove(item[primaryKey])}>
                      <IconTrash size={16} stroke={1.5} />
                    </ActionIcon>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
      {dataModel.length === 0 && (
        <Center>
          <h1>Nenhum registro encontrado</h1>
        </Center>
      )}
    </ScrollArea>
  );
}
