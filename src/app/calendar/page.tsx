"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  Flex,
  VStack,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { linkColor } from "../constants";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import * as yup from "yup";
import useBookingHook from "@/hooks/useBookingHook";
import { useAppSelector } from "@/redux/store";
import useAuthHook from "@/hooks/useAuthHook";

type Props = {};

export default function CalendarRoom({}: Props) {
  const { createTheLordRoomBooking, fetchTheLordRoomBooked } = useBookingHook();
  const { showAlert, prepareAlertObj, questionAlert } = useAuthHook();

  const checkInCheckOutList = useAppSelector(
    (state) => state.booking.theLordRoomCheckInCheckOutList
  );

  useEffect(() => {
    fetchTheLordRoomBooked();
  }, []);

  // set default date section----------------------------------------
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const [dates, setDates] = useState<any[]>([today, tomorrow]);
  const handleDateChange = (newDates: Date[]) => {
    setDates(newDates);
  };
  //end set default date section--------------------------------------

  // set disable date section-----------------------------------------
  const tileDisabled = ({ date }: any) => {
    // Check if the date falls within any of the specified ranges
    return checkInCheckOutList?.some((range: any) => {
      const setDateTime = format(new Date(date), "yyyy-MM-dd");
      return (
        setDateTime >= format(new Date(range.check_in), "yyyy-MM-dd") &&
        setDateTime <= format(new Date(range.check_out), "yyyy-MM-dd")
      );
    });
  };
  // end set disable date section--------------------------------------

  // form control section----------------------------------------------
  const schema = yup.object().shape({
    totalPeople: yup
      .number()
      .required("Total People is required!")
      .typeError("Total People is required!")
      .test("isNum", "Total people should have at lease 1 person", (value) => {
        return typeof value === "number" && value > 0;
      }),
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
    const newValues = {
      check_in: format(dates[0], "yyyy-MM-dd"),
      check_out: format(dates[1], "yyyy-MM-dd"),
      total_people: values.totalPeople,
      description: "The Load Room",
      price_per_night: 9999,
    };

    const isUnavailableDate = checkInCheckOutList.find((elem: any) => {
      return (
        (format(new Date(elem.check_in), "yyyy-MM-dd") >=
          format(new Date(dates[0]), "yyyy-MM-dd") &&
          format(new Date(elem.check_in), "yyyy-MM-dd") <=
            format(new Date(dates[1]), "yyyy-MM-dd")) ||
        (format(new Date(elem.check_out), "yyyy-MM-dd") >=
          format(new Date(dates[0]), "yyyy-MM-dd") &&
          format(new Date(elem.check_out), "yyyy-MM-dd") <=
            format(new Date(dates[1]), "yyyy-MM-dd"))
      );
    });
    if (isUnavailableDate) {
      showAlert(
        prepareAlertObj("Error", "Please select available date.", "error")
      );
    } else {
      const alertObj = {
        title: "Are you sure?",
        text: "You are booking the lord room!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm!",
      };
      questionAlert(createTheLordRoomBooking, newValues, alertObj);
      reset({
        totalPeople: 0,
      });
    }
  };
  // end form control section-----------------------------------------

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
                      type="text"
                      disabled
                      value={format(dates[0], "yyyy-MM-dd")}
                    />
                  </FormControl>

                  <FormControl id="checkOut">
                    <FormLabel htmlFor="checkOut">Check out</FormLabel>
                    <Input
                      type="text"
                      disabled
                      value={format(dates[1], "yyyy-MM-dd")}
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
                  tileDisabled={tileDisabled}
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
