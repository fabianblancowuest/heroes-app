import { useMemo } from "react";
import { heroesData } from "@/data/heroes.data";

export const useHeroSummary = () => {
	return useMemo(() => {
		const strongestHeroes = heroesData.filter(
			(hero) => hero.stats.strength === 10,
		);

		const smartestHeroes = heroesData.filter(
			(hero) => hero.stats.intelligence === 10,
		);

		const heroCount = heroesData.filter(
			(hero) => hero.category === "Hero",
		).length;

		const villainCount = heroesData.filter(
			(hero) => hero.category === "Villain",
		).length;

		const antiheroCount = heroesData.filter(
			(hero) => hero.category === "Antihero",
		).length;

		const civilianCount = heroesData.filter(
			(hero) => hero.category === "Civilian",
		).length;

		return {
			totalHeroes: heroesData.length,
			strongestHeroes,
			smartestHeroes,
			heroCount,
			villainCount,
			antiheroCount,
			civilianCount,
		};
	}, []);
};
