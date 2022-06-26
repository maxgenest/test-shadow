import styled from "styled-components";
import { DEVICE_WIDTH } from "../libs/utils/constants";
import { NextPage } from "next";
import useSWR from "swr";
import { fetcher } from "libs/swr";
import { IPokemon } from "../libs/types";

const HomePage: NextPage = () => {
  const { data, error } = useSWR("https://pokeapi.co/api/v2/pokemon/", fetcher);

  if (error) return <div>Une erreur est survenue au chargement de la data</div>;
  if (!data) return <div>Chargement...</div>;

  return (
    <Wrapper>
      <Title>Attrappez-les tous !</Title>

      <Grid>
        {data.results.map((pokemon: IPokemon) => (
          <Item key={pokemon.name}>
            <ItemName>{pokemon.name}</ItemName>
          </Item>
        ))}
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.color.white};
  padding: ${({ theme }) => theme.spacing.l};
`;
const Title = styled.h1`
  ${({ theme }) => theme.typo.xxl};

  border-bottom: 1px solid ${({ theme }) => theme.color.white};
  padding-bottom: ${({ theme }) => theme.spacing.m};
  margin-bottom: ${({ theme }) => theme.spacing.m};
`;
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

export default HomePage;
