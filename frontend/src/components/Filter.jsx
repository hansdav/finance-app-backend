import { useState } from "react";
import "./Filter.css";

export default function Filter() {
    const [type, setType] = useState();
    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [amount, setAmount] = useState();
    const [date, setDate] = useState();
    const [amountButtonText, setAmountButtonText] = useState("Amount ▼");
    const [dateButtonText, setDateButtonText] = useState("Date ▼");

    function sortAmount(e) {
        if (e.target.value === "Amount ▼") {
            setAmount("sortAescending");
            setAmountButtonText("Amount ▲")
        } else {
            setAmount("sortDescending");
            setAmountButtonText("Amount ▼")
        }
    }

    function sortDate(e) {
        if (e.target.value === "Date ▼") {
            setDate("sortAescending");
            setDateButtonText("Date ▲")
        } else {
            setDate("sortDescending");
            setDateButtonText("Date ▼")
        }
    }

    function reset() {
        setType();
        setName();
        setCategory();
        setAmount();
        setDate();
    }

    function submitFilter() {
        console.log({
            type: type, 
            name: name,
            category: category,
            amount: amount,
            date: date
        })
    }

  return (
    <div className="allFilters">
        <h3>Filter transactions</h3>
      <form>
        <select className="filterByType" onChange={ (e)=> setType(e.target.value)}>
          <option>All</option>
          <option>Expences</option>
          <option>Income</option>
        </select>
        <input className="searchName" placeholder="search for name" onChange={ (e)=> setName(e.target.value)} />
        <input className="searchCategory" placeholder="search for category" onChange={ (e)=> setCategory(e.target.value)} />
      </form>
      <button className="filterButton" onClick={()=> submitFilter()}>Filter</button>
      <button className="sortButton" value={amountButtonText} onClick={(e)=> sortAmount(e)}>{amountButtonText}</button>
        <button className="sortButton" value={dateButtonText} onClick={(e)=> sortDate(e)}>{dateButtonText}</button>
        <button className="sortButton" onClick={ ()=>reset() }>Reset</button>
    </div>
  );
}
