import { useEffect, useState } from "react";
import { showNotification, updateNotification } from "@mantine/notifications";

import { ManagerProps, handleFieldTypes } from "../";

import API from "@services/api";

import { ActionIcon, Group, Table, ScrollArea, Center } from "@mantine/core";
import { IconPencil, IconTrash, IconCheck, IconX } from "@tabler/icons";

export default function ManagerListModel({
  endpoint,
  schema,
  yupSchema,
  title,
  onSubmit,
}: ManagerProps) {
  const [dataModel, setDataModel] = useState([]);

  const rows = dataModel.map((item: any) => (
    <tr key={item.id}>
      {schema.map(
        ({ name, omit }) => !omit && <td>{item[name as keyof typeof item]}</td>
      )}
      <td>
        <Group spacing={0} position='right'>
          <ActionIcon>
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon>
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

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
  }, [title]);

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing='sm'>
        <thead>
          <tr>{schema.map(({ label, omit }) => !omit && <th>{label}</th>)}</tr>
        </thead>
        {dataModel.length > 0 && <tbody>{rows}</tbody>}
      </Table>
      {dataModel.length === 0 && (
        <Center>
          <h1>Nenhum registro encontrado</h1>
        </Center>
      )}
    </ScrollArea>
  );
}
