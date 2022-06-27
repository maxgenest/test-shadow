import styled from "styled-components";
import { NextPage } from "next";
import { useSwrPokemonList } from "libs/swr";
import { useCallback, useEffect, useRef, useState } from "react";
import { PokemonList } from "components/PokemonList";
import { Wrapper } from "styles/shared";
import { IPokemon } from "../libs/types";

const HomePage: NextPage = () => {
  const { data, error, isValidating, mutate, size, setSize } =
    useSwrPokemonList();
  const wrapperRef = useRef();
  const [searchedPokemon, setSearchedPokemon] = useState<string>();

  const showNextPage = useCallback(() => {
    if (
      wrapperRef.current &&
      wrapperRef.current.getBoundingClientRect().bottom <= window.innerHeight
    )
      setSize(size + 1);
  }, [setSize, size]);

  useEffect(() => {
    window.addEventListener("scroll", showNextPage);
  }, [setSize, showNextPage, size, wrapperRef]);

  return (
    <Wrapper ref={wrapperRef}>
      <Title>Catch&apos;em all !</Title>

      <StyledInput
        placeholder="Find a pokemon by name"
        onChange={(e) => {
          setSearchedPokemon(e.target.value);
        }}
      />

      <PokemonList
        data={data}
        error={error}
        searchedPokemon={searchedPokemon}
      />

      <button onClick={showNextPage}>Load More</button>
    </Wrapper>
  );
};

const Title = styled.h1`
  ${({ theme }) => theme.typo.xxl};

  border-bottom: 1px solid ${({ theme }) => theme.color.white};
  padding-bottom: ${({ theme }) => theme.spacing.m};
  margin-bottom: ${({ theme }) => theme.spacing.m};
`;
const StyledInput = styled.input`
  font-size: ${({ theme }) => theme.typo.l};
  padding: ${({ theme }) => theme.spacing.s};
  border-radius: ${({ theme }) => theme.spacing.s};
  border: none;
  margin-bottom: ${({ theme }) => theme.spacing.m};
  width: 100%;
`;

export default HomePage;
