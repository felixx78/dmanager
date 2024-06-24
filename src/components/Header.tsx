import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import USAFlag from "../assets/flags/usa.svg";
import RussianFlag from "../assets/flags/russian.png";
import SwedishFlag from "../assets/flags/sweden.png";
import { useDispatch, useSelector } from "react-redux";
import { languageActions } from "../redux/languageReducer";
import { RootState } from "../redux/store";

const languages = [
  {
    code: "en",
    label: "English",
    flag: USAFlag,
  },
  {
    code: "se",
    label: "Svenska",
    flag: SwedishFlag,
  },
  {
    code: "ru",
    label: "Русский",
    flag: RussianFlag,
  },
];

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const languageCode = useSelector((state: RootState) => state.language);
  const language = languages.find((i) => i.code === languageCode)!;

  const handleChangeLanguage = (language: string) =>
    dispatch(languageActions.set(language));

  return (
    <Flex justifyContent="space-between" px="30px" py="10px">
      <Flex
        onClick={() => navigate("/")}
        as="button"
        boxSize="border-box"
        px="10px"
        py="5px"
      >
        <Text color="green.300" fontSize="lg">
          $
        </Text>
        <Text fontSize="lg">manager</Text>
      </Flex>

      <Menu>
        <MenuButton fontWeight={400} colorScheme="_" as={Button}>
          <LanguageMenuItem image={language.flag} label={language.label} />
        </MenuButton>
        <MenuList borderColor="gray.600" bg="gray.700">
          {languages.map((i) => (
            <LanguageMenuItem
              key={i.code}
              image={i.flag}
              label={i.label}
              onClick={() => handleChangeLanguage(i.code)}
            />
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
}

const LanguageMenuItem = ({
  image,
  label,
  onClick,
}: {
  image: string;
  label: string;
  onClick?: () => void;
}) => (
  <MenuItem
    as={onClick ? "button" : "div"}
    value="en"
    bg="_"
    _hover={{ bg: "gray.600" }}
    gap="10px"
    onClick={onClick}
  >
    <img width={40} height="auto" src={image} />
    <Text>{label}</Text>
    {!onClick && <ChevronDownIcon />}
  </MenuItem>
);

export default Header;
