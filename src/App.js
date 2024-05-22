// App.js
import { useEffect, useState } from "react";
import "./App.css";
import fetchData from "./api/pokemonAPI";
import Pokemonbox from "./components/Pokemonbox/Pokemonbox";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const loadPokemon = async () => {
      const data = await fetchData(offset);

      if (offset > 0) {
        setPokemonList((prevList) => [...prevList, ...data]);
      } else {
        setPokemonList(data);
      }
    };
    loadPokemon();
  }, [offset]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      setOffset((prevOffset) => prevOffset + 40);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App">
      <ul className="pokemon_list">
        {pokemonList.map((pokemon, index) => (
          <Pokemonbox key={`${offset}-${index}`} data={pokemon} />
        ))}
      </ul>
    </div>
  );
}

export default App;
