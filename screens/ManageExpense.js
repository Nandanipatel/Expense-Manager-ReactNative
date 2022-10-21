import { StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import { useLayoutEffect } from "react";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import LoadingOverlay from "../UI/LoadingOverlay";
import { ExpenseContex } from "../store/Expenses-contex";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import ErrorOverlay from "../UI/ErrorOverlay";

const ManageExpense = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState();

  const expensesCtx = useContext(ExpenseContex);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          iconName="close"
          onPress={() => navigation.navigate("Expenses")}
        />
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      expensesCtx.deleteExpense(editedExpenseId);
      await deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Unable to delete expense. Please try again later.");
    }
    setIsSubmitting(false);
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Unable to save expense. Please try again later.");
      setIsSubmitting(false);
    }
  }

 

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary500,
    alignItems: "center",
  },
});
