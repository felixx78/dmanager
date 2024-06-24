import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import messages_en from "../locales/en.json";
import messages_ru from "../locales/ru.json";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Messages from "../locales/type";

const messages: Messages = {
  en: messages_en,
  ru: messages_ru,
};

function RootLayout() {
  const language = useSelector((state: RootState) => state.language);

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <Box bgColor="gray.900" minH="100svh" color="gray.200" m={0} p={0}>
        <Header />
        <Outlet />
      </Box>
    </IntlProvider>
  );
}
export default RootLayout;
