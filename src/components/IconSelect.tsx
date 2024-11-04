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
import React, { useEffect, useState } from "react";
import * as PhosphorIcons from "@phosphor-icons/react";
import camelCaseToNormal from "../utils/camelCaseToNormal";
import ClickOutside from "./ClickOutside";

const { IconContext, IconBase, SSR, ...icons } = PhosphorIcons;

const iconKeys = Object.keys(icons);

type Props = {
  icon: string;
  setIcon: React.Dispatch<React.SetStateAction<string>>;
};

function IconSelect({ icon, setIcon }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!icon) setIcon(iconKeys[0]);
  }, [icon]);

  const handleIconChange = (key: string) => {
    setIsOpen(false);
    setIcon(key);
  };

  const SelectedIcon = icons[icon as keyof typeof icons];

  return (
    <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <PopoverTrigger>
        <Button color="gray.600" onClick={() => setIsOpen(!isOpen)}>
          <SelectedIcon width="25px" height="25px" />
        </Button>
      </PopoverTrigger>

      <ClickOutside onClick={() => setIsOpen(false)} ignoreClick={!isOpen}>
        <PopoverContent maxH="300px" overflowY="auto">
          <Box>
            <Box pt="10px" px="10px" mb="10px">
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
                  i
                    .toLocaleLowerCase()
                    .startsWith(searchValue.toLocaleLowerCase())
                )
                .slice(0, 50)
                .map((i) => (
                  <IconButton
                    key={i}
                    icon={i}
                    onClick={() => handleIconChange(i)}
                  />
                ))}
            </SimpleGrid>
          </Box>
        </PopoverContent>
      </ClickOutside>
    </Popover>
  );
}

type IconButtonProps = {
  onClick?: () => void;
  icon: string;
};

const IconButton = ({ icon, onClick }: IconButtonProps) => {
  const IconComponent = icons[icon as keyof typeof icons];

  return (
    <Box
      onClick={onClick}
      as="button"
      cursor="pointer"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      height="110px"
      pt="20px"
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
        <IconComponent width="25px" height="25px" />
      </Box>
      <Text
        fontWeight={500}
        fontSize="15px"
        wordBreak="break-word"
        textAlign="center"
      >
        {camelCaseToNormal(icon)}
      </Text>
    </Box>
  );
};

export default IconSelect;
