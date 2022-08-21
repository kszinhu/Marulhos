import { ThemeIcon, UnstyledButton, Group, Text, Stack } from "@mantine/core";
import { Link } from "react-router-dom";
import { Icon } from "tabler-icons-react";
import { formModels } from "../../../config/forms";

interface MainLinksProps {
  title: string;
  link: string;
  icon: Icon;
}

const NavbarLink = ({ title, link, icon: IconComponent }: MainLinksProps) => {
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <UnstyledButton
        sx={(theme) => ({
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <ThemeIcon variant='light'>
            <IconComponent size={16} />
          </ThemeIcon>
          <Text size='sm'>{title}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
};

const MainLinks = () => {
  const links = formModels.map(({ icon, slug, title }) => (
    <NavbarLink key={slug} title={title} link={slug} icon={icon} />
  ));

  return <Stack>{links}</Stack>;
};

export { NavbarLink, MainLinks };
