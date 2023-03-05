import { useState } from "react";
import "./TransactionForm.css";
//import fetchAddTransaction from "../api/fetchAddTransaction";

export default function TransactionForm(props) {
  const [date, setDate] = useState(props.date);
  const [description, setDescription] = useState(props.description);
  const [category, setCategory] = useState(props.category);
  const [amount, setAmount] = useState(props.amount);
  const [type, setType] = useState(props.amount);


  function onSubmitTransaction() {
    let object =  {
      id: props.id,
      amount: type === "Income" ? Number(amount) : Number(`-${amount}`),
      date: date,
      description: description,
      type: type,
      category: props.categories.filter((cat) => cat.name === category)[0].id
    }
    props.onFetch(object)
    props.onClose("none")
  }

  return (
    <div className="TransactionForm">
      <h3>{props.title}</h3>
      <form className="TransactionForm">
        <input
          type="date"
          className="TransactionForm-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Enter description"
          className="TransactionForm-text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Enter amount"
          className="TransactionForm-amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br/>
        <select
          className="TransactionForm-type"
          onChange={(e) => setType(e.target.value)}
          defaultValue={type}
        >
          <option>Income</option>
          <option>Expence</option>
        </select>
        <br />
        <select
          className="TransactionForm-category"
          onChange={(e) => setCategory(e.target.value)}
          defaultValue={category}
        >
          {props.categories.map((category) => {
            return <option key={category.id}>{category.name}</option>;
          })}
          <option>Create new category</option>
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
