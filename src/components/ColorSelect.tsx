import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import capitalize from "../utils/capitalize";
import ClickOutside from "./ClickOutside";

const colors = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
];

const shades = ["400", "500", "600", "700", "800", "900"];

type Props = {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
};

function ColorSelect({ color, setColor }: Props) {
  const [selectedBaseColor, setSelectedBaseColor] = useState(colors[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeColor = (baseColor: string, shade: string) => {
    setColor(baseColor + "." + shade);
    setIsOpen(false);
  };

  return (
    <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <PopoverTrigger>
        <Button color="gray.600" onClick={() => setIsOpen(!isOpen)}>
          <Box bgColor={color} w="30px" h="30px" />
        </Button>
      </PopoverTrigger>

      <ClickOutside onClick={() => setIsOpen(false)} ignoreClick={!isOpen}>
        <PopoverContent>
          <Text
            px="15px"
            pt="5px"
            mb="10px"
            fontSize="18px"
            fontWeight={500}
            color="gray.700"
          >
            {capitalize(selectedBaseColor)}
          </Text>
          <SimpleGrid
            px="10px"
            columns={2}
            spacing={2}
            alignContent="center"
            mb="20px"
          >
            {shades.map((i) => (
              <Button
                bgColor={
                  color === selectedBaseColor + "." + i
                    ? "gray.300"
                    : "gray.100"
                }
                onClick={() => handleChangeColor(selectedBaseColor, i)}
                key={i}
              >
                <Box
                  bgColor={selectedBaseColor + "." + i}
                  width="30px"
                  height="30px"
                />
              </Button>
            ))}
          </SimpleGrid>
          <Flex
            px="20px"
            pb="5px"
            maxW="300px"
            justifyContent="center"
            gap="10px"
            overflowX="auto"
          >
            {colors.map((i) => (
              <Box
                as="button"
                display="block"
                width="80px"
                key={i}
                onClick={() => setSelectedBaseColor(i)}
              >
                <Box mx="auto" bgColor={i + ".500"} w="15px" h="15px" />
              </Box>
            ))}
          </Flex>
        </PopoverContent>
      </ClickOutside>
    </Popover>
  );
}

export default ColorSelect;
