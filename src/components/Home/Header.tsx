import { Button, Flex, Input } from "@chakra-ui/react";
import { useEffect } from "react";
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
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();

  useEffect(() => {
    if (amount) setValue("amount", amount);
  }, [amount]);

  const handleOnSubmit = ({ amount }: FormInputs) => setAmount(amount);

  return (
    <Flex
      mt={amount ? "0vh" : "30vh"}
      as="form"
      onSubmit={handleSubmit(handleOnSubmit)}
      gap="20px"
      px="10px"
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
        {intl.formatMessage({ id: "save" })}
      </Button>
    </Flex>
  );
}
export default HomeHeader;
