import axios from "axios";

async function fetchData(offset) {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=40`
  );
  const pokemonList = response.data.results;

  const pokemonData = await Promise.all(
    pokemonList.map(async (pokemon) => {
      const data = await axios.get(pokemon.url);
      const koreanData = await axios.get(data.data.species.url);

      const types = await Promise.all(
        data.data.types.map(async (type) => {
          const typeData = await axios.get(type.type.url);

          return typeData.data;
        })
      );

      return {
        id: koreanData.data.id,
        name: koreanData.data.names.find((name) => name.language.name === "ko")
          ?.name,
        gifUrl:
          data.data.sprites.versions["generation-v"]["black-white"].animated,
        types: types,
        infoData: data.data,
        koreanData: koreanData.data,
      };
    })
  );

  return pokemonData;
}

export default fetchData;
