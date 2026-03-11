import { charactersOne } from "./characters_one.data";
import { charactersTwo } from "./characters_two.data";
import { moreVillains } from "./more_villains.data";
import { moreAntiheroes } from "./more_antiheroes.data";
import { moreHeroes } from "./more_heroes.data";
import type { Hero } from "@/heroes/types/hero.interface";

export const heroesData: Hero[] = [
	...charactersOne,
	...charactersTwo,
	...moreVillains,
	...moreAntiheroes,
	...moreHeroes,
];
