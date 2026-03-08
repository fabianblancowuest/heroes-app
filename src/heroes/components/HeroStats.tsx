import { use } from "react";
import { Users, Heart, Zap, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HeroStatCard } from "./HeroStatCard";
import { useHeroSummary } from "../hooks/useHeroSummary";
import { FavoriteHeroContext } from "../context/FavoriteHeroContext";
import "@/index.css";

export const HeroStats = () => {
	const { data: summary } = useHeroSummary();

	const { favoriteCount } = use(FavoriteHeroContext);

	if (!summary) {
		return <div>Cargando...</div>;
	}

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
			<HeroStatCard
				title="Total de personajes"
				icon={<Users className="h-4 w-4 text-muted-foreground" />}
			>
				<div className="text-2xl font-bold">{summary?.totalHeroes}</div>
				<div className="flex gap-1 mt-2 badge-mobile">
					<Badge
						variant="secondary"
						className="text-xs bg-green-600 text-white"
					>
						{summary?.heroCount} Héroes
					</Badge>
					<Badge variant="destructive" className="text-xs">
						{summary?.villainCount} Villanos
					</Badge>
				</div>
				<div className="flex gap-1 mt-2 badge-mobile">
					<Badge
						variant="secondary"
						className="text-xs bg-purple-600 text-white"
					>
						{summary?.antiheroCount} Antihéroes
					</Badge>
					<Badge variant="secondary" className="text-xs bg-gray-500 text-white">
						{summary?.civilianCount} Civiles
					</Badge>
				</div>
			</HeroStatCard>

			<HeroStatCard
				title={"Favoritos"}
				icon={<Heart className="h-4 w-4 text-muted-foreground" />}
			>
				{/* TODO: tenemos que calcular este valor */}
				<div className="text-2xl font-bold text-red-600">{favoriteCount}</div>
				<p className="text-xs text-muted-foreground">
					{((favoriteCount / summary?.totalHeroes) * 100).toFixed(2)}% del total
				</p>
			</HeroStatCard>
			<HeroStatCard
				title={"Los más fuertes"}
				icon={<Zap className="h-4 w-4 text-muted-foreground" />}
			>
				{summary?.strongestHeroes.slice(0, 5).map((hero) => (
					<p className="text-md font-semibold">{hero.alias}</p>
				))}
				{/* <div className="text-lg font-bold"></div> */}
				<p className="text-xs text-muted-foreground">Fuerza: 10/10</p>
			</HeroStatCard>
			<HeroStatCard
				title={"Los más inteligentes"}
				icon={<Lightbulb className="h-4 w-4 text-muted-foreground" />}
			>
				{summary?.smartestHeroes.slice(0, 5).map((hero) => (
					<p className="text-md font-semibold">{hero.alias}</p>
				))}
				<div className="text-lg font-bold "></div>
				<p className="text-xs text-muted-foreground">Inteligencia: 10/10</p>
			</HeroStatCard>
		</div>
	);
};
