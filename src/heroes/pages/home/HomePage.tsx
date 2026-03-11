import { use, useEffect, useMemo, useRef } from "react";
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
import { clearCacheOnce } from "@/utils/clearCacheOnce";

export const HomePage = () => {
	clearCacheOnce();
	// TODO: para más adelante hacer un custom hook useHomePage o useQueryParameters para reducir lógica del componente
	const [searchParams, setSearchParams] = useSearchParams();
	const contentRef = useRef<HTMLDivElement | null>(null);

	const activeTab = searchParams.get("tab") ?? "all";
	const page = searchParams.get("page") ?? "1";
	const limit = searchParams.get("limit") ?? "6";
	const category = searchParams.get("category") ?? "all";

	useEffect(() => {
		contentRef.current?.scrollIntoView({
			behavior: "instant",
			block: "start",
		});
	}, [activeTab, page, category]);

	// useEffect(() => {
	// 	const grid = document.querySelector("#hero-grid");

	// 	if (!grid) return;

	// 	const y = grid.getBoundingClientRect().top + window.scrollY - 20;

	// 	window.scrollTo({
	// 		top: y,
	// 		behavior: "instant",
	// 	});
	// }, [activeTab, page, category]);

	// useEffect(() => {
	// 	const offset = 600; // altura total de Jumbotron + Breadcrumbs + Stats

	// 	window.scrollTo({
	// 		top: offset,
	// 		behavior: "instant",
	// 	});
	// }, [activeTab, page, category]);

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

	console.log(HeroesResponse?.heroes);

	return (
		<>
			<>
				{/* Header */}
				<CustomJumbotron
					title="Universo de Superhéroes"
					description="Descubre, explora y administra superhéroes y villanos..."
				/>
				<CustomBreadcrumbs currentPage="Superhéroes" />
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
					<div ref={contentRef}>
						<TabsContent value="all">
							{/* Mostrar todos los personajes */}
							<div id="hero-grid">
								<HeroGrid heroes={HeroesResponse?.heroes ?? []} />
							</div>
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
					</div>
				</Tabs>

				{/* Pagination */}
				{selectedTab !== "favorites" && (
					<CustomPagination totalPages={HeroesResponse?.pages ?? 1} />
				)}
			</>
		</>
	);
};
