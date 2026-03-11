// import { useMemo } from "react";
// import { heroesData } from "@/data/heroes.data";
// import type { Hero } from "../types/hero.interface";
//?v1
// interface Options {
// 	limit?: number;
// 	offset?: number;
// 	category?: string;
// }

// export const useHeroes = ({
// 	limit = 6,
// 	offset = 0,
// 	category = "all",
// }: Options) => {
// 	const result = useMemo(() => {
// 		let heroes: Hero[] = [...heroesData];

// 		if (category !== "all") {
// 			heroes = heroes.filter(
// 				(hero) => hero.category.toLowerCase() === category.toLowerCase(),
// 			);
// 		}

// 		const total = heroes.length;

// 		const paginated = heroes.slice(offset, offset + limit);

// 		return {
// 			total,
// 			pages: Math.ceil(total / limit),
// 			heroes: paginated,
// 		};
// 	}, [limit, offset, category]);

// 	return result;
// };
// ?v2
// import { useMemo } from "react";
// import { heroesData } from "@/data/heroes.data";

// export const useHeroes = ({ limit = 6, offset = 0, category = "all" }) => {
// 	return useMemo(() => {
// 		let heroes = heroesData;

// 		if (category !== "all") {
// 			heroes = heroes.filter((hero) => hero.category === category);
// 		}

// 		const total = heroes.length;

// 		return {
// 			total,
// 			pages: Math.ceil(total / limit),
// 			heroes: heroes.slice(offset, offset + limit),
// 		};
// 	}, [limit, offset, category]);
// };
// ?v3
import { useMemo } from "react";
import { heroesData } from "@/data/heroes.data";

interface Props {
	limit: number;
	offset: number;
	category: string;
}

export const useHeroes = ({ limit, offset, category }: Props) => {
	const filteredHeroes = useMemo(() => {
		if (category === "all") return heroesData;

		return heroesData.filter(
			(hero) => hero.category.toLowerCase() === category.toLowerCase(),
		);
	}, [category]);

	const paginatedHeroes = useMemo(() => {
		return filteredHeroes.slice(offset, offset + limit);
	}, [filteredHeroes, offset, limit]);

	const pages = Math.ceil(filteredHeroes.length / limit);

	return {
		heroes: paginatedHeroes,
		pages,
	};
};
