import { useSwrPokemon } from "libs/swr";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Wrapper } from "styles/shared";

interface IProps {
  pokemonName: string;
}

const PokemonPage: NextPage<IProps> = ({ pokemonName }) => {
  const { data, error } = useSwrPokemon(pokemonName);

  if (error) return <div>Une erreur est survenue au chargement de la data</div>;
  if (!data) return <div>Chargement...</div>;

  return <Wrapper>{data.name}</Wrapper>;
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
