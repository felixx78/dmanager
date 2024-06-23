import { Container } from "@chakra-ui/react";
import { useIntl } from "react-intl";

function Home() {
  const intl = useIntl();

  return (
    <Container maxW="8xl" centerContent>
      {intl.formatMessage({ id: "homeTitle" })}
    </Container>
  );
}

export default Home;
