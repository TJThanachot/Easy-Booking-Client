import React from "react";
import {
  Box,
  Container,
  Divider,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Flex,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
type Props = {};

export default function Calendar({}: Props) {
  return (
    <Container pt={"10rem"} pb={"5rem"} minW={"60vw"} minH={"93vh"}>
      <Box color={"white"}>The Lord Room Calendar</Box>
    </Container>
  );
}
