"use client";

import useBookingHook from "@/hooks/useBookingHook";
import { useAppSelector } from "@/redux/store";
import {
  Box,
  Container,
  Divider,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import BookingCard from "@/Components/BookingCard";
import PopupTransection from "@/Components/PopupTransection";

const BookingList = () => {
  const bookingList = useAppSelector((state) => state.booking.bookingList);
  const { fetchBookingList } = useBookingHook();
  const [showPopupTransection, setShowPopupTransection] = useState({
    isShow: false,
    booking: {},
  });

  useEffect(() => {
    fetchBookingList();
  }, []);

  return (
    <Container pt={"10rem"} pb={"5rem"} minW={"60vw"} minH={"93vh"}>
      {showPopupTransection.isShow && (
        <PopupTransection
          setShowPopupTransection={setShowPopupTransection}
          booking={showPopupTransection?.booking}
        />
      )}
      <Box py={6} px={5} width="full" bg={"white"} rounded={"xl"}>
        <Stack spacing={4} width={"100%"} direction={"column"}>
          <Stack
            p={5}
            alignItems={"center"}
            justifyContent={{
              base: "flex-start",
              md: "space-around",
            }}
            direction={{
              base: "column",
              md: "row",
            }}
            bg={useColorModeValue("orange.200", "orange.500")}
          >
            <Stack
              width={{
                base: "100%",
                md: "40%",
              }}
              textAlign={"center"}
            >
              <Heading size={"lg"}>
                Booking History <Text color="purple.400">Your Relax</Text>
              </Heading>
            </Stack>
            <Stack
              width={{
                base: "100%",
                md: "60%",
              }}
            >
              <Text textAlign={"center"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                quod in iure vero. Facilis magnam, sed officiis commodi labore
                odit.
              </Text>
            </Stack>
          </Stack>
          <Divider />

          {bookingList.map((item: any, index: number) => {
            return (
              <BookingCard
                key={index}
                booking={item}
                setShowPopupTransection={setShowPopupTransection}
              />
            );
          })}
        </Stack>
      </Box>
    </Container>
  );
};

export default BookingList;
