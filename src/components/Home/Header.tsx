import { Button, Flex, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";

type Props = {
  amount?: number;
  setAmount: (v: number) => void;
};

type FormInputs = {
  amount: number;
};

function HomeHeader({ amount, setAmount }: Props) {
  const intl = useIntl();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();

  const handleOnSubmit = ({ amount }: FormInputs) => setAmount(amount);

  return (
    <Flex
      mt={amount ? "0vh" : "30vh"}
      as="form"
      onSubmit={handleSubmit(handleOnSubmit)}
      gap="20px"
      transition="margin .3s ease"
    >
      <Input
        {...register("amount", {
          required: true,
        })}
        isInvalid={!!errors?.amount}
        type="number"
        errorBorderColor="red.500"
        placeholder={intl.formatMessage({ id: "amount" })}
        onWheel={(e: any) => e.target.blur()}
      />
      <Button type="submit" colorScheme="whiteAlpha" px="40px">
        {intl.formatMessage({ id: "calculate" })}
      </Button>
    </Flex>
  );
}
export default HomeHeader;
