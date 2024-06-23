import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}
export default RootLayout;
