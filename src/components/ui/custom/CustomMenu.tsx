import { Link, useLocation } from "react-router";
import {
	NavigationMenu,
	NavigationMenuList,
	// navigationMenuTriggerStyle,
} from "../navigation-menu";
import { cn } from "@/lib/utils";
import {
	NavigationMenuItem,
	NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";

export const CustomMenu = () => {
	const { pathname } = useLocation();

	const isActive = (path: string) => {
		return pathname === path;
	};

	return (
		<NavigationMenu className="py-5">
			<NavigationMenuList className="flex justify-start">
				{/* Home */}
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						className={cn(
							isActive("/") && "text-blue-700 cursor-default",
							"p-2 px-4",
						)}
					>
						<Link className="button" to="/">
							Inicio
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>

				{/* Search */}
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						className={cn(
							isActive("/search") && "text-blue-700 cursor-default",
							"p-2 px-4",
						)}
					>
						{/* <div className="button text-center"> */}
						<Link className="button" to="/search">
							Buscar Superheroes
						</Link>
						{/* </div> */}
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};
