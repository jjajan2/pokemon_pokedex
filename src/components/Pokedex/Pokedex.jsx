import { useEffect, useState } from "react";
import "./Pokedex.css";
import fetchData from "../../api/pokemonAPI";
import InputText from "../atoms/InputText/InputText";
import Pokemonbox from "../Pokemonbox/Pokemonbox";
import Modal from "../Modal/Modal";
import SearchIcon from "../../img/search_icon.svg";

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [mapPokemonList, setMapPokemonList] = useState([]);
  const [selectPokemon, setSelectPokemon] = useState(null);
  const [isShow, setIsShow] = useState(false);

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

  useEffect(() => {
    setMapPokemonList(pokemonList);
  }, [pokemonList]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      setOffset((prevOffset) => prevOffset + 40);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function searchData(event) {
    event.preventDefault();

    if (searchText.trim() === "") {
      setMapPokemonList(pokemonList);
    } else {
      const result = pokemonList.filter((pokemon) =>
        pokemon.name.includes(searchText)
      );
      setMapPokemonList(result);
    }
  }

  return (
    <div className="pokedex">
      <form className="search_from" onSubmit={(event) => searchData(event)}>
        <InputText onEvent={(event) => setSearchText(event.target.value)} />
        <button type="submit" className="search_button">
          <img src={SearchIcon} alt="검색" />
        </button>
      </form>
      {isShow && (
        <Modal
          isShow={isShow}
          data={selectPokemon}
          onClose={() => setIsShow(false)}
        />
      )}
      <ul className="pokemon_list">
        {mapPokemonList.length > 0 ? (
          mapPokemonList.map((pokemon) => (
            <Pokemonbox
              key={pokemon.id}
              data={pokemon}
              onClick={() => {
                setSelectPokemon(pokemon);
                setIsShow(true);
              }}
            />
          ))
        ) : (
          <li className="no_posts">데이터가 없습니다.</li>
        )}
      </ul>
    </div>
  );
}

export default Pokedex;
