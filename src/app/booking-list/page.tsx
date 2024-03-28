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
  Flex,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import BookingCard from "@/Components/BookingCard";
import PopupTransection from "@/Components/PopupTransection";

const BookingList = () => {
  const { bookingList, totalBookingListPage } = useAppSelector((state) => {
    return {
      bookingList: state?.booking?.bookingList,
      totalBookingListPage: state?.booking?.totalBookingListPage || 1,
    };
  });
  const { fetchBookingList } = useBookingHook();
  const [showPopupTransection, setShowPopupTransection] = useState({
    isShow: false,
    booking: {},
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [skeleton, setSkeleton] = useState(false);
  useEffect(() => {
    setSkeleton(false);
    fetchBookingList(pageNumber).then(() => {
      setSkeleton(true);
    });
  }, [pageNumber]);

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

          {bookingList?.map((item: any, index: number) => {
            return (
              <BookingCard
                key={index}
                booking={item}
                showSkeleton={skeleton}
                setShowPopupTransection={setShowPopupTransection}
              />
            );
          })}

          {/* pagination---------------------------------------------------------------------- */}
          <Flex
            w={"100%"}
            justifyContent={"end"}
            alignItems={"center"}
            gap={"1rem"}
            p={"1rem"}
          >
            <Button
              bg={useColorModeValue("red.200", "gray.100")}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              onClick={() =>
                setPageNumber((prev: number) => {
                  return prev !== 1 ? prev - 1 : 1;
                })
              }
            >
              <ArrowBackIcon boxSize={"2rem"} />
            </Button>
            <Heading as="h4" size="md">
              Page {pageNumber} of {totalBookingListPage}
            </Heading>
            <Button
              bg={useColorModeValue("red.200", "gray.100")}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              onClick={() =>
                setPageNumber((prev: number) => {
                  return prev < totalBookingListPage
                    ? prev + 1
                    : totalBookingListPage;
                })
              }
            >
              <ArrowForwardIcon boxSize={"2rem"} />
            </Button>
          </Flex>
          {/* pagination---------------------------------------------------------------------- */}
        </Stack>
      </Box>
    </Container>
  );
};

export default BookingList;
