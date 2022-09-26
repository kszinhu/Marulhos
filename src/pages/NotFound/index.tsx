import { useEffect } from "react";

import { Text, Center, Title, Button, MediaQuery } from "@mantine/core";
import { Link } from "react-router-dom";

interface NotFoundProps {
  title: string;
}

export default function NotFound({ title }: NotFoundProps) {
  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <div>
        <Title order={1} align='center'>
          404
        </Title>
        <Text align='center'>Page not found</Text>
        <MediaQuery smallerThan='sm' styles={{ display: "none" }}>
          <Text color='dimmed' align='center'>
            The page you are looking for does not exist.
          </Text>
        </MediaQuery>
        <MediaQuery largerThan='sm' styles={{ display: "none" }}>
          <Text color='dimmed' align='center'>
            The page you are looking for does not exist.
          </Text>
        </MediaQuery>
      </div>
      <Center>
        <Button component={Link} to='/' variant='subtle'>
          Go home
        </Button>
      </Center>
    </div>
  );
}
