"use client";
import React from "react";
import { Box, Container } from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
};

export default function Popup({ children, isOpen }: Props) {
  return (
    <Container
      pos={"fixed"}
      zIndex={10}
      minW={"100vw"}
      minH={"100vh"}
      left={0}
      top={0}
      p={0}
    >
      <Box
        pos={"absolute"}
        h={"100vh"}
        w={"100vw"}
        bgColor={"black"}
        opacity={0.5}
      ></Box>
      <Box
        rounded={"lg"}
        bg={"white"}
        boxShadow={"lg"}
        width="50%"
        p={8}
        position={"absolute"}
        top={isOpen ? "50%" : "-100%"}
        left="50%"
        transform="translate(-50%, -50%)"
        transition="top 0.3s"
      >
        {children}
      </Box>
    </Container>
  );
}
