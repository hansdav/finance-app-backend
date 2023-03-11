import React, { useState, useEffect } from "react";
import "./App.css";
import TransactionsDisplay from "./components/TransactionsDisplay";
import TransactionForm from "./components/TransactionForm";
import TransactionChangeForm from "./components/TransactionChangeForm";
import Filter from "./components/Filter";
import fetchCategories from "./api/fetchCategories";
import fetchTransactions from "./api/fetchTransactions";
import fetchDeleteTransaction from "./api/fetchDeleteTransaction";
import fetchAddTransaction from "./api/fetchAddTransaction";
import fetchPatchTransaction from "./api/fetchPatchTransaction";

function App() {
  const [popupDisplay, setPopupDisplay] = useState("none");
  const [popupData, setPopupData] = useState({
	id: "",
  	date: "",
  	description: "",
  	category: "",
  	amount: "",
  	type: ""});

  function editTransaction(e) {
    setPopupDisplay("block");
    console.log(
      transactions.filter(
        (transaction) =>
          Number(transaction.id) === Number(e.target.id.split("-")[1])
      )[0]
    );
    setPopupData({...
      transactions.filter(
        (transaction) =>
          Number(transaction.id) === Number(e.target.id.split("-")[1])
      )[0]}
    );
	console.log(popupData)
  }
  console.log(popupData)

  async function deleteTransaction(e) {
    console.log(e.target.id);
    let array = e.target.id.split("-");
    console.log(array[array.length - 1]);
    await fetchDeleteTransaction(array[array.length - 1]);
    setTransactions(await fetchTransactions(transactions));
  }

  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const budget = transactions
    .map((transaction) => transaction.amount)
    .reduce((a, b) => a + b, 0);
  console.log(budget);

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
			<div id='budget'>Current budget: {budget}</div>
			<div className='financeManagerApp'>
				<div className='menu'>
					<Filter onSetFiltersData={setTransactions} />
					<TransactionForm
						categories={categories}
						id=''
						date=''
						description=''
						category=''
						amount=''
						type='Income'
						title='Add new transaction'
						buttonText='Add transaction'
						onFetch={fetchAddTransaction}
						onClose={setPopupDisplay}
						transactions={transactions}
						setTransactions={setTransactions}
					/>
				</div>
				<TransactionsDisplay
					transactions={transactions}
					categories={categories}
					editTransaction={(e) => editTransaction(e)}
					deleteTransaction={(e) => deleteTransaction(e)}
				/>
				{ popupDisplay === "block" ?
				<div className='popupBG' style={{ display: popupDisplay }}>
					<div className='popup' style={{ display: popupDisplay }}>
						<TransactionChangeForm
							categories={categories}
							id={popupData.id}
							date={popupData.date}
							description={popupData.description}
							category={popupData.category}
							amount={popupData.amount}
							type={popupData.type}
							title='Change transaction'
							buttonText='Save'
							onFetch={fetchPatchTransaction}
							onClose={setPopupDisplay}
							transactions={transactions}
							setTransactions={setTransactions}
						/> 
					</div>
				</div>
				: null}
			</div>
		</main>
	);
}

export default App;
