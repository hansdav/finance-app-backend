import React, { useState , useEffect } from "react";
import "./App.css";
import TransactionDisplay from "./components/TransactionDisplay";
import TransactionForm from "./components/TransactionForm";
import Filter from "./components/Filter";
import fetchCategories from "./api/fetchCategories";
import fetchTransactions from "./api/fetchTransactions";

function App() {
  function editTransaction(e) {
    console.log("edit transaction" + e.target.id);
  }
  function deleteTransaction(e) {
    console.log("delete transaction" + e.target.id);
  }

  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
		async function loadTransactions() {
			setTransactions(await fetchTransactions(transactions));
		}
		loadTransactions();
	}, [transactions]);

  console.log(transactions)

  useEffect(() => {
    async function loadCategories() {
      setCategories(await fetchCategories(categories))
    }
    loadCategories()
  }, [categories])

  console.log(categories)

  return (
    <main>
      <h1>Finance Manager App</h1>
      <div className="financeManagerApp">
        <div className="menu">
          <Filter />
          <TransactionForm categories={categories} />
        </div>
        <div className="transactionsDisplay">
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
        </div>
      </div>
    </main>
  );
}

export default App;
