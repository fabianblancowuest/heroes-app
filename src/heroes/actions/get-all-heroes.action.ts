// import { heroApi } from "../api/hero.api";
// import type { Hero } from "../types/hero.interface";

// const BASE_URL = import.meta.env.VITE_API_URL;

// export const getAllHeroesAction = async (): Promise<Hero[]> => {
// 	try {
// 		const { data } = await heroApi.get<[]>(``); // Ajusta la ruta si tu backend usa /all o similar
// 		return data.heroes.map((hero) => ({
// 			...hero,
// 			image: `${BASE_URL}/images/${hero.image}`,
// 		}));
// 	} catch (error) {
// 		console.error("Error al traer todos los héroes:", error);
// 		return [];
// 	}
// };

// import { heroApi } from "../api/hero.api";
// import type { Hero } from "../types/hero.interface";

// const BASE_URL = import.meta.env.VITE_API_URL;

// export const getAllHeroesAction = async (): Promise<Hero[]> => {
// 	try {
// 		const response = await heroApi.get(""); // ruta de tu backend
// 		console.log("Respuesta completa de la API:", response);

// 		// Solo para chequear qué es realmente
// 		console.log("response.data:", response.data);

// 		// Por ahora retornamos vacío para que no rompa
// 		return [];
// 	} catch (error) {
// 		console.error("Error al traer todos los héroes:", error);
// 		return [];
// 	}
// };

import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getAllHeroesAction = async (limit = 200): Promise<Hero[]> => {
	try {
		const response = await heroApi.get(`?limit=${limit}`); // tu endpoint
		console.log("Array de héroes:", response.data.heroes); // Para confirmar

		const heroesArray: Hero[] = Array.isArray(response.data.heroes)
			? response.data.heroes
			: [];

		// Ajustamos la URL de la imagen
		return heroesArray.map((hero) => ({
			...hero,
			image: `${BASE_URL}/images/${hero.image}`,
		}));
	} catch (error) {
		console.error("Error al traer todos los héroes:", error);
		return [];
	}
};
