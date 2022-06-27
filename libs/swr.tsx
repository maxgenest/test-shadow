import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { API_URL } from "./utils/constants";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const getKey = (pageIndex, previousPageData) => {
  if (pageIndex === 0) {
    return `${API_URL}/pokemon/`;
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

export const useSwrPokemon = (pokemonName: string) => {
  const { data, error } = useSWR(`${API_URL}/pokemon/${pokemonName}`, fetcher);

  return { data, error };
};
