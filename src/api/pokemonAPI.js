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

      return {
        id: koreanData.data.id,
        name: koreanData.data.names[2].name,
        color: koreanData.data.color.name,
        imgUrl: data.data.sprites.front_default,
        gifUrl:
          data.data.sprites.versions["generation-v"]["black-white"].animated
            .front_default,
        types: data.data.types.map((type) => type.type.url),
      };
    })
  );

  return pokemonData;
}

export default fetchData;
