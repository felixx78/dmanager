import {
  Box,
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import * as Icons from "@phosphor-icons/react";
import camelCaseToNormal from "../utils/camelCaseToNormal";

type Icon = {
  render: (props?: object) => JSX.Element;
};

const icons = Icons as unknown as {
  [key: string]: Icon;
};
const iconKeys = Object.keys(icons);

type Props = {
  icon: string;
  setIcon: React.Dispatch<React.SetStateAction<string>>;
};

function IconSelect({ icon, setIcon }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!icon) {
      setIcon(iconKeys[0]);
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
          {icon && icons[icon].render({ width: "25px", height: "25px" })}
        </Button>
      </PopoverTrigger>

      <PopoverContent maxH="300px" overflowY="auto">
        <Box pt="10px" px="10px">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            color="gray.700"
          />
        </Box>

        <SimpleGrid
          px="10px"
          py="10px"
          color="gray.700"
          columns={2}
          spacing={2}
          alignContent="center"
        >
          {iconKeys
            .filter((i) =>
              i.toLocaleLowerCase().startsWith(searchValue.toLocaleLowerCase())
            )
            .slice(0, 50)
            .map((i) => (
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
                  p="8px"
                  color="gray.200"
                  mt="0"
                  mb="10px"
                  mx="auto"
                  textAlign="center"
                >
                  {icons[i].render({
                    width: "20px",
                    height: "20px",
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
