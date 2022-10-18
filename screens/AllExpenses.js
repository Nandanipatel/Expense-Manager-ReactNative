import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { GlobalStyles } from "../constants/styles";
import { ExpenseContex } from "../store/Expenses-contex";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpenseContex);

  return (
    <View style={styles.container}>
      <ExpensesOutput expenses={expensesCtx.expenses} expensePeriod="Total" />
    </View>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: GlobalStyles.colors.primary700,
  },
});
