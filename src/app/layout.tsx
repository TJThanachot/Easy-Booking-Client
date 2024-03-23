"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/Components/Navbar";
import { Box, Image } from "@chakra-ui/react";
import { bgImage } from "./constants";

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
          <Box pos={"relative"}>
            <Image
              zIndex={-10}
              pos={"absolute"}
              top={0}
              minH={"100vh"}
              minW={"100vw"}
              w={"full"}
              h={"full"}
              src={bgImage}
            ></Image>
            <Navbar />

            {children}
          </Box>
        </Providers>
      </body>
    </html>
  );
}
