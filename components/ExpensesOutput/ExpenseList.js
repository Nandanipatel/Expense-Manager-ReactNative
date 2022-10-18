import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
  return <ExpenseItem  {...itemData.item}/>
}

const ExpenseList = ({ expenses }) => {
  return (
    <View>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtracto={(item) => item.id}
      />
    </View>
  );
};

export default ExpenseList;

const styles = StyleSheet.create({});
