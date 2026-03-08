import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface"; // La interfaz anidada que acabamos de definir

const VITE_API_URL = import.meta.env.VITE_API_URL;

// Definimos las opciones de búsqueda que vienen del formulario (planas)
interface SearchOptions {
	name?: string;
	category?: string;
	universe?: string;
	status?: string;
	strength?: string;
	intelligence?: string;
	speed?: string;
	durability?: string;
	team?: string;
}

export const searchHeroesAction = async (
	options: SearchOptions,
): Promise<Hero[]> => {
	const {
		name,
		category,
		universe,
		status,
		strength,
		intelligence,
		speed,
		durability,
		team,
	} = options;

	// 1. Limpiar parámetros vacíos o undefined
	const params = Object.fromEntries(
		Object.entries({
			name,
			category,
			universe,
			status,
			strength,
			intelligence,
			speed,
			durability,
			team,
		}).filter(([_, value]) => value !== undefined && value !== ""),
	);

	// 2. Si no hay filtros, podrías retornar un array vacío o todos los héroes
	// según prefieras. Aquí mantenemos tu lógica de retornar vacío si no hay parámetros.
	if (Object.keys(params).length === 0) {
		return [];
	}

	try {
		// 3. Petición al Backend
		// Enviamos los params. El Backend se encargará de buscar 'strength' dentro de 'stats.strength'
		const { data } = await heroApi.get<Hero[]>("/search", {
			params,
		});

		// 4. Transformación de la URL de la imagen
		// Mantenemos la estructura Hero intacta, solo actualizamos el string de la imagen
		return data.map((hero) => ({
			...hero,
			image: `${VITE_API_URL}/images/${hero.image}`,
		}));
	} catch (error) {
		console.error("Error buscando héroes:", error);
		// Podrías lanzar el error o retornar un array vacío según tu manejo de estados
		return [];
	}
};
