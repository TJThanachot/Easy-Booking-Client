// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import jwtInterceptor from "@/utils/jwtInterceptor";
export function Providers({ children }: { children: React.ReactNode }) {
  // intercrptor here ************************************************************
  jwtInterceptor();
  return (
    <ChakraProvider>
      <Provider store={store}>{children}</Provider>
    </ChakraProvider>
  );
}
