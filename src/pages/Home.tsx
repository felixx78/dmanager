import {
  Box,
  Container,
  Flex,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useIntl } from "react-intl";
import HomeHeader from "../components/Home/Header";
import { useEffect, useState } from "react";
import Expenses from "../components/Expenses";
import { PlusIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import AddExpenseModal from "../components/AddExpenseModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { expensesActions } from "../redux/expensesReducer";

function Home() {
  const intl = useIntl();
  const dispatch = useDispatch();

  const [startAmount, setStartAmount] = useState<number>();
  const expenses = useSelector((state: RootState) => state.expenses);

  const storedAmount = JSON.parse(localStorage.getItem("amount") || "null");
  useEffect(() => {
    if (storedAmount) setStartAmount(storedAmount);
  }, [storedAmount]);

  useEffect(() => {
    const onBeforeUnLoad = () => {
      dispatch(expensesActions.save());
      return null;
    };

    window.addEventListener("beforeunload", onBeforeUnLoad);
    return () => window.removeEventListener("beforeunload", onBeforeUnLoad);
  }, []);

  const [isAddOpen, setIsAddOpen] = useState(false);

  const expenseAmount = expenses.reduce((acc, cur) => acc + cur.total, 0);
  const remains = (startAmount || 0) - expenseAmount;

  const handleSetStartAmount = (v: number) => {
    setStartAmount(v);
    localStorage.setItem("amount", JSON.stringify(v));
  };

  return (
    <Container pt="20px" maxW="8xl" centerContent>
      <HomeHeader amount={startAmount} setAmount={handleSetStartAmount} />

      {startAmount && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <SimpleGrid
            mt="50px"
            mb="20px"
            maxW="80vw"
            minChildWidth="400px"
            spacing="30px"
            alignItems="start"
          >
            {expenses.map((i) => (
              <Expenses key={i.id} {...i} amount={startAmount} />
            ))}
          </SimpleGrid>

          <Flex mb="20px" justifyContent="center">
            <IconButton
              onClick={() => setIsAddOpen(true)}
              aria-label="Add Expense"
              size="sm"
              icon={<PlusIcon />}
            />
          </Flex>

          <Box
            maxW="1260px"
            px="20px"
            py="10px"
            borderRadius="10px"
            width="100vw"
            bgColor="gray.600"
          >
            <Text>
              {intl.formatMessage({ id: "total" })}: {expenseAmount} (
              {((expenseAmount / startAmount) * 100).toFixed(0)}%)
            </Text>
            <Text>
              {intl.formatMessage({ id: "remains" })}:{" "}
              {remains < 0 ? 0 : remains}
            </Text>
          </Box>
        </motion.div>
      )}

      <AddExpenseModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </Container>
  );
}

export default Home;
