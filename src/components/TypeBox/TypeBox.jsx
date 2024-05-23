import "./TypeBox.css";

function TypeBox({ data }) {
  return (
    <span key={data.id} className={`type_box ${data.name}`}>
      {data.names.find((name) => name.language.name === "ko").name}
    </span>
  );
}

export default TypeBox;
