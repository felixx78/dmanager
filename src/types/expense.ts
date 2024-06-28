type Expense = {
  icon: string;
  label: string;
  bgColor: string;
  id: string;
  total: number;
  fields: { label: string; amount: number | null }[];
};

export default Expense;
