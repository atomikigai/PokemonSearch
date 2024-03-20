import type { Pokemon } from "@renderer/services/structs";

const PokenByNames = ({ pokemon }: { pokemon: Pokemon }) => {
	return (
		<>
			{pokemon && (
				<div className="pokemon">
					<div className="pokemonimg">
						<img src="" alt="" />
					</div>
					<h3>{pokemon?.name}</h3>
				</div>
			)}
		</>
	);
};

export default PokenByNames;
