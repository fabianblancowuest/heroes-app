import type { Hero } from "./hero.interface";

export interface SummaryInformationResponse {
	totalHeroes: number;
	strongestHeroes: Hero[];
	smartestHeroes: Hero[];
	heroCount: number;
	villainCount: number;
	antiheroCount: number;
	civilianCount: number;
}
