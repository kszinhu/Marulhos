import SearchForm from "@components/SearchForm";
import { createStyles, Container } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: "#11284b",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage:
      "linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(/hero-background.jpg)",
    paddingTop: theme.spacing.xl * 1.5,
    paddingBottom: theme.spacing.xl * 1.5,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
  },

  content: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      marginRight: 0,
    },
  },
}));

export default function HeroHeader() {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <Container size='lg'>
        <div className={classes.inner}>
          <div className={classes.content}>asdasd</div>
        </div>
      </Container>
    </div>
  );
}
