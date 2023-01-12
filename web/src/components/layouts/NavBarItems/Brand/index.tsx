import { ActionIcon, Box, Group, useMantineColorScheme } from "@mantine/core";
import { Moon, Sun } from "tabler-icons-react";

const Brand = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Box>
      <Group>
        Colocar Imagem
        <ActionIcon onClick={() => toggleColorScheme()} size={30}>
          {colorScheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </ActionIcon>
      </Group>
    </Box>
  );
};

export { Brand };
