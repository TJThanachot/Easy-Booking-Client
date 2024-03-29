"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Flex,
  ButtonGroup,
  VStack,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  Button,
} from "@chakra-ui/react";
import { bookingSchema } from "../constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { linkColor } from "../constants";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
type Props = {};

export default function CalendarRoom({}: Props) {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [dates, setDates] = useState<Date[]>([today, tomorrow]);

  const handleDateChange = (newDates: Date[]) => {
    setDates(newDates);
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(bookingSchema),
  });

  const onSubmit = (values: any) => {
    console.log(values);
    // createBooking({
    //   check_in: values.checkIn,
    //   check_out: values.checkOut,
    //   total_people: values.totalPeople,
    //   description: "The Load Room",
    //   price_per_night: 9999,
    // });
    // reset({
    //   checkIn: "",
    //   checkOut: "",
    //   totalPeople: 0,
    // });
  };

  return (
    <Container pt={"5rem"} pb={"5rem"} minW={"60vw"} minH={"100vh"}>
      <Box py={12}>
        <VStack spacing={2} textAlign="center">
          <Heading as="h1" fontSize="4xl" color={"white"} autoCapitalize="">
            The Lord Room Calendar
          </Heading>
          <Text fontSize="lg" color={linkColor}>
            Enjoy your The Lord Room
          </Text>
        </VStack>
        <Box
          mt={"4rem"}
          py={10}
          px={10}
          width="full"
          h={"full"}
          bg={"white"}
          rounded={"xl"}
        >
          {dates[0] && dates[1] ? (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={5}>
                <Heading fontSize={"xl"} color={"#6f48eb"}>
                  You are booking The Lord room.
                </Heading>
                <Flex gap={4}>
                  <FormControl id="checkIn">
                    <FormLabel htmlFor="checkIn">Check in</FormLabel>
                    <Input
                      {...register("checkIn")}
                      type="text"
                      disabled
                      value={format(dates[0], "MM-dd-yyyy")}
                    />
                  </FormControl>

                  <FormControl id="checkOut">
                    <FormLabel htmlFor="checkOut">Check out</FormLabel>
                    <Input
                      {...register("checkOut")}
                      type="text"
                      disabled
                      value={format(dates[1], "MM-dd-yyyy")}
                    />
                  </FormControl>

                  <FormControl
                    id="totalPeople"
                    isRequired
                    isInvalid={Boolean(errors.totalPeople)}
                  >
                    <FormLabel htmlFor="totalPeople">Total people </FormLabel>
                    <Input type="number" {...register("totalPeople")} />
                    <FormErrorMessage>
                      {errors?.totalPeople?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
                <Heading fontSize={"lg"} color={"green.500"}>
                  Select the day at the calendar
                </Heading>
                <Calendar
                  className={"react-calendar"}
                  onChange={handleDateChange}
                  selectRange={true}
                  value={dates}
                  minDate={today} // will not allow date more than today
                />

                <Flex gap={4}>
                  <Button
                    flex={1}
                    type="submit"
                    bg={"#6f48eb"}
                    size="lg"
                    color={"white"}
                    _hover={{
                      bg: "#7d5beb",
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                  >
                    Book Now
                  </Button>
                </Flex>
              </Stack>
            </form>
          ) : null}
        </Box>
      </Box>
    </Container>
  );
}
