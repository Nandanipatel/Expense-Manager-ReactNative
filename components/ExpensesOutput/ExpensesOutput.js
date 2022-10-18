import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesSummry from "./ExpensesSummry";
import ExpenseList from "./ExpenseList";
import { GlobalStyles } from "../../constants/styles";

function ExpensesOutput({ expenses, expensePeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummry expenses={expenses} periodName={expensePeriod} />
      <ExpenseList expenses={expenses} />
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
