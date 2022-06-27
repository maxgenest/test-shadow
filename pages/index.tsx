import styled from "styled-components";
import { NextPage } from "next";
import { useSwrPokemonList } from "libs/swr";
import { useEffect, useRef } from "react";
import { PokemonList } from "components/PokemonList";
import { Wrapper } from "styles/shared";

const HomePage: NextPage = () => {
  const { data, error, isValidating, mutate, size, setSize } =
    useSwrPokemonList();
  const wrapperRef = useRef();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        wrapperRef.current &&
        wrapperRef.current.getBoundingClientRect().bottom <= window.innerHeight
      )
        setSize(size + 1);
    });
  }, [setSize, size, wrapperRef]);

  return (
    <Wrapper ref={wrapperRef}>
      <Title>Attrappez-les tous !</Title>

      <PokemonList data={data} error={error} />
    </Wrapper>
  );
};

const Title = styled.h1`
  ${({ theme }) => theme.typo.xxl};

  border-bottom: 1px solid ${({ theme }) => theme.color.white};
  padding-bottom: ${({ theme }) => theme.spacing.m};
  margin-bottom: ${({ theme }) => theme.spacing.m};
`;

export default HomePage;
