import "./InputText.css";

function InputText({ onEvent }) {
  return <input type="text" className="search_input" onChange={onEvent} />;
}

export default InputText;
