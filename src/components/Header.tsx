import { Box, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <Box px="20px" py="10px">
      <Flex onClick={() => navigate("/")} as="button" px="10px" py="5px">
        <Text color="green.300" fontSize="lg">
          $
        </Text>
        <Text fontSize="lg">manager</Text>
      </Flex>
    </Box>
  );
}
export default Header;
