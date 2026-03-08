import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";

export const getAllHeroesAction = async () => {
	const { data } = await heroApi.get<Hero>("");

	return {
		data,
	};
};
