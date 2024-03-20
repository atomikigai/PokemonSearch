import { useEffect, useState } from "react";
import PokeApiImg from "./assets/pokeapi.svg";
import {
	AllPokemons,
	PokemonByAbility,
	PokemonByNameOrID,
} from "./services/handles";
import type {
	AbilityPokemons,
	Pokemon,
	Pokemons,
	SearchCriteria,
} from "./services/structs";

function App(): JSX.Element {
	//Estos estados muestran la lista de los pokemons
	//He creado multiples estados debido a que la api devuelve diferentes
	//Estructuras al responder, y me dejo algo confundido a la hora de mostrar
	const [pokemons, setPokemons] = useState<Pokemons[]>();
	const [pokemonsResult, setPokemonsResult] = useState<Pokemon>();
	const [abilitiesPokemons, setAbilitiesPokemons] = useState<AbilityPokemons>();

	//Este estado recibe el parametro de busqueda
	// y recibe el valor a buscar
	const [search, setSearch] = useState<SearchCriteria>({
		text: "",
		critera: "ID",
	});

	//Esta funcion devuelve la lista de todos los pokemons
	const getPokemons = async () => {
		const res = await AllPokemons();
		setPokemons(res.results);
	};

	//Esta funcion devuelve el pokemon cuando se busca
	//por nombre o ID
	const getPokemonsByNameOrID = async (search: SearchCriteria) => {
		const res = await PokemonByNameOrID(search);
		setPokemonsResult(res);
		console.log(res);
	};

	//Esta funcion devuelve los pokemons con habilidades similares
	const getPokemonsByAbility = async (search: SearchCriteria) => {
		const res = await PokemonByAbility(search);
		setAbilitiesPokemons(res);
	};

	//Esta funcion almacena lo que el usuario escribio en el campo de busqueda
	const change = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setSearch({
			...search,
			text: value,
		});
	};

	//Esta funcion almacena el tipo de busqueda que el usuario selecciono
	const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		setSearch({
			...search,
			critera: value,
		});
	};

	//Esta funcion limpia el resto de listas y para que se muestre la
	//todos los pokemons
	const clear = () => {
		setPokemonsResult(undefined);
		setAbilitiesPokemons(undefined);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getPokemons();
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		//Aqui vigilo los cambios en tiempo real del estado search
		//que almacena el criterio de busqueda y el valor a buscar
		//para asi dirigirlo a la busqueda correspondiente

		if (
			(search.critera === "Nombre" || search.critera === "ID") &&
			search.text !== ""
		) {
			getPokemonsByNameOrID(search);
		}

		if (search.text === "") {
			getPokemons();
		}

		if (search.critera === "Habilidad" && search.text !== "") {
			getPokemonsByAbility(search);
		}
	}, [search]);

	return (
		<div className="parent">
			<img src={PokeApiImg} width={300} height={300} alt="" />
			<div className="searchInput">
				<input
					className="search"
					placeholder="Search Pokemon"
					onChange={(e) => change(e)}
				/>
				<select
					onChange={(e) => {
						selectChange(e);
						clear();
					}}
					value={search.critera}
				>
					<option value="ID">ID</option>
					<option value="Nombre">Nombre</option>
					<option value="Rol">Rol</option>
					<option value="Habilidad">Habilidad</option>
					<option value="Altura">Altura</option>
				</select>
			</div>
			<p className="textsearch">
				Use this input to search for any pokemon. In an instant.
			</p>

			<div className="pokemons">
				{search.text === "" &&
					pokemons?.map((item) => (
						<div className="pokemon">
							<div className="pokemonimg">
								<img src="" alt="" />
							</div>
							<h3>{item.name}</h3>
						</div>
					))}

				<>
					{pokemonsResult && (
						<div className="pokemon">
							<div className="pokemonimg">
								<img src="" alt="" />
							</div>
							<h3>{pokemonsResult?.name}</h3>
						</div>
					)}
				</>

				<>
					{abilitiesPokemons?.pokemon.map((item) => (
						<div className="pokemon">
							<div className="pokemonimg">
								<img src="" alt="" />
							</div>
							<h3>{item.pokemon.name}</h3>
						</div>
					))}
				</>
			</div>
		</div>
	);
}

export default App;
