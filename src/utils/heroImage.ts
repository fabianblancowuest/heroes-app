const HERO_IMAGE_BASE = "/images";

export const getHeroImage = (image?: string) => {
	if (!image) return `${HERO_IMAGE_BASE}/placeholder.webp`;

	return `${HERO_IMAGE_BASE}/${image}`;
};

export const getHeroImages = (hero: any) => {
	return {
		...hero,
		image: getHeroImage(hero.image),
		image2: getHeroImage(hero.image2),
	};
};
