"use client";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Flex,
  Box,
  InputGroup,
  InputRightElement,
  Stack,
  Heading,
  Text,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Container,
  Checkbox,
} from "@chakra-ui/react";

import { linkColor, linkHoverColor } from "../constants";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useAuthHook from "@/hooks/useAuthHook";
export default function SimpleCard() {
  const [showPassword, setShowPassword] = useState(false);
  const { signInAction } = useAuthHook();

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required!"),
    password: yup.string().min(5).required("Password is required!"),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: any) => {
    signInAction(values);
  };

  return (
    <Container pt={"5rem"} minH={"93vh"}>
      <Flex align={"center"} justify={"center"}>
        <Stack spacing={5} mx={"30%"} maxW={"lg"} minW={"40vw"} py={10} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} color={"white"}>
              Sign in to your account
            </Heading>
            <Text fontSize={"lg"} color={linkColor}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} width="100%" p={8}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={5}>
                <FormControl
                  id="email"
                  isRequired
                  isInvalid={Boolean(errors.email)}
                >
                  <FormLabel htmlFor="email">Email address</FormLabel>
                  <Input type="email" {...register("email")} />
                  <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl
                  id="password"
                  isRequired
                  isInvalid={Boolean(errors.password)}
                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors?.password?.message}
                  </FormErrorMessage>
                </FormControl>

                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Text color={"blue.400"}>Forgot password?</Text>
                  </Stack>
                  <Button
                    type="submit"
                    bg={"blue.400"}
                    size="lg"
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </Container>
  );
}
