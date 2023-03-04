import TransactionDisplay from "./TransactionDisplay";

export default function TransactionsDisplay(props) {
  return (
    <div className="transactionsDisplay">
      {props.transactions.map((transaction) => {
        return (
          <TransactionDisplay
            id={transaction.id}
            onEditButtonEvent={(e) => props.editTransaction(e)}
            onDeleteButtonEvent={(e) => props.deleteTransaction(e)}
            key={transaction.id}
            date={transaction.date}
            description={transaction.description}
            amount={transaction.amount}
            type={transaction.type}
            color={
              props.categories.filter(
                (category) => category.id === transaction.category
              )[0].color
            }
            category={
              props.categories.filter(
                (category) => category.id === transaction.category
              )[0].name
            }
          />
        );
      })}
    </div>
  );
}
