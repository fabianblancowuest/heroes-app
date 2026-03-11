import { useEffect, useMemo, useRef, useContext } from "react";
import { useSearchParams } from "react-router";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomPagination } from "../../../components/ui/custom/CustomPagination";
import { CustomJumbotron } from "@/components/ui/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomBreadcrumbs } from "@/components/ui/custom/CustomBreadcrumbs";

import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { useHeroes } from "@/heroes/hooks/useHeroes";

import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext";

import { clearCacheOnce } from "@/utils/clearCacheOnce";

import "@/index.css";

export const HomePage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const contentRef = useRef<HTMLDivElement | null>(null);

	const activeTab = searchParams.get("tab") ?? "all";
	const page = Number(searchParams.get("page") ?? "1");
	const limit = Number(searchParams.get("limit") ?? "6");
	const category = searchParams.get("category") ?? "all";

	/* clear cache once */

	useEffect(() => {
		clearCacheOnce();
	}, []);

	/* scroll when pagination/tab changes */

	useEffect(() => {
		contentRef.current?.scrollIntoView({
			behavior: "instant",
			block: "start",
		});
	}, [activeTab, page, category]);

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
			const params = new URLSearchParams(prev);

			params.set("tab", tabValue);
			params.set("category", category);
			params.set("page", "1");

			return params;
		});
	};

	/* pagination */

	const offset = (page - 1) * limit;

	const { heroes, pages } = useHeroes({
		limit,
		offset,
		category,
	});

	/* stats */

	const { totalHeroes, heroCount, villainCount, antiheroCount, civilianCount } =
		useHeroSummary();

	/* favorites */

	const { favoriteCount, favorites } = useContext(FavoriteHeroContext);

	return (
		<>
			<CustomJumbotron
				title="Universo de Superhéroes"
				description="Descubre, explora y administra superhéroes y villanos..."
			/>

			<CustomBreadcrumbs currentPage="Superhéroes" />

			<HeroStats />

			<Tabs value={selectedTab} className="mb-8">
				<TabsList className="grid w-full grid-cols-4 flexible">
					<TabsTrigger
						value="all"
						onClick={() => handleSearchParams("all", "all")}
					>
						Todos los personajes ({totalHeroes})
					</TabsTrigger>

					<TabsTrigger
						value="favorites"
						onClick={() => handleSearchParams("favorites", "favorite")}
					>
						Favorites ({favoriteCount})
					</TabsTrigger>

					<TabsTrigger
						value="heroes"
						onClick={() => handleSearchParams("heroes", "hero")}
					>
						Héroes ({heroCount})
					</TabsTrigger>

					<TabsTrigger
						value="villains"
						onClick={() => handleSearchParams("villains", "villain")}
					>
						Villanos ({villainCount})
					</TabsTrigger>

					<TabsTrigger
						value="antiheroes"
						onClick={() => handleSearchParams("antiheroes", "antihero")}
					>
						Antihéroes ({antiheroCount})
					</TabsTrigger>

					<TabsTrigger
						value="civilians"
						onClick={() => handleSearchParams("civilians", "civilian")}
					>
						Civiles ({civilianCount})
					</TabsTrigger>
				</TabsList>

				<div ref={contentRef}>
					<TabsContent value="all">
						<HeroGrid heroes={heroes} />
					</TabsContent>

					<TabsContent value="favorites">
						<HeroGrid heroes={favorites} />
					</TabsContent>

					<TabsContent value="heroes">
						<HeroGrid heroes={heroes} />
					</TabsContent>

					<TabsContent value="villains">
						<HeroGrid heroes={heroes} />
					</TabsContent>

					<TabsContent value="antiheroes">
						<HeroGrid heroes={heroes} />
					</TabsContent>

					<TabsContent value="civilians">
						<HeroGrid heroes={heroes} />
					</TabsContent>
				</div>
			</Tabs>

			{selectedTab !== "favorites" && (
				<CustomPagination totalPages={pages ?? 1} />
			)}
		</>
	);
};
