import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Group, Menu, UnstyledButton } from "@mantine/core";

import { User } from "@components/layouts/NavBarItems";
import { AuthenticationRoutes } from "@config/routes";

interface IUserSectionProps {
  name?: string;
  imageUrl?: string;
  email?: string;
  isLoggedIn?: boolean;
}

const UserSection = ({ isLoggedIn, ...UserProps }: IUserSectionProps) => {
  const [menuOpened, setMenuOpen] = useState<boolean>(false),
    navigate = useNavigate(),
    [registerPath, loginPath] = AuthenticationRoutes.filter(
      ({ key }) => key === "login" || key === "register"
    ).map(({ path }) => path);

  return (
    <Menu
      shadow='sm'
      transition='pop-top-right'
      position='right'
      opened={menuOpened}
      onOpen={() => setMenuOpen(true)}
      onClose={() => setMenuOpen(false)}
    >
      <Menu.Target>
        <UnstyledButton sx={{ display: "block" }}>
          {isLoggedIn ? (
            <User {...UserProps} />
          ) : (
            <Group dir='row' position='center' grow px='md'>
              <Button
                variant='default'
                sx={{ maxWidth: "unset" }}
                onClick={() => navigate(`/auth/${loginPath}`)}
              >
                Entrar
              </Button>
              <Button
                sx={{ maxWidth: "unset" }}
                onClick={() => navigate(`/auth/${registerPath}`)}
              >
                Cadastrar
              </Button>
            </Group>
          )}
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserSection;
