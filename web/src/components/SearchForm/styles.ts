import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    maxWidth: "md",
    margin: "auto",
    padding: "md",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    [theme.fn.smallerThan("xs")]: {
      padding: "sm",
    },
  },
}));

export { useStyles };
