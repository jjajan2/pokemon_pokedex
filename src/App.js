import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Pokemonbox from "./components/Pokemonbox/Pokemonbox";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
    const pokemonList = response.data.results;

    const pokemonData = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const data = await axios.get(pokemon.url);
        const koreanData = await axios.get(data.data.species.url);

        return {
          id: koreanData.data.id,
          name: koreanData.data.names[2].name,
          imgUrl: data.data.sprites.front_default,
          gifUrl:
            data.data.sprites.versions["generation-v"]["black-white"].animated
              .front_default,
          types: data.data.types.map((type) => type.type.url),
        };
      })
    );

    setPokemonList(pokemonData);
  }

  return (
    <div className="App">
      <ul className="pokemon_list">
        {pokemonList.map((pokemon) => {
          return <Pokemonbox data={pokemon} key={pokemon.id} />;
        })}
      </ul>
    </div>
  );
}

export default App;
