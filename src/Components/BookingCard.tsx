"use client";

import { format } from "date-fns";
import {
  Box,
  Button,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { linkColor } from "@/app/constants";
import { FaCheckCircle } from "react-icons/fa";

type PackageTierProps = {
  booking: any;
  checked?: boolean;
  setShowPopupTransection: any;
};

export default function BookingCard({
  booking,
  setShowPopupTransection,
}: PackageTierProps) {
  const roomType = ["Suite", "Deluxe", "Economic"];
  return (
    <Stack
      p={3}
      py={3}
      justifyContent={{
        base: "flex-start",
        md: "space-around",
      }}
      direction={{
        base: "column",
        md: "row",
      }}
      alignItems={{ md: "center" }}
      rounded={"xl"}
      shadow={"xl"}
      transition="transform 0.2s"
      _hover={{
        transform: "scale(1.10)",
        zIndex: "5",
      }}
      bgColor={"gray.100"}
    >
      <Grid templateColumns="repeat(4, 1fr)" gap={6} w={"full"}>
        <GridItem w="100%" h="100%">
          <Heading size={"xl"}>
            {roomType[booking.rooms.room_type_id - 1]}
          </Heading>
          <Heading size={"x"}>{booking.statusLookups.description}</Heading>
          <Button
            onClick={() => {
              setShowPopupTransection({ isShow: true, booking: booking });
            }}
            variant={"link"}
            color={"blue.500"}
            disabled={
              booking.statusLookups.description === "close" ? true : false
            }
          >
            {booking.statusLookups.description === "booked"
              ? "Pay Now"
              : "Paid Already"}
          </Button>
        </GridItem>

        <GridItem w="100%" h="100%">
          <List spacing={3} textAlign="start">
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              check in {format(new Date(booking.check_in), "yyyy-MM-dd")}
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              check out {format(new Date(booking.check_out), "yyyy-MM-dd")}
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              total people {booking.total_people}
            </ListItem>
          </List>
        </GridItem>
        <GridItem w="100%" h="100%">
          <Heading size={"lg"}>
            Total Price <br></br>{" "}
            <Heading color={linkColor}>$ {booking.total_price}</Heading>
          </Heading>
          <Heading size={"x"}>room number {booking.rooms.room_name}</Heading>
        </GridItem>
        <GridItem w="100%" h="100%">
          <Box>
            <Text fontSize="md">{booking.rooms.description}</Text>
          </Box>
        </GridItem>
      </Grid>
    </Stack>
  );
}
