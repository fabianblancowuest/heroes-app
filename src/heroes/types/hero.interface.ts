export interface Biography {
	fullName: string;
	placeOfBirth: string;
	publisher: string;
	alignment: "good" | "bad" | "neutral";
	occupation: string;
	creators: string[];
	originStory: string;
	baseOfOperations: string;
}

export interface Appearance {
	gender: "Male" | "Female" | "None" | "Other";
	race: string;
	height: string;
	weight: string;
}

export interface Stats {
	intelligence: number;
	strength: number;
	speed: number;
	durability: number;
	power: number;
	combat: number;
}

export interface Connections {
	groupAffiliation: string[];
	relatives?: string[];
}

export interface Hero {
	id: string;
	name: string;
	slug: string;
	alias: string;
	biography: Biography;
	appearance: Appearance;
	stats: Stats;
	connections?: Connections;
	powers: string[];
	weapons: string[];
	weaknesses: string[];
	description: string;
	image: string;
	image2: string;
	firstAppearance: string;
	firstAppearanceComic: string;
	status: "Active" | "Deceased";
	category: "Hero" | "Villain" | "Antihero" | "Civilian";
	universe: "Marvel" | "DC";
}
