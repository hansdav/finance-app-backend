export default function TransactionDisplay(props) {
    return (
        <div style={{ background: props.color }}>
            <div>{props.date}</div>
            <div>{props.description}</div>
            <div>{props.amount}</div>
        </div>
    )
}