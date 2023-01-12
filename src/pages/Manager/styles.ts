import styled from "styled-components";

import { Box, BoxProps } from "@mantine/core";

const Body = styled(Box) <BoxProps>`
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export { Body };
