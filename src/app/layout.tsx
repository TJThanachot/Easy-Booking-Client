"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/Components/Navbar";
import { Box, Image } from "@chakra-ui/react";
import { bgImage } from "./constants";
import Footer from "@/Components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box pos={"relative"} minH={"100vh"}>
            <Image
              zIndex={-10}
              pos={"absolute"}
              top={0}
              minH={"50rem"}
              minW={"100vw"}
              w={"full"}
              h={"58rem"}
              src={bgImage}
            ></Image>
            <Navbar />
            {children}
          </Box>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
