import React, { useState, useEffect } from "react";
import "./App.css";
import TransactionsDisplay from "./components/TransactionsDisplay";
import TransactionForm from "./components/TransactionForm";
import Filter from "./components/Filter";
import fetchCategories from "./api/fetchCategories";
import fetchTransactions from "./api/fetchTransactions";
import fetchDeleteTransaction from "./api/fetchDeleteTransaction";
import fetchAddTransaction from "./api/fetchAddTransaction";
import fetchPatchTransaction from "./api/fetchPatchTransaction";

function App() {
  const [popupDisplay, setPopupDisplay] = useState("none");
  const [popupData, setPopupData] = useState({
    id:"",
    date:"",
    description:"",
    category:"",
    amount:"",
    type:""
})
  function editTransaction(e) {
    setPopupDisplay("block");
    console.log(transactions.filter((transaction) => Number(transaction.id) === Number(e.target.id.split("-")[1]))[0])
    setPopupData(transactions.filter((transaction) => Number(transaction.id) === Number(e.target.id.split("-")[1]))[0]);
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
          <TransactionForm 
            categories={categories}
            date=""
            description=""
            category=""
            amount=""
            type="" 
            title="Add new transaction"
            buttonText="Add transaction" 
            onFetch={fetchAddTransaction}/>
        </div>
        <TransactionsDisplay
          transactions={transactions}
          categories={categories}
          editTransaction={(e) => editTransaction(e)}
          deleteTransaction={(e) => deleteTransaction(e)}
        />
        <div className="popupBG" style={{display:popupDisplay}}>
          <div className="popup" style={{display:popupDisplay}}>
            <TransactionForm 
            categories={categories}
            id={popupData.id}
            date={popupData.date}
            description={popupData.description}
            category={popupData.category}
            amount={popupData.amount}
            type={popupData.type}
            title="Change transaction"
            buttonText="Save"
            onFetch={fetchPatchTransaction}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
