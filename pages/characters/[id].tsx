import Image from "next/image";
import imageLoader from "../../imageLoader";
import { Character, GetCharacterResults } from "../../types";

function CharacterPage({character} : {
    character: Character
}){
    return <div>
        <h1>{character.name}</h1>

        <Image
              loader={imageLoader}
              unoptimized
              src={character.image}
              alt={character.name}
              width="200"
              height="200"
            />
    </div>
}

export async function getStaticPaths() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const { results }: GetCharacterResults = await res.json();
  return {
    paths: results.map((character) => {
      return {
        params: { id: String(character.id) },
      };
    }),
  };
}

export async function getStaticProps({params} : {params: {id: string}}){
    const res = await fetch(
        `https://rickandmortyapi.com/api/character/${params.id}`
    );
    const character = res.json()
}

export default CharacterPage;
