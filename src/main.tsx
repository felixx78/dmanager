import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import "@fontsource-variable/inter";
import store from "./redux/store.ts";

const theme = extendTheme({
  fonts: {
    heading: `'Inter Variable', sans-serif`,
    body: `'Inter Variable', sans-serif`,
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </ChakraProvider>
  </React.StrictMode>
);
