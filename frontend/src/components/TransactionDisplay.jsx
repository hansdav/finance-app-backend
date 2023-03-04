import Button from "./Button";
import "./TransactionDisplay.css";

export default function TransactionDisplay(props) {
  function styleAmount() {
    if (props.type === "Expence") {
      return "red";
    } else {
      return "green";
    }
  }
  return (
    <div className="TransactionDisplay" style={{ background: props.color }}>
      <div className="TransactionDisplay-date">{props.date}</div>
      <div className="TransactionDisplay-text">
        <div className="TransactionDisplay-description">
          {props.description}
        </div>
        <div className="TransactionDisplay-category">{props.category}</div>
      </div>
      <div
        className="TransactionDisplay-amount"
        style={{ color: styleAmount() }}
      >
        {props.type === "Income" ? props.amount : `-${props.amount}`}
      </div>
      <Button
        id={props.id}
        onButtonEvent={props.onEditButtonEvent}
        buttonText={
          <span id={`edit${props.id}`} role="img" aria-label="edit">
            ✍
          </span>
        }
      />
      <Button
        id={props.id}
        onButtonEvent={props.onDeleteButtonEvent}
        buttonText="✖"
      />
    </div>
  );
}
