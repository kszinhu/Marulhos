import { Box } from "@mantine/core";
import { useEffect } from "react";

import { HeroHeader } from "./content";

interface HomeProps {
  title: string;
}

export default function Home({ title }: HomeProps) {
  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <>
      <HeroHeader />
      <Box p='md'>
        <h1>Home</h1>
      </Box>
    </>
  );
}
