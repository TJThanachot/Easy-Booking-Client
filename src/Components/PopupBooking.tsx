"use client";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Checkbox,
} from "@chakra-ui/react";
type Props = {};

export default function PopupBooking({}: Props) {
  const schema = yup.object().shape({
    checkIn: yup.string().required("Check in date is required!"),
    checkOut: yup.string().required("Check out date id required!"),
    totalPeople: yup.number().required("Total People is required!"),
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
    // signInAction(values);
  };
  return (
    <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} width="100%" p={8}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={5}>
          <FormControl
            id="checkIn"
            isRequired
            isInvalid={Boolean(errors.checkIn)}
          >
            <FormLabel htmlFor="checkIn">Check in</FormLabel>
            {/* <Input type="email" {...register("email")} /> */}
            <FormErrorMessage>{errors?.checkIn?.message}</FormErrorMessage>
          </FormControl>

          <FormControl
            id="password"
            isRequired
            // isInvalid={Boolean(errors.password)}
          >
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
              // type={showPassword ? "text" : "password"}
              // {...register("password")}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  //   onClick={() =>
                  //     setShowPassword((showPassword) => !showPassword)
                  //   }
                >
                  {/* {showPassword ? <ViewIcon /> : <ViewOffIcon />} */}
                </Button>
              </InputRightElement>
            </InputGroup>
            {/* <FormErrorMessage>{errors?.password?.message}</FormErrorMessage> */}
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
  );
}
