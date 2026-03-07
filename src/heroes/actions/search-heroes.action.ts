import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";

const VITE_API_URL = import.meta.env.VITE_API_URL;

interface Options {
	name?: string;
	team?: string;
	category?: string;
	universe?: string;
	status?: string;
	strength?: string;
	durability?: string;
	intelligence?: string;
	speed?: string;
}

export const searchHeroesAction = async (options: Options) => {
	const {
		name,
		team,
		category,
		universe,
		status,
		strength,
		durability,
		intelligence,
		speed,
	} = options;

	// limpiar parámetros vacíos o undefined
	const params = Object.fromEntries(
		Object.entries({
			name,
			team,
			category,
			universe,
			status,
			strength,
			durability,
			intelligence,
			speed,
		}).filter(([_, value]) => value !== undefined && value !== ""),
	);

	// si no hay filtros, no llamar al backend
	if (Object.keys(params).length === 0) {
		return [];
	}

	const { data } = await heroApi.get<Hero[]>("/search", {
		params,
	});

	return data.map((hero) => ({
		...hero,
		image: `${VITE_API_URL}/images/${hero.image}`,
	}));
};
