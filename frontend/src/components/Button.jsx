import "./Button.css";

export default function Button(props) {
  return (
    <button
      id={`button-${props.id}`}
      className="Button"
      onClick={props.onButtonEvent}
    >
      {props.buttonText}
    </button>
  );
}
