import React, { Ref } from "react";
import { IPokemon } from "../libs/types";
import styled from "styled-components";
import { DEVICE_WIDTH } from "../libs/utils/constants";

interface IProps {
  data: any[];
  error: string;
  className?: string;
}

export const PokemonList: React.FC<IProps> = ({ data, error, className }) => {
  if (error) return <div>Une erreur est survenue au chargement de la data</div>;
  if (!data) return <div>Chargement...</div>;

  return (
    <Grid className={className}>
      {data.map((page) =>
        page.results.map((pokemon: IPokemon) => (
          <Item key={pokemon.name}>
            <ItemName>{pokemon.name}</ItemName>
          </Item>
        ))
      )}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ theme }) => theme.spacing.m};

  @media screen and (min-width: ${DEVICE_WIDTH.MOBILE}px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const Item = styled.div`
  border: 1px solid ${({ theme }) => theme.color.white};
  border-radius: ${({ theme }) => theme.spacing.m};
  padding: ${({ theme }) => theme.spacing.m};
`;
const ItemName = styled.p`
  ${({ theme }) => theme.typo.xl};
`;
