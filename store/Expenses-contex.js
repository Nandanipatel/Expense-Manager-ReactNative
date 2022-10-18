import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of sandals",
    amount: 29.99,
    date: new Date("2022-10-16"),
  },
  {
    id: "e2",
    description: "Jeans",
    amount: 13.43,
    date: new Date("2022-10-14"),
  },
  {
    id: "e3",
    description: "Errings",
    amount: 14.56,
    date: new Date("2021-01-11"),
  },
  {
    id: "e4",
    description: "Ring",
    amount: 89.23,
    date: new Date("2021-01-10"),
  },
  {
    id: "e5",
    description: "A pair of shoes",
    amount: 12.99,
    date: new Date("2021-01-09"),
  },
  {
    id: "e6",
    description: "A pair of sandals",
    amount: 29.99,
    date: new Date("2021-02-04"),
  },
  {
    id: "e7",
    description: "Jeans",
    amount: 13.43,
    date: new Date("2021-11-03"),
  },
  {
    id: "e8",
    description: "Errings",
    amount: 14.56,
    date: new Date("2021-01-11"),
  },
  {
    id: "e9",
    description: "Ring",
    amount: 89.23,
    date: new Date("2021-01-10"),
  },
  {
    id: "e10",
    description: "A pair of shoes",
    amount: 12.99,
    date: new Date("2021-01-09"),
  },
];

export const ExpenseContex = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpenseContexProvider({ children }) {
  const [expenseState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    // console.log("deleted");
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expenseState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpenseContex.Provider value={value}>{children}</ExpenseContex.Provider>
  );
}

export default ExpenseContexProvider;
