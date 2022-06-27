import useSWRInfinite from "swr/infinite";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const getKey = (pageIndex, previousPageData) => {
  if (pageIndex === 0) {
    return `https://pokeapi.co/api/v2/pokemon/`;
  }

  if (previousPageData) {
    return previousPageData.next;
  }

  return null;
};

export const useSwrPokemonList = () => {
  const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite(
    getKey,
    fetcher
  );

  return { data, error, isValidating, mutate, size, setSize };
};
