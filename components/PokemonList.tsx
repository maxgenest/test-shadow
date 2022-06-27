import React, { Ref } from "react";
import { IPokemon } from "../libs/types";
import styled from "styled-components";
import { DEVICE_WIDTH, API_URL } from "../libs/utils/constants";
import Link from "next/link";

interface IProps {
  data: any[];
  error: string;
  searchedPokemon?: string;
}

export const PokemonList: React.FC<IProps> = ({
  data,
  error,
  searchedPokemon,
}) => {
  if (error) return <div>Une erreur est survenue au chargement de la data</div>;
  if (!data) return <div>Chargement...</div>;

  return (
    <Grid>
      {data.map((page) =>
        page.results
          .filter(
            (pokemon: IPokemon) =>
              searchedPokemon === undefined ||
              pokemon.name.startsWith(searchedPokemon)
          )
          .map((pokemon: IPokemon) => (
            <Item key={pokemon.name}>
              <Link href={`/pokemon/${pokemon.name}`}>
                <ItemName>{pokemon.name}</ItemName>
              </Link>
            </Item>
          ))
      )}
    </Grid>
  );
};

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ theme }) => theme.spacing.m};

  @media screen and (min-width: ${DEVICE_WIDTH.MOBILE}px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const Item = styled.li`
  border: 1px solid ${({ theme }) => theme.color.white};
  border-radius: ${({ theme }) => theme.spacing.m};
  padding: ${({ theme }) => theme.spacing.m};
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.black};
  }
`;
const ItemName = styled.p`
  ${({ theme }) => theme.typo.l};
`;
