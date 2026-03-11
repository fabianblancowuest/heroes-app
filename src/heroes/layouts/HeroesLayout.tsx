import { CustomMenu } from "@/components/ui/custom/CustomMenu";
import { Outlet, ScrollRestoration } from "react-router";
import { Toaster } from "sonner";

export const HeroesLayout = () => {
	return (
		<div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-purple-50">
			<div className="max-w-7xl mx-auto p-1">
				<CustomMenu />
				<Toaster />
				<Outlet />
			</div>

			{/* Para que el scroll siempre vaya arriba */}
			<ScrollRestoration />
		</div>
	);
};
