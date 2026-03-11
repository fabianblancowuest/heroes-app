// import { heroesById, heroesBySlug } from "@/lib/heroesIndex.";

// export const useHero = (idOrSlug: string) => {
// 	const hero = heroesById.get(idOrSlug) ?? heroesBySlug.get(idOrSlug);

// 	if (!hero) return;

// 	return {
// 		...hero,
// 		image: `/images/${hero.image}`,
// 		image2: `/images/${hero.image2}`,
// 	};
// };

import { heroesById, heroesBySlug } from "@/lib/heroesIndex.";
import { getHeroImages } from "@/utils/heroImage";

export const useHero = (idOrSlug: string) => {
	const hero = heroesById.get(idOrSlug) ?? heroesBySlug.get(idOrSlug);

	if (!hero) return;

	return getHeroImages(hero);
};
