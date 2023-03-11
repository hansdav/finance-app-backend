import { useState } from "react";
import "./TransactionChangeForm.css";
import fetchTransactions from "../api/fetchTransactions";
//import fetchAddTransaction from "../api/fetchAddTransaction";

export default function TransactionChangeForm(props) {
  const [data, setData] = useState({
    id: props.id,
    amount: props.amount,
    date: props.date,
    description: props.description,
    type: props.type, 
    category: props.category
  }) 

  async function onSubmitTransaction() {
    let object = {
      id: props.id,
      amount: data.type === "Income" ? Number(data.amount) : Number(`-${data.amount}`),
      date: data.date,
      description: data.description,
      type: data.type,
      category: props.categories.filter((cat) => cat.name === data.category)[0].id
    };
    await props.onFetch(object);
    props.onClose("none");
    props.setTransactions(await fetchTransactions(props.transactions));
  }

  return (
    <div className="TransactionForm">
      <h3>{props.title}</h3>
      <form className="TransactionForm">
        <input
          type="date"
          className="TransactionForm-date"
          value={data.date}
          onChange={(e) => setData({...data, date: e.target.value})}
        />
        <br />
        <input
          type="text"
          placeholder="Enter description"
          className="TransactionForm-text"
          value={data.description}
          onChange={(e) => setData({...data, description: e.target.value})}
        />
        <br />
        <input
          type="text"
          placeholder="Enter amount"
          className="TransactionForm-amount"
          value={data.amount}
          onChange={(e) => setData({...data, amount: e.target.value})}
        />
        <br />
        <select
          className="TransactionForm-type"
          value={data.type}
          onChange={(e) => setData({...data, type: e.target.value})}
        >
          <option selected hidden>
            Choose type
          </option>
          <option>Income</option>
          <option>Expense</option>
        </select>
        <br />
        <select
          className="TransactionForm-category"
          value={data.category}
          onChange={(e) => setData({...data, category: e.target.value})}
        >
          {props.categories.map((category) => {
            return <option key={category.id}>{category.name}</option>;
          })}
        </select>
      </form>
      <button
        className="TransactionForm-button"
        onClick={() => onSubmitTransaction()}
      >
        {props.buttonText}
      </button>
    </div>
  );
}
