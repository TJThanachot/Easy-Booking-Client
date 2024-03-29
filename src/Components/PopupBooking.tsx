"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import * as yup from "yup";
import { bookingSchema } from "@/app/constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Stack,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Heading,
  Container,
  Flex,
} from "@chakra-ui/react";
import useBookingHook from "@/hooks/useBookingHook";
import Popup from "./Popup";

type Props = { setShowPopupBooking: any; roomItem: any };

export default function PopupBooking({ setShowPopupBooking, roomItem }: Props) {
  const [checkInValue, setCheckInValue] = useState("");
  const { createBooking } = useBookingHook();

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }, []);

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
    createBooking({
      check_in: values.checkIn,
      check_out: values.checkOut,
      total_people: values.totalPeople,
      description: roomItem.description,
      price_per_night: roomItem.price_per_night,
    });
    reset({
      checkIn: "",
      checkOut: "",
      totalPeople: 0,
    });
  };
  return (
    <Popup isOpen={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={5}>
          <Heading fontSize={"xl"}>
            You are booking a {roomItem.description} room.
          </Heading>
          <Flex gap={4}>
            <FormControl
              id="checkIn"
              isRequired
              isInvalid={Boolean(errors.checkIn)}
            >
              <FormLabel htmlFor="checkIn">Check in</FormLabel>
              <Input
                {...register("checkIn")}
                type="date"
                min={format(new Date(), "yyyy-MM-dd")}
                onChange={(e) => {
                  setCheckInValue(e.target.value);
                }}
              />
              <FormErrorMessage>{errors?.checkIn?.message}</FormErrorMessage>
            </FormControl>

            <FormControl
              id="checkOut"
              isRequired
              isInvalid={Boolean(errors.checkOut)}
            >
              <FormLabel htmlFor="checkOut">Check out</FormLabel>
              <Input
                {...register("checkOut")}
                type="date"
                disabled={!checkInValue}
                min={format(new Date(checkInValue || new Date()), "MM-dd-yyyy")}
              />
              <FormErrorMessage>{errors?.checkOut?.message}</FormErrorMessage>
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

          <Flex gap={4}>
            <Button
              flex={1}
              type="submit"
              bg={"teal.400"}
              size="lg"
              color={"white"}
              _hover={{
                bg: "teal.500",
              }}
            >
              Book Now
            </Button>

            <Button
              colorScheme="pink.400"
              size="lg"
              color={"pink.400"}
              _hover={{
                colorScheme: "pink.500",
                opacity: "0.8",
              }}
              variant="outline"
              onClick={() => {
                reset({
                  checkIn: "",
                  checkOut: "",
                  totalPeople: 0,
                });
                setShowPopupBooking(false);
              }}
            >
              <CloseIcon />
            </Button>
          </Flex>
        </Stack>
      </form>
    </Popup>
  );
}
