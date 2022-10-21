import { StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContex } from "../store/Expenses-contex";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpenseContex);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput expenses={recentExpenses} expensePeriod="Last 7 Days" />
  );
}

export default RecentExpenses;
