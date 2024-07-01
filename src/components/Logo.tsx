import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Logo() {
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "$"
  );
  useEffect(() => {
    document.title = currency + "mananger";
  }, [currency]);

  const handleOnClick = () => {
    const newCurrency = currency === "$" ? "€" : "$";
    localStorage.setItem("currency", newCurrency);
    setCurrency(newCurrency);
  };
  return (
    <Flex
      onClick={handleOnClick}
      as="button"
      boxSize="border-box"
      px="10px"
      py="5px"
    >
      <Text color={currency === "$" ? "green.300" : "orange.400"} fontSize="lg">
        {currency}
      </Text>
      <Text fontSize="lg">manager</Text>
    </Flex>
  );
}
export default Logo;
