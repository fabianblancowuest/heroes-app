import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Trash2 } from "lucide-react";
import { useRef } from "react";
import { Slider } from "@/components/ui/slider";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
} from "@/components/ui/accordion";
import "@/index.css";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export const SearchControls = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const inputRef = useRef<HTMLInputElement | null>(null);

	const activeAccordion = searchParams.get("active-accordion") ?? "";

	const selectedStrength = Number(searchParams.get("strength") ?? "0");
	const selectedSpeed = Number(searchParams.get("speed") ?? "0");
	const selectedDurability = Number(searchParams.get("durability") ?? "0");
	const selectedIntelligence = Number(searchParams.get("intelligence") ?? "0");

	const selectedTeam = searchParams.get("team") ?? "all";
	const selectedCategory = searchParams.get("category") ?? "all";
	const selectedUniverse = searchParams.get("universe") ?? "all";
	const selectedStatus = searchParams.get("status") ?? "all";

	const setQueryParams = (name: string, value: string) => {
		setSearchParams((prev) => {
			const params = new URLSearchParams(prev);

			if (value === "" || value === "all") {
				params.delete(name);
			} else {
				params.set(name, value);
			}

			return params;
		});
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			const value = inputRef.current?.value ?? "";
			setQueryParams("name", value);
		}
	};

	const cleanInputRef = () => {
		if (inputRef.current) {
			inputRef.current.value = "";
		}
	};

	return (
		<>
			<div className="flex flex-col lg:flex-row gap-4 mb-8">
				{/* Search */}
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
					<Input
						ref={inputRef}
						placeholder="Buscar héroes, villanos, antihéroes, equipos..."
						className="pl-12 h-12 text-lg bg-white input"
						onKeyDown={handleKeyDown}
						defaultValue={searchParams.get("name") ?? ""}
					/>
				</div>

				{/* Action buttons */}
				<div className="flex gap-2 filters">
					<Button
						className="h-12"
						variant="outline"
						onClick={() =>
							setQueryParams("name", inputRef.current?.value ?? "")
						}
					>
						<Search />
						Buscar
					</Button>

					<Button
						className="h-12"
						variant="outline"
						onClick={() => {
							setSearchParams(new URLSearchParams());
							cleanInputRef();
						}}
					>
						<Trash2 />
						Limpiar Todo
					</Button>

					<Button
						variant={
							activeAccordion === "advanced-filters" ? "default" : "outline"
						}
						className="h-12"
						onClick={() => {
							if (activeAccordion === "advanced-filters") {
								setQueryParams("active-accordion", "");
								return;
							}

							setQueryParams("active-accordion", "advanced-filters");
						}}
					>
						<Filter className="h-4 w-4 mr-2" />
						Filtros
					</Button>
				</div>
			</div>

			{/* Advanced Filters */}
			<Accordion type="single" collapsible value={activeAccordion}>
				<AccordionItem value="advanced-filters" className="advanced-filters">
					<AccordionContent>
						<div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-lg font-semibold">Filtros Avanzados</h3>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
								{/* Teams */}
								<div className="space-y-2 flex flex-col gap-0.5 justify-center">
									<label className="text-sm font-medium">Equipos</label>

									<Select
										value={selectedTeam}
										onValueChange={(value) => setQueryParams("team", value)}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Todos los equipos" />
										</SelectTrigger>

										<SelectContent>
											<SelectItem value="all">Todos los equipos</SelectItem>
											<SelectItem value="justice-league">
												Liga de la justicia
											</SelectItem>
											<SelectItem value="avengers">Vengadores</SelectItem>
											<SelectItem value="x-men">X-Men</SelectItem>
											<SelectItem value="fantastic-four">
												Cuatro Fantásticos
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								{/* Category */}
								<div className="space-y-2 flex flex-col gap-0.5 justify-center">
									<label className="text-sm font-medium">Categorías</label>

									<Select
										value={selectedCategory}
										onValueChange={(value) => setQueryParams("category", value)}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Todas las categorías" />
										</SelectTrigger>

										<SelectContent>
											<SelectItem value="all">Todas las categorías</SelectItem>
											<SelectItem value="hero">Héroe</SelectItem>
											<SelectItem value="antihero">Antihéroe</SelectItem>
											<SelectItem value="villain">Villano</SelectItem>
											<SelectItem value="civilian">Civil</SelectItem>
										</SelectContent>
									</Select>
								</div>

								{/* Universe */}
								<div className="space-y-2 flex flex-col gap-0.5 justify-center">
									<label className="text-sm font-medium">Universo</label>

									<Select
										value={selectedUniverse}
										onValueChange={(value) => setQueryParams("universe", value)}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Todos los universos" />
										</SelectTrigger>

										<SelectContent>
											<SelectItem value="all">Todos los universos</SelectItem>
											<SelectItem value="marvel">Marvel</SelectItem>
											<SelectItem value="dc">DC</SelectItem>
										</SelectContent>
									</Select>
								</div>

								{/* Status */}
								<div className="space-y-2 flex flex-col gap-0.5 justify-center">
									<label className="text-sm font-medium">Estado</label>

									<Select
										value={selectedStatus}
										onValueChange={(value) => setQueryParams("status", value)}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Todos los estados" />
										</SelectTrigger>

										<SelectContent>
											<SelectItem value="all">Todos los estados</SelectItem>
											<SelectItem value="active">Activo</SelectItem>
											<SelectItem value="deceased">Deceased</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							{/* Strength */}
							<div className="mt-4">
								<label className="text-sm font-medium">
									Fuerza mínima: {selectedStrength}/10
								</label>

								<Slider
									className="mt-4 cursor-pointer"
									value={[selectedStrength]}
									onValueChange={(value) =>
										setQueryParams("strength", value[0].toString())
									}
									max={10}
									step={1}
								/>
							</div>

							{/* Intelligence */}
							<div className="mt-4">
								<label className="text-sm font-medium">
									Inteligencia mínima: {selectedIntelligence}/10
								</label>

								<Slider
									className="mt-4 cursor-pointer"
									value={[selectedIntelligence]}
									onValueChange={(value) =>
										setQueryParams("intelligence", value[0].toString())
									}
									max={10}
									step={1}
								/>
							</div>

							{/* Speed */}
							<div className="mt-4">
								<label className="text-sm font-medium">
									Velocidad mínima: {selectedSpeed}/10
								</label>

								<Slider
									className="mt-4 cursor-pointer"
									value={[selectedSpeed]}
									onValueChange={(value) =>
										setQueryParams("speed", value[0].toString())
									}
									max={10}
									step={1}
								/>
							</div>

							{/* Durability */}
							<div className="mt-4">
								<label className="text-sm font-medium">
									Durabilidad mínima: {selectedDurability}/10
								</label>

								<Slider
									className="mt-4 cursor-pointer"
									value={[selectedDurability]}
									onValueChange={(value) =>
										setQueryParams("durability", value[0].toString())
									}
									max={10}
									step={1}
								/>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	);
};
