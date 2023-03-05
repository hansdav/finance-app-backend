import React, { useState, useEffect } from "react";
import "./App.css";
import TransactionsDisplay from "./components/TransactionsDisplay";
import TransactionForm from "./components/TransactionForm";
import Filter from "./components/Filter";
import fetchCategories from "./api/fetchCategories";
import fetchTransactions from "./api/fetchTransactions";
import fetchDeleteTransaction from "./api/fetchDeleteTransaction";


function App() {
  function editTransaction(e) {
    console.log("edit transaction" + e.target.id);
  }
  function deleteTransaction(e) {
    console.log(e.target.id);
    let array = e.target.id.split("-");
    console.log(array[array.length - 1]);
    fetchDeleteTransaction(array[array.length - 1]);
  }

  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      setCategories(await fetchCategories(categories));
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function loadTransactions() {
      setTransactions(await fetchTransactions(transactions));
    }
    loadTransactions();
  }, []);

  return (
    <main>
      <h1>Finance Manager App</h1>
      <div className="financeManagerApp">
        <div className="menu">
          <Filter onSetFiltersData={setTransactions} />
          <TransactionForm categories={categories} />
        </div>
        <TransactionsDisplay
          transactions={transactions}
          categories={categories}
          editTransaction={(e) => editTransaction(e)}
          deleteTransaction={(e) => deleteTransaction(e)}
        />
      </div>
    </main>
  );
}

export default App;
