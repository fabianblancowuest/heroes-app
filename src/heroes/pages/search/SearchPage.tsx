import { CustomJumbotron } from "@/components/ui/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/ui/custom/CustomBreadcrumbs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";

export const SearchPage = () => {
	const [searchParams] = useSearchParams();

	const name = searchParams.get("name") ?? undefined;
	const strength = searchParams.get("strength") ?? undefined;
	const speed = searchParams.get("speed") ?? undefined;
	const durability = searchParams.get("durability") ?? undefined;
	const intelligence = searchParams.get("intelligence") ?? undefined;

	// TODO: useQuery
	const { data: heroes = [] } = useQuery({
		queryKey: ["search", { name, strength, durability, intelligence, speed }],
		queryFn: () =>
			searchHeroesAction({ name, strength, durability, intelligence, speed }),
		staleTime: 1000 * 60 * 5, // 5 minutos
	});

	return (
		<>
			<CustomJumbotron
				title="Búsqueda de Superhéroes"
				description="Descubre, explora y administra tus superhéroes y villanos favoritos"
			/>
			<CustomBreadcrumbs
				currentPage="Buscador de héroes"
				// breadcrumbs={[
				// 	{ label: "Home1", to: "/" },
				// 	{ label: "Home2", to: "/" },
				// 	{ label: "Home3", to: "/" },
				// ]}
			/>
			{/* Stats Dashboard */}
			<HeroStats />

			{/* Filter and search */}
			<SearchControls />

			{/* Hero Screen */}
			<HeroGrid heroes={heroes} />
		</>
	);
};

export default SearchPage;
