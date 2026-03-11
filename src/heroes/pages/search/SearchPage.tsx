import { CustomJumbotron } from "@/components/ui/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/ui/custom/CustomBreadcrumbs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";

export const SearchPage = () => {
	const [searchParams] = useSearchParams();

	// Filtros avanzados
	const name = searchParams.get("name") ?? undefined;
	const team = searchParams.get("team") ?? undefined;
	const category = searchParams.get("category") ?? undefined;
	const universe = searchParams.get("universe") ?? undefined;
	const status = searchParams.get("status") ?? undefined;

	// Stats como números
	const strength = searchParams.get("strength")
		? Number(searchParams.get("strength"))
		: undefined;
	const speed = searchParams.get("speed")
		? Number(searchParams.get("speed"))
		: undefined;
	const durability = searchParams.get("durability")
		? Number(searchParams.get("durability"))
		: undefined;
	const intelligence = searchParams.get("intelligence")
		? Number(searchParams.get("intelligence"))
		: undefined;
	const combat = searchParams.get("combat")
		? Number(searchParams.get("combat"))
		: undefined;

	// Limpiar filtros vacíos o "all"
	const filters = useMemo(() => {
		return Object.fromEntries(
			Object.entries({
				name,
				team,
				category,
				universe,
				status,
				strength,
				speed,
				durability,
				intelligence,
				combat,
			}).filter(
				([_, value]) => value !== undefined && value !== "" && value !== "all",
			),
		);
	}, [
		name,
		team,
		category,
		universe,
		status,
		strength,
		speed,
		durability,
		intelligence,
		combat,
	]);

	// Buscar héroes con React Query
	const { data: heroes = [], isFetching } = useQuery({
		queryKey: ["search", filters],
		queryFn: () => searchHeroesAction(filters),
		staleTime: 1000 * 60 * 5, // 5 minutos
		enabled: Object.keys(filters).length > 0,
	});

	useEffect(() => {
		if (!isFetching && Object.keys(filters).length > 0 && heroes.length === 0) {
			toast.warning("No se encontraron resultados");
		}
	}, [heroes, filters, isFetching]);

	return (
		<>
			<CustomJumbotron
				title="Búsqueda de Superhéroes"
				description="Descubre, explora y administra tus superhéroes y villanos favoritos"
			/>

			<CustomBreadcrumbs currentPage="Buscar superhéroes" />

			{/* Dashboard de stats */}
			<HeroStats />

			{/* Controles de búsqueda y filtros */}
			<SearchControls />

			{/* Grid de héroes */}
			<HeroGrid heroes={heroes} />
		</>
	);
};

export default SearchPage;
