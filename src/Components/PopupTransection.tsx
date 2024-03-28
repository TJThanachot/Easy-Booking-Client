"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CloseIcon } from "@chakra-ui/icons";
import { linkColor, linkHoverColor } from "@/app/constants";
import {
  Stack,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Heading,
  Textarea,
  Flex,
  Select,
  Text,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import useBookingHook from "@/hooks/useBookingHook";
import Popup from "./Popup";
type Props = { setShowPopupTransection: any; booking: any };

export default function PopupTransection({
  setShowPopupTransection,
  booking,
}: Props) {
  const { createTransection } = useBookingHook();

  const payType = [
    { code: 1, display: "Cash" },
    { code: 2, display: "Credit" },
    { code: 3, display: "Propt Pay" },
  ];

  const schema = yup.object().shape({
    paidType: yup.string().required("Pay type is required!"),
    description: yup.string(),
    totalPrice: yup.string().required(),
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

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      reset({
        paidType: "",
        description: "",
        totalPrice: booking.total_price,
      });
      setIsOpen(true);
    }, 200);
  }, []);

  const onSubmit = (values: any) => {
    createTransection({
      booking_id: Number(booking.id),
      paid_type_id: Number(values.paidType),
      total_price: Number(values.totalPrice),
      description: values.description || "",
    });
    closePopup();
  };

  const closePopup = () => {
    reset({
      paidType: "",
      description: "",
      totalPrice: booking.total_price,
    });
    setShowPopupTransection({ isShow: false, booking: [] });
  };

  return (
    <Popup isOpen={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={5}>
          <Flex justifyContent={"space-between"}>
            <Heading fontSize={"xl"}>You are paying a room.</Heading>
            <Text>Booking ID : {booking.id}</Text>
          </Flex>

          <Text>
            Check In : {format(new Date(booking.check_in), "yyyy-MM-dd")}
          </Text>
          <Text>
            Check Out : {format(new Date(booking.check_out), "yyyy-MM-dd")}
          </Text>
          <Text>Room Number : {booking.rooms.room_name}</Text>
          <Text>Total People : {booking.total_people}</Text>
          <Flex gap={4}>
            <FormControl
              id="paidType"
              isRequired
              isInvalid={Boolean(errors.paidType)}
            >
              <FormLabel htmlFor="paidType">Pay Type</FormLabel>
              <Select
                id="paidType"
                placeholder="Select pay type"
                {...register("paidType")}
              >
                {payType.map((item, index) => {
                  return (
                    <option key={index} value={item.code}>
                      {item.display}
                    </option>
                  );
                })}
              </Select>

              <FormErrorMessage>{errors?.paidType?.message}</FormErrorMessage>
            </FormControl>

            <FormControl
              id="totalPrice"
              isRequired
              isInvalid={Boolean(errors.totalPrice)}
            >
              <FormLabel htmlFor="totalPrice">Total Price</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                >
                  $
                </InputLeftElement>
                <Input
                  {...register("totalPrice")}
                  value={booking.total_price}
                  type="text"
                  disabled
                />
              </InputGroup>
              <FormErrorMessage>{errors?.totalPrice?.message}</FormErrorMessage>
            </FormControl>
          </Flex>
          <FormControl id="description" isInvalid={Boolean(errors.description)}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea {...register("description")} />
            <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
          </FormControl>

          <Flex gap={4}>
            <Button
              flex={1}
              type="submit"
              bg={linkColor}
              size="lg"
              color={"black"}
              _hover={{
                bg: linkHoverColor,
              }}
            >
              Pay Now
            </Button>

            <Button
              colorScheme="pink.400"
              size="lg"
              color={"red.500"}
              _hover={{
                colorScheme: "pink.500",
                opacity: "0.8",
              }}
              variant="outline"
              onClick={closePopup}
            >
              <CloseIcon />
            </Button>
          </Flex>
        </Stack>
      </form>
    </Popup>
  );
}
