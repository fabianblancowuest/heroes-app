import { heroesData } from "@/data/heroes.data";
import type { Hero } from "@/heroes/types/hero.interface";

const heroes: Hero[] = heroesData;

/* ---------------- INDEXES ---------------- */

export const heroesById = new Map<string, Hero>();
export const heroesBySlug = new Map<string, Hero>();

heroes.forEach((hero) => {
	heroesById.set(hero.id, hero);
	heroesBySlug.set(hero.slug, hero);
});
