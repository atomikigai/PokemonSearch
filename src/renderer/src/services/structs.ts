//Estructura usada para recibir la lista de todos los pokemons
//La API devuelve un array de pokemons que contienen el nombre y un enlace
export interface PokeAPIResponse{
    counts: string;
    next: string;
    results: Array<Pokemons>
}

export interface Pokemons{
    name: string;
    url: string;
}

//Estructura usada para definir el estado de las busquedas
export interface SearchCriteria{
    text: string;
    critera: string;
}

//Estructura usada al buscar un pokemon de manera individual
export interface Pokemon{
    weight: number;
    name: string;
    id: number;
}

//Estructura usada al buscar un pokemon por sus habilidades
//recibimos un array de pokemons
export interface AbilityPokemons{
    pokemon: Array<AbilityPokemon>
}

export interface AbilityPokemon{
    pokemon: Pokemons
}