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
  Container,
  Flex,
} from "@chakra-ui/react";
type Props = { setShowPopupBooking: any };

export default function PopupBooking({ setShowPopupBooking }: Props) {
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
    <Container
      pos={"fixed"}
      zIndex={10}
      backdropFilter="blur(3px)"
      minW={"100vw"}
      minH={"100vh"}
      left={0}
    >
      <Box
        rounded={"lg"}
        bg={"white"}
        boxShadow={"lg"}
        width="40%"
        p={8}
        position={"absolute"}
        top="40%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
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

            <Flex gap={4}>
              <Button
                flex={1}
                type="submit"
                bg={"blue.400"}
                size="lg"
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Book Now
              </Button>
              <Button
                bg={"pink.400"}
                size="lg"
                color={"white"}
                _hover={{
                  bg: "pink.500",
                }}
                onClick={() => {
                  setShowPopupBooking(false);
                }}
              >
                Cancel
              </Button>
            </Flex>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
