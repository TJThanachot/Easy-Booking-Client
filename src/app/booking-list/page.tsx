"use client";
import { format } from "date-fns";
import useBookingHook from "@/hooks/useBookingHook";
import { useAppSelector } from "@/redux/store";
import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

const roomType = ["Suite", "Deluxe", "Economic"];
type PackageTierProps = {
  booking: any;
  checked?: boolean;
};
const PackageTier = ({ booking, checked = true }: PackageTierProps) => {
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
        zIndex: "15",
      }}
      bgColor={"gray.100"}
    >
      <Grid templateColumns="repeat(4, 1fr)" gap={6} w={"full"}>
        <GridItem w="100%" h="100%">
          <Heading size={"xl"}>
            {roomType[booking.rooms.room_type_id - 1]}
          </Heading>
          <Heading size={"x"}>{booking.statusLookups.description}</Heading>
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
            Total Price <br></br>$ {booking.total_price}
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
};
const BookingList = () => {
  const bookingList = useAppSelector((state) => state.booking.bookingList);
  const { fetchBookingList } = useBookingHook();
  console.log(bookingList);
  useEffect(() => {
    fetchBookingList();
  }, []);
  return (
    <Container pt={"10rem"} pb={"5rem"} minW={"60vw"} minH={"93vh"}>
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
            return <PackageTier key={index} booking={item} />;
          })}
        </Stack>
      </Box>
    </Container>
  );
};

export default BookingList;
