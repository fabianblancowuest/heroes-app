import { use, useMemo } from "react";
import { useSearchParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomPagination } from "../../../components/ui/custom/CustomPagination";
import { CustomJumbotron } from "@/components/ui/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomBreadcrumbs } from "@/components/ui/custom/CustomBreadcrumbs";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext";
import "@/index.css";

export const HomePage = () => {
	// TODO: para más adelante hacer un custom hook useHomePage o useQueryParameters para reducir lógica del componente
	const [searchParams, setSearchParams] = useSearchParams();

	const activeTab = searchParams.get("tab") ?? "all";
	const page = searchParams.get("page") ?? "1";
	const limit = searchParams.get("limit") ?? "6";
	const category = searchParams.get("category") ?? "all";

	const selectedTab = useMemo(() => {
		const validTabs = [
			"all",
			"favorites",
			"heroes",
			"villains",
			"antiheroes",
			"civilians",
		];

		return validTabs.includes(activeTab) ? activeTab : "all";
	}, [activeTab]);

	const handleSearchParams = (tabValue: string, category: string) => {
		setSearchParams((prev) => {
			prev.set("tab", tabValue);
			prev.set("category", category);
			prev.set("page", "1");
			return prev;
		});
	};

	const { data: HeroesResponse } = usePaginatedHero(page, limit, category);
	const { data: summary } = useHeroSummary();

	const { favoriteCount, favorites } = use(FavoriteHeroContext);

	return (
		<>
			<>
				{/* Header */}
				<CustomJumbotron
					title="Universo de SuperHéroes"
					description="Descubre, explora y administra superhéroes y villanos..."
				/>
				<CustomBreadcrumbs currentPage="Super Héroes" />

				{/* Stats Dashboard */}
				<HeroStats />

				{/* Tabs */}
				<Tabs value={selectedTab} className="mb-8">
					<TabsList className="grid w-full grid-cols-4 flexible">
						<TabsTrigger
							value="all"
							onClick={() => handleSearchParams("all", "all")}
						>
							Todos los personajes ({summary?.totalHeroes})
						</TabsTrigger>
						<TabsTrigger
							onClick={() => handleSearchParams("favorites", "favorite")}
							value="favorites"
							className="flex items-center gap-2"
						>
							Favorites ({favoriteCount})
						</TabsTrigger>
						<TabsTrigger
							onClick={() => handleSearchParams("heroes", "hero")}
							value="heroes"
						>
							Héroes ({summary?.heroCount})
						</TabsTrigger>
						<TabsTrigger
							onClick={() => handleSearchParams("villains", "villain")}
							value="villains"
						>
							Villanos ({summary?.villainCount})
						</TabsTrigger>
						<TabsTrigger
							onClick={() => handleSearchParams("antiheroes", "antihero")}
							value="antiheroes"
						>
							Antihéroes ({summary?.antiheroCount})
						</TabsTrigger>
						<TabsTrigger
							onClick={() => handleSearchParams("civilians", "civilian")}
							value="civilians"
						>
							Civiles ({summary?.civilianCount})
						</TabsTrigger>
					</TabsList>

					<TabsContent value="all">
						{/* Mostrar todos los personajes */}
						<HeroGrid heroes={HeroesResponse?.heroes ?? []} />
					</TabsContent>
					<TabsContent value="favorites">
						{/* Mostrar todos los personajes favoritos */}
						<HeroGrid heroes={favorites ?? []} />
						{/* <HeroGrid heroes={HeroesResponse?.heroes ?? []} /> */}
					</TabsContent>
					<TabsContent value="heroes">
						{/* Mostrar todos los héroes */}
						<HeroGrid heroes={HeroesResponse?.heroes ?? []} />
					</TabsContent>
					<TabsContent value="villains">
						{/* Mostrar todos los villanos */}
						<HeroGrid heroes={HeroesResponse?.heroes ?? []} />
					</TabsContent>
					<TabsContent value="antiheroes">
						{/* Mostrar todos los antihéroes */}
						<HeroGrid heroes={HeroesResponse?.heroes ?? []} />
					</TabsContent>
					<TabsContent value="civilians">
						{/* Mostrar todos los civiles */}
						<HeroGrid heroes={HeroesResponse?.heroes ?? []} />
					</TabsContent>
				</Tabs>

				{/* Pagination */}
				{selectedTab !== "favorites" && (
					<CustomPagination totalPages={HeroesResponse?.pages ?? 1} />
				)}
			</>
		</>
	);
};
