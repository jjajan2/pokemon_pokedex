import "./Pokemonbox.css";
import TypeBox from "../TypeBox/TypeBox";

function Pokemonbox({ data, onClick }) {
  const { id, name, gifUrl, types } = data;

  return (
    <li className="pokemon_box" onClick={onClick}>
      <span>No.{id}</span>
      <h4 className="pokemon_name">{name}</h4>
      <div className="img">
        <img src={gifUrl.front_default} alt={name} />
      </div>
      <div className="types">
        {types.map((type) => {
          return <TypeBox key={type.id} data={type} />;
        })}
      </div>
    </li>
  );
}

export default Pokemonbox;
