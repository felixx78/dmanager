import {
  Box,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import * as Icons from "@chakra-ui/icons";
import camelCaseToNormal from "../utils/camelCaseToNormal";

const filterIcons = ["createIcon", "Icon"];

type Icon = {
  render: (props?: object) => JSX.Element;
};

const icons = Icons as unknown as {
  [key: string]: Icon;
};
const iconKeys = Object.keys(icons).filter((i) => !filterIcons.includes(i));

type Props = {
  icon: string;
  setIcon: React.Dispatch<React.SetStateAction<string>>;
};

function IconSelect({ icon, setIcon }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!icon) {
      setIcon("MoonIcon");
    }
  }, [icon]);

  const handleIconChange = (key: string) => {
    setIsOpen(false);
    setIcon(key);
  };

  return (
    <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <PopoverTrigger>
        <Button color="gray.600" onClick={() => setIsOpen(!isOpen)}>
          {icon && icons[icon].render({ w: "20px", h: "20px" })}
        </Button>
      </PopoverTrigger>

      <PopoverContent maxH="300px" overflowY="auto">
        <SimpleGrid
          px="10px"
          py="10px"
          color="gray.700"
          columns={2}
          spacing={2}
          alignContent="center"
        >
          {iconKeys.map((i) => (
            <Box
              key={i}
              onClick={() => handleIconChange(i)}
              as="button"
              cursor="pointer"
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="center"
              height="100px"
              pt="20px"
              boxSizing="content-box"
            >
              <Box
                bgColor="gray.600"
                borderRadius="100%"
                w="35px"
                height="35px"
                py="5px"
                color="gray.200"
                mt="0"
                mb="10px"
                mx="auto"
                textAlign="center"
              >
                {icons[i].render({
                  w: "20px",
                  h: "20px",
                })}
              </Box>
              <Text
                fontWeight={500}
                fontSize="15px"
                wordBreak="break-word"
                textAlign="center"
              >
                {camelCaseToNormal(i)}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </PopoverContent>
    </Popover>
  );
}
export default IconSelect;
