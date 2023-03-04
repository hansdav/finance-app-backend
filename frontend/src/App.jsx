import React from "react";
import TransactionDisplay from "./components/TransactionDisplay";
import TransactionForm from "./components/TransactionForm";
import categories from "./data/categories.json";
import transactions from "./data/transactions.json";

function App() {
  function editTransaction(e) {
    console.log("edit transaction" + e.target.id);
  }
  function deleteTransaction(e) {
    console.log("delete transaction" + e.target.id);
  }
  return (
    <main>
      <h1>Finance Manager App</h1>
      <TransactionForm categories={categories} />
      {transactions.map((transaction) => {
        return (
          <TransactionDisplay
            id={transaction.id}
            onEditButtonEvent={(e) => editTransaction(e)}
            onDeleteButtonEvent={(e) => deleteTransaction(e)}
            key={transaction.id}
            date={transaction.date}
            description={transaction.description}
            amount={transaction.amount}
            color={
              categories.filter(
                (category) => category.id === transaction.category
              )[0].color
            }
          />
        );
      })}
    </main>
  );
}

export default App;
