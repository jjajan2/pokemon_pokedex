// import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

function Pokemonbox({ data }) {
  const { id, name, gifUrl, types } = data;
  const [typeList, setTypeList] = useState([]);

  useEffect(() => {
    fetchTypes();
  }, []);

  async function fetchTypes() {
    const typeResponse = await Promise.all(
      types.map((typeUrl) => axios.get(typeUrl))
    );

    setTypeList(typeResponse);
  }

  return (
    <li>
      {/* <img src={imgUrl} /> */}
      <span>#{id}</span>
      <img src={gifUrl} />
      <h4>{name}</h4>
      <div>
        {typeList.map((type) => {
          return <span key={type.data.id}>{type.data.names[1].name}</span>;
        })}
      </div>
    </li>
  );
}

export default Pokemonbox;
