import { useSwrPokemon } from "libs/swr";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Wrapper } from "styles/shared";
import styled from "styled-components";
import Image from "next/image";
import { DEVICE_WIDTH } from "libs/utils/constants";
import Link from "next/link";

interface IProps {
  pokemonName: string;
}

const PokemonPage: NextPage<IProps> = ({ pokemonName }) => {
  const { data, error } = useSwrPokemon(pokemonName);

  if (error) return <div>Une erreur est survenue au chargement de la data</div>;
  if (!data) return <div>Chargement...</div>;

  return (
    <Wrapper>
      <BackLink href="/">All pokemons</BackLink>

      <Title>
        #{data.order} - {data.name}
      </Title>

      <FlexWrapper>
        <ImageWrapper>
          <Image
            src={data.sprites.front_default}
            layout="fill"
            alt={data.name}
          />
        </ImageWrapper>

        <Block>
          <SubTitle>Stats</SubTitle>
          <ul>
            {data.stats.map((stat) => (
              <StyledLi key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </StyledLi>
            ))}
          </ul>
        </Block>

        <Block>
          <SubTitle>Types</SubTitle>
          <ul>
            {data.types.map((type) => (
              <StyledLi key={type.type.name}>{type.type.name}</StyledLi>
            ))}
          </ul>
        </Block>
      </FlexWrapper>
    </Wrapper>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pokemonName = params.pokemonName;

  return {
    props: {
      pokemonName,
    },
    revalidate: 3600, // 1h
  };
};

export default PokemonPage;

const BackLink = styled(Link)`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.l};

  :hover {
    font-weight: bolder;
  }
`;
const Title = styled.h1`
  font-size: ${({ theme }) => theme.typo.xl};
  border-bottom: 1px solid ${({ theme }) => theme.color.white};
  padding-bottom: ${({ theme }) => theme.spacing.m};
  margin-bottom: ${({ theme }) => theme.spacing.m};
`;
const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  flex-direction: column;

  @media screen and (min-width: ${DEVICE_WIDTH.MOBILE}px) {
    flex-direction: row;
  }

  & > *:not(:first-child) {
    margin-left: ${({ theme }) => theme.spacing.m};
  }
`;
const SubTitle = styled.h2`
  ${({ theme }) => theme.typo.l}
  margin-bottom: ${({ theme }) => theme.spacing.s};
`;
const Block = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.m};
`;
const StyledLi = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
`;
