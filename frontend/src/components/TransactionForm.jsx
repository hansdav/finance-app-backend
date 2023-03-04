import "./TransactionForm.css"

export default function TransactionForm(props) {
    return (
        <form className="TransactionForm">
            <input type="date" className="TransactionForm-date" />
            <br/>
            <input type="text" className="TransactionForm-text"/>
            <br/>
            <select className="TransactionForm-category">
                {props.categories.map((category) => { return (
                <option>{category.name}</option>
                )})}
            </select>
            <br/>
            <button className="TransactionForm-button">Add transaction</button>
        </form>
    )
}