// app/page.tsx
"use client";
import {
  Container,
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import { linkColor, linkHoverColor } from "./constants";
import { CheckCircleIcon } from "@chakra-ui/icons";
import useBookingHook from "@/hooks/useBookingHook";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import PopupBooking from "@/Components/PopupBooking";

type Props = {
  children: React.ReactNode;
};

export default function Page() {
  const { fetchRoomType } = useBookingHook();
  const roomTypeList = useAppSelector((state) => state.booking.roomTypeList);
  const isSignIn = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [showPopupBooking, setShowPopupBooking] = useState(false);
  const [skeleton, setSkeleton] = useState(false);

  useEffect(() => {
    setSkeleton(false);
    fetchRoomType().then(() => setSkeleton(true));
  }, []);

  const roomType = useRef({ description: "", price_per_night: "" });

  const bookingHandler = (item: any) => {
    if (!isSignIn) {
      router.push("/signIn");
    } else {
      roomType.current = {
        description: item.type_name,
        price_per_night: item.price_per_night,
      };
      setShowPopupBooking(true);
    }
  };

  function PriceWrapper(props: Props) {
    const { children } = props;

    return (
      <Box
        mb={4}
        shadow="base"
        borderWidth="1px"
        alignSelf={{ base: "center", lg: "flex-start" }}
        borderColor={useColorModeValue("gray.200", "gray.500")}
        borderRadius={"xl"}
      >
        <Skeleton isLoaded={skeleton}>{children}</Skeleton>
      </Box>
    );
  }

  return (
    <Container pt={"5rem"} position={"relative"}>
      {showPopupBooking && (
        <PopupBooking
          setShowPopupBooking={setShowPopupBooking}
          roomItem={roomType.current}
        />
      )}
      <Box py={12}>
        <VStack spacing={2} textAlign="center">
          <Heading as="h1" fontSize="4xl" color={"white"} autoCapitalize="">
            Plans and choose the room that luxury for you
          </Heading>
          <Text fontSize="lg" color={linkColor}>
            Enjoy your relax times
          </Text>
        </VStack>
        <Stack
          direction={{ base: "column", md: "row" }}
          textAlign="center"
          justify="center"
          spacing={{ base: 4, lg: 10 }}
          py={10}
        >
          {roomTypeList?.map((item: any, index: number) => {
            return (
              <PriceWrapper key={index}>
                <Box
                  pos={"relative"}
                  shadow={"2xl"}
                  transition="transform 0.2s"
                  _hover={{ shadow: "dark-lg", transform: "scale(1.10)" }}
                >
                  {item.type_name === "Deluxe" && (
                    <Box
                      position="absolute"
                      top="-16px"
                      left="50%"
                      style={{ transform: "translate(-50%)" }}
                    >
                      <Text
                        textTransform="uppercase"
                        bg={useColorModeValue("red.300", "red.700")}
                        px={3}
                        py={1}
                        color={useColorModeValue("gray.900", "gray.300")}
                        fontSize="sm"
                        fontWeight="600"
                        rounded="xl"
                      >
                        Most Popular
                      </Text>
                    </Box>
                  )}
                  <Box py={4} px={12} bg={linkColor} borderTopRadius={"xl"}>
                    <Text fontWeight="500" fontSize="2xl">
                      {item.type_name}
                    </Text>
                    <HStack justifyContent="center">
                      <Text fontSize="3xl" fontWeight="600">
                        $
                      </Text>
                      <Text fontSize="5xl" fontWeight="900">
                        {item.price_per_night}
                      </Text>
                      <Text fontSize="3xl" color="gray.500">
                        /night
                      </Text>
                    </HStack>
                  </Box>
                  <VStack
                    bg={useColorModeValue("gray.50", "gray.700")}
                    py={4}
                    borderBottomRadius={"xl"}
                  >
                    <List spacing={3} textAlign="start" px={0}>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        unlimited wifi
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Lorem, ipsum dolor.
                      </ListItem>
                    </List>

                    <Text p={3}>{item.description}</Text>

                    <Box w="80%" pt={7}>
                      <Button
                        w="full"
                        colorScheme="red"
                        variant={
                          item.type_name === "Deluxe" ? "solid" : "outline"
                        }
                        onClick={() => {
                          bookingHandler(item);
                        }}
                      >
                        Book Now
                      </Button>
                    </Box>
                  </VStack>
                </Box>
              </PriceWrapper>
            );
          })}
        </Stack>
      </Box>
    </Container>
  );
}
