import { Box, Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { useIntl } from "react-intl";
import Expense from "../types/expense";
import * as Icons from "@phosphor-icons/react";
import { useDispatch } from "react-redux";
import { expensesActions } from "../redux/expensesReducer";

type Props = Expense & {
  amount: number;
};

type Field = {
  label: string;
  amount: number | null;
};

function Expenses({ id, icon, title, bgColor, fields, total, amount }: Props) {
  const dispatch = useDispatch();
  const intl = useIntl();

  const handleFieldOnChange = (index: number, key: keyof Field) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!fields) return;

      const fieldCopy = [...fields];
      const currentField = Object.assign({}, fieldCopy[index]);
      fieldCopy[index] = currentField;
      const newValue = e.target.value;

      if (key === "amount") {
        currentField.amount = newValue === "0" ? null : parseInt(newValue);
      } else {
        currentField.label = newValue;
      }

      const filteredCopy = fieldCopy.filter((i) => i.label || i.amount);

      const newTotal = filteredCopy.reduce(
        (acc, cur) => acc + (cur.amount || 0),
        0
      );
      dispatch(expensesActions.updateTotal({ id, total: newTotal }));

      filteredCopy.push({ label: "", amount: null });

      dispatch(expensesActions.updateFields({ id, fields: filteredCopy }));
    };
  };

  const percent = ((total / amount) * 100).toFixed(0);

  return (
    <Box
      w="100%"
      maxWidth="80vw"
      minW="10px"
      bgColor={bgColor}
      px="15px"
      pt="20px"
      pb="30px"
      borderRadius="10px"
      position="relative"
    >
      <Flex justifyContent="space-between" mb="25px" gap="10px">
        <Flex alignItems="center" gap="15px">
          <Box
            bg={bgColor.split(".")[0] + ".50"}
            borderRadius="100%"
            px="5px"
            py="5px"
            color={bgColor}
          >
            {/*@ts-ignore*/}
            {Icons[icon].render({ width: "25px", height: "25px" })}
          </Box>
          <Text fontWeight={500} fontSize="medium">
            {title}
          </Text>
        </Flex>

        <Text
          title={`${total} (${percent}%)`}
          textAlign="end"
          fontWeight={500}
          isTruncated
        >
          {total} ({percent}%)
        </Text>
      </Flex>

      <Button
        variant="unstyled"
        borderRadius="100%"
        position="absolute"
        top="-10px"
        right="-10px"
        color="gray.600"
        bgColor="#fff"
        px="5px"
        height="30px"
        minW="0"
        minH="0"
        onClick={() => dispatch(expensesActions.delete(id))}
      >
        <Icons.X width="20px" height="20px" />
      </Button>

      <Stack spacing="10px">
        {fields.map((field, index) => (
          <Flex key={index} alignItems="center" gap="20px">
            <Input
              value={field.label}
              width="50%"
              placeholder={intl.formatMessage({ id: "label" })}
              _placeholder={{ color: "gray.300" }}
              fontWeight={500}
              onChange={handleFieldOnChange(index, "label")}
              variant="unstyled"
            />
            <Input
              value={field.amount || ""}
              onChange={handleFieldOnChange(index, "amount")}
              variant="unstyled"
              type="number"
              onWheel={(e: any) => e.target.blur()}
              bgColor="white"
              color="gray.700"
              px="10px"
              py="5px"
              placeholder={intl.formatMessage({ id: "amount" })}
            />
            <Text fontWeight={500} w="90px" isTruncated>
              {(((field.amount || 0) / total) * 100 || 0).toFixed(0)}%
            </Text>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
}
export default Expenses;
