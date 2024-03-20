import type { AbilityPokemons, PokeAPIResponse, Pokemon, SearchCriteria } from "./structs";

export async function AllPokemons(): Promise<PokeAPIResponse> {
	const url = "https://pokeapi.co/api/v2/pokemon/";
	return await fetch(url)
		.then((res) => res.json())
		.catch((err) => console.log(err));
}

export async function PokemonByNameOrID(search: SearchCriteria): Promise<Pokemon>{
    const url = `https://pokeapi.co/api/v2/pokemon/${search.text}`;
    return await fetch(url)
        .then((res) => res.json())
        .catch((err) => console.log(err));
}


export async function PokemonByAbility(search: SearchCriteria): Promise<AbilityPokemons>{
    const url = `https://pokeapi.co/api/v2/ability/${search.text}`;
    return await fetch(url)
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

