// import { useMemo } from "react";
// import { heroesData } from "@/data/heroes.data";

// export const useAdvancedSearch = (filters: any) => {
// 	return useMemo(() => {
// 		let filteredHeroes = [...heroesData];

// 		if (filters.name) {
// 			filteredHeroes = filteredHeroes.filter(
// 				(hero) =>
// 					hero.name.toLowerCase().includes(filters.name.toLowerCase()) ||
// 					hero.alias.toLowerCase().includes(filters.name.toLowerCase()),
// 			);
// 		}

// 		if (filters.team && filters.team !== "all") {
// 			filteredHeroes = filteredHeroes.filter((hero) =>
// 				hero.connections?.groupAffiliation.includes(filters.team),
// 			);
// 		}

// 		if (filters.category && filters.category !== "all") {
// 			filteredHeroes = filteredHeroes.filter(
// 				(hero) =>
// 					hero.category.toLowerCase() === filters.category.toLowerCase(),
// 			);
// 		}

// 		if (filters.universe && filters.universe !== "all") {
// 			filteredHeroes = filteredHeroes.filter(
// 				(hero) =>
// 					hero.universe.toLowerCase() === filters.universe.toLowerCase(),
// 			);
// 		}

// 		if (filters.status && filters.status !== "all") {
// 			filteredHeroes = filteredHeroes.filter(
// 				(hero) => hero.status.toLowerCase() === filters.status.toLowerCase(),
// 			);
// 		}

// 		if (filters.strength) {
// 			filteredHeroes = filteredHeroes.filter(
// 				(hero) => hero.stats.strength >= filters.strength,
// 			);
// 		}

// 		if (filters.speed) {
// 			filteredHeroes = filteredHeroes.filter(
// 				(hero) => hero.stats.speed >= filters.speed,
// 			);
// 		}

// 		if (filters.durability) {
// 			filteredHeroes = filteredHeroes.filter(
// 				(hero) => hero.stats.durability >= filters.durability,
// 			);
// 		}

// 		if (filters.intelligence) {
// 			filteredHeroes = filteredHeroes.filter(
// 				(hero) => hero.stats.intelligence >= filters.intelligence,
// 			);
// 		}

// 		if (filters.combat) {
// 			filteredHeroes = filteredHeroes.filter(
// 				(hero) => hero.stats.combat >= filters.combat,
// 			);
// 		}

// 		return filteredHeroes.sort((a, b) => a.name.localeCompare(b.name));
// 	}, [filters]);
// };

import { useMemo } from "react";
import { heroesData } from "@/data/heroes.data";

export const useAdvancedSearch = (filters: any) => {
	return useMemo(() => {
		let result = heroesData;

		if (filters.name) {
			const name = filters.name.toLowerCase();

			result = result.filter(
				(hero) =>
					hero.name.toLowerCase().includes(name) ||
					hero.alias.toLowerCase().includes(name),
			);
		}

		if (filters.team && filters.team !== "all") {
			result = result.filter((hero) =>
				hero.connections?.groupAffiliation.includes(filters.team),
			);
		}

		if (filters.category && filters.category !== "all") {
			result = result.filter((hero) => hero.category === filters.category);
		}

		if (filters.universe && filters.universe !== "all") {
			result = result.filter((hero) => hero.universe === filters.universe);
		}

		if (filters.status && filters.status !== "all") {
			result = result.filter((hero) => hero.status === filters.status);
		}

		if (filters.strength) {
			result = result.filter((hero) => hero.stats.strength >= filters.strength);
		}

		if (filters.speed) {
			result = result.filter((hero) => hero.stats.speed >= filters.speed);
		}

		if (filters.durability) {
			result = result.filter(
				(hero) => hero.stats.durability >= filters.durability,
			);
		}

		if (filters.intelligence) {
			result = result.filter(
				(hero) => hero.stats.intelligence >= filters.intelligence,
			);
		}

		if (filters.combat) {
			result = result.filter((hero) => hero.stats.combat >= filters.combat);
		}

		return [...result].sort((a, b) => a.name.localeCompare(b.name));
	}, [filters]);
};
