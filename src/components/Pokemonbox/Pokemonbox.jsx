import { useEffect, useState } from "react";
import axios from "axios";
import "./Pokemonbox.css";

function Pokemonbox({ data }) {
  const { id, name, gifUrl, types } = data;
  const [typeList, setTypeList] = useState([]);

  useEffect(() => {
    async function fetchTypes() {
      const typeResponse = await Promise.all(
        types.map((typeUrl) => axios.get(typeUrl))
      );

      setTypeList(typeResponse);
    }

    fetchTypes();
  }, [typeList]);

  return (
    <li>
      <div className="img">
        <img src={gifUrl} alt={name} />
      </div>
      <span>No.{id}</span>
      <h4 className="pokemon_name">{name}</h4>
      <div className="types">
        {typeList.map((type) => {
          return (
            <span key={type.data.id} className={`type_box ${type.data.name}`}>
              {type.data.names[1].name}
            </span>
          );
        })}
      </div>
    </li>
  );
}

export default Pokemonbox;
