"use client";
import { Container } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useMemo, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useAppSelector } from "@/redux/store";
import {
  Flex,
  Box,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, RepeatIcon } from "@chakra-ui/icons";
import { linkColor, linkHoverColor, nationalities } from "../constants";
import { Register } from "../models";
import useAuthHook from "@/hooks/useAuthHook";
type Props = {};

export default function SignUp({}: Props) {
  const { registerAction, questionAlert } = useAuthHook();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAppSelector((state) => state.auth);

  const schema = yup.object().shape({
    name: yup.string().required("Full name is required!"),
    email: yup.string().email().required("Email is required!"),
    password: yup.string().min(8).required("Password is required!"),
    phone: yup.string().min(10).required("Phone numbers is required!"),
    nationality: yup.string().required("Nationality is required!"),
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

  const onSubmit = (values: Register) => {
    const alertObj = {
      title: "Are you sure?",
      text: "You are registering!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm!",
    };
    questionAlert(registerAction, values, alertObj);
  };

  function resetForm(): void {
    reset({
      email: "",
      password: "",
      name: "",
      phone: "",
      nationality: "",
    });
  }

  const nationalityList = useMemo(() => {
    return nationalities;
  }, []);
  return (
    <Container pt={"5rem"}>
      <Flex align={"center"} justify={"center"}>
        <Stack spacing={5} mx={"30%"} maxW={"lg"} minW={"40vw"} py={10} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"} color={"white"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={linkColor}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} width="100%" p={8}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={5}>

                <FormControl
                  id="name"
                  isRequired
                  isInvalid={Boolean(errors.name)}
                >
                  <FormLabel htmlFor="name">Full Name</FormLabel>
                  <Input type="text" {...register("name")} />
                  <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
                </FormControl>

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

                <Flex gap={4}>
                  <FormControl
                    id="phone"
                    isRequired
                    isInvalid={Boolean(errors.phone)}
                  >
                    <FormLabel htmlFor="phone">Phone Numbers</FormLabel>
                    <Input type="text" {...register("phone")} />
                    <FormErrorMessage>
                      {errors?.phone?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    id="nationality"
                    isRequired
                    isInvalid={Boolean(errors.nationality)}
                  >
                    <FormLabel htmlFor="nationality">Nationality</FormLabel>
                    <Select
                      id="nationality"
                      placeholder="Select nationality"
                      {...register("nationality")}
                    >
                      {nationalityList.map((item, index) => {
                        return <option key={index}>{item}</option>;
                      })}
                    </Select>
                    <FormErrorMessage>
                      {errors?.nationality?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>

                <Flex gap={4}>
                  <Button
                    flex="1"
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                    color={"black"}
                    bgColor={linkColor}
                    _hover={{
                      bg: linkHoverColor,
                    }}
                    isLoading={isSubmitting}
                  >
                    Sign up
                  </Button>
                  <Button
                    loadingText="Reset"
                    size="lg"
                    color={"white"}
                    bgColor={"blue.400"}
                    _hover={{
                      bg: "blue.300",
                    }}
                    onClick={resetForm}
                  >
                    <RepeatIcon />
                  </Button>
                </Flex>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Already a user?{" "}
                    <Link as={NextLink} href="/" color={"blue.400"}>
                      Login
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </Container>
  );
}
