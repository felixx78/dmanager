import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <Box bgColor="gray.900" minH="100svh" color="gray.200" m={0} p={0}>
      <Outlet />
    </Box>
  );
}
export default RootLayout;
