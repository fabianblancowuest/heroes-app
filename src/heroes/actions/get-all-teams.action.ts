import { getAllHeroesAction } from "./get-all-heroes.action";

export type TeamsObject = Record<string, string[]>; // key = equipo, value = array de héroes

export const getTeamsObject = async (): Promise<TeamsObject> => {
	const heroes = await getAllHeroesAction();

	const teams: TeamsObject = {};

	heroes.forEach((hero) => {
		// Nos aseguramos de que connections y groupAffiliation existan
		const affiliations = hero.connections?.groupAffiliation || [];

		affiliations.forEach((team) => {
			// Si el equipo no existe en el objeto, lo creamos con un array vacío
			if (!teams[team]) {
				teams[team] = [];
			}
			// Agregamos el alias o nombre del héroe al equipo
			teams[team].push(hero.alias || hero.name);
		});
	});

	return teams;
};
