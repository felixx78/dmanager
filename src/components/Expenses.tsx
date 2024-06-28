import { Box, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useIntl } from "react-intl";
import Expense from "../types/expense";
import * as Icons from "@phosphor-icons/react";

type Props = Expense & {
  amount: number;
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
};

type Field = {
  label: string;
  amount: number | null;
};

function Expenses({ icon, label, bgColor, amount, id, setExpenses }: Props) {
  const intl = useIntl();

  const [fields, setFields] = useState<Field[]>([{ label: "", amount: null }]);

  const handleFieldOnChange = (index: number, key: keyof Field) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const fieldCopy = [...fields];
      const currentField = fieldCopy[index];
      const newValue = e.target.value;

      if (key === "amount") {
        currentField.amount = newValue === "0" ? null : parseInt(newValue);
      } else {
        currentField.label = newValue;
      }

      const filteredCopy = fieldCopy.filter((i) => i.label || i.amount);
      filteredCopy.push({ label: "", amount: null });

      setExpenses((prev: Expense[]) => {
        const copy = [...prev];
        const index = copy.findIndex((i) => i.id === id);
        copy[index].total = filteredCopy.reduce(
          (acc, cur) => acc + (cur.amount || 0),
          0
        );
        return copy;
      });

      setFields(filteredCopy);
    };
  };

  const total = fields.reduce((acc, cur) => acc + (cur.amount || 0), 0);
  const percent = ((total / amount) * 100).toFixed(0);

  return (
    <Box
      w="400px"
      bgColor={bgColor}
      px="15px"
      pt="20px"
      pb="30px"
      borderRadius="10px"
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
            {label}
          </Text>
        </Flex>

        <Text
          title={`${total} (${percent}%)`}
          textAlign="end"
          fontWeight={500}
          isTruncated
          w="100px"
        >
          {total} ({percent}%)
        </Text>
      </Flex>

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
              {(((field.amount || 0) / amount) * 100).toFixed(0)}%
            </Text>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
}
export default Expenses;
