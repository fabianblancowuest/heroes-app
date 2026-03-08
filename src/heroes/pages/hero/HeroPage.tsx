import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Shield,
	Zap,
	Brain,
	Gauge,
	Users,
	Star,
	Award,
	Swords,
	Crosshair,
} from "lucide-react";
import { getHeroAction } from "../../actions/get-hero.action";
import { Navigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import "@/index.css";
import { CircularProgress } from "@/components/ui/circular-progress";
import { LinearProgressSVG } from "@/components/ui/linear-progress";

export const HeroPage = () => {
	// Animación barras circulares de habilidades

	const { idSlug = "" } = useParams();

	const { data: hero, isError } = useQuery({
		queryKey: ["heroes", idSlug],
		queryFn: () => getHeroAction(idSlug),
		retry: false,
	});

	console.log({ isError });

	if (isError) {
		return <Navigate to="/" />;
	}

	if (!hero) {
		return <h3>Loading...</h3>;
	}

	const totalPower =
		hero.stats.strength +
		hero.stats.intelligence +
		hero.stats.speed +
		hero.stats.durability;
	const averagePower = Math.round((totalPower / 4) * 10);

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case "activo":
			case "active":
				return "bg-green-500";
			case "inactivo":
			case "inactive":
				return "bg-gray-500";
			case "retirado":
			case "retired":
				return "bg-blue-500";
			default:
				return "bg-gray-500";
		}
	};

	const getCategoryColor = (category: string) => {
		switch (category.toLowerCase()) {
			case "héroe":
			case "hero":
				return "bg-blue-500";
			case "villano":
			case "villain":
				return "bg-red-500";
			case "antihéroe":
			case "antihero":
				return "bg-purple-500";
			default:
				return "bg-gray-500";
		}
	};

	function getTeamMessage(team: string) {
		team = team.toLowerCase();
		if (team === "liga de la justicia" || "justice league") {
			return "Los mayores héroes del mundo unidos para proteger el planeta Tierra.";
		} else if (team === "vengadores" || team === "avengers") {
			return "Los héroes más poderosos de la Tierra.";
		} else if (team === "x-men") {
			return "Mutantes luchando por un mundo que los teme y los odia.";
		} else if (team === "sociedad de justicia de américa") {
			return "Donde comenzó el legado de la justicia.";
		} else if (team === "linternas verdes") {
			return "Portadores de la voluntad que protege el universo.";
		} else if (team === "cuatro fantásticos" || team === "fantastic four") {
			return "Exploradores de lo imposible.";
		} else if (team === "solo" || team === "loner") {
			return "No necesita un equipo para cambiar el destino.";
		} else if (team === "suicide squad") {
			return "Los peores criminales del mundo… haciendo el trabajo sucio.";
		} else if (team === "gotham city sirens") {
			return "Las reinas del caos que dominan las sombras de Gotham.";
		} else if (team === "midnight sons") {
			return "Guerreros de la oscuridad enfrentando horrores del inframundo.";
		} else if (team === "brotherhood of mutants") {
			return "Donde los X-Men buscan paz, ellos buscan supremacía.";
		} else if (team === "guardians of the galaxy") {
			return "Forajidos improbables salvando el universo.";
		} else if (team === "teen titans") {
			return "La nueva generación de héroes";
		} else if (team == "sinister six") {
			return "Seis villanos unidos para destruir a Spider-Man.";
		} else if (team === "cosmic entity") {
			return "Seres cuya existencia trasciende planetas, galaxias y el tiempo mismo.";
		} else if (team == "daily planet") {
			return "La voz de Metropolis, donde la verdad siempre encuentra su camino.";
		} else if (team === "parker family") {
			return "Miembro transcendente en la vida de Spiderman.";
		} else {
			return "nada";
		}
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header Banner */}
			<div className="bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
				<div className="max-w-7xl mx-auto px-6 py-12">
					<div className="flex flex-col md:flex-row items-center gap-8">
						<div className="relative">
							<img
								src={hero.image || "/placeholder.svg"}
								alt={hero.alias}
								width={200}
								height={200}
								className="rounded-full border-4 border-white/20 shadow-2xl"
							/>
							<div className="absolute -top-2 -right-2">
								<div className="bg-yellow-400 text-black rounded-full p-2">
									<Star className="w-6 h-6" />
								</div>
							</div>
						</div>

						<div className="flex-1 text-center md:text-left">
							<div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
								<Badge
									className={`${getCategoryColor(hero.category)} text-white`}
								>
									{hero.category}
								</Badge>
								<Badge className={`${getStatusColor(hero.status)} text-white`}>
									{hero.status}
								</Badge>
								<Badge
									variant="secondary"
									className="bg-white/20 text-white border-white/30"
								>
									{hero.universe}
								</Badge>
							</div>

							<h1 className="text-4xl md:text-6xl font-bold mb-2">
								{hero.alias}
							</h1>
							<p className="text-xl text-blue-200 mb-4">{hero.name}</p>
							<p className="text-lg text-gray-300 max-w-2xl">
								{hero.description} {hero.biography.originStory}
							</p>
						</div>

						<div className="text-center">
							<div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
								<div className="text-2xl font-bold text-yellow-400">
									{averagePower}%
								</div>
								<div className="text-sm text-gray-300">Nivel de Poder</div>
								<div className="flex justify-center mt-2">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className={`w-4 h-4 ${i < Math.floor(averagePower / 20) ? "text-yellow-400 fill-current" : "text-gray-400"}`}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto py-8">
				<Tabs defaultValue="info" className="w-full">
					<TabsList className="grid w-full grid-cols-4 mb-8 flexible">
						<TabsTrigger value="info" className="flex items-center gap-2">
							<Award className="w-4 h-4" />
							Información
						</TabsTrigger>
						<TabsTrigger value="powers" className="flex items-center gap-2">
							<Zap className="w-4 h-4" />
							Poderes
						</TabsTrigger>
						<TabsTrigger value="weapons" className="flex items-center gap-2">
							<Crosshair className="w-4 h-4" />
							Armas
						</TabsTrigger>
						<TabsTrigger value="team" className="flex items-center gap-2">
							<Users className="w-4 h-4" />
							Equipo
						</TabsTrigger>
						<TabsTrigger value="stats" className="flex items-center gap-2">
							<Gauge className="w-4 h-4" />
							Estadísticas
						</TabsTrigger>
					</TabsList>

					<TabsContent value="stats" className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(220px,auto))] justify-between gap-4">
							{/* Strength */}
							<Card className="text-center">
								<CardContent className="pt-6">
									<div className="flex justify-center mb-4">
										<div className="bg-red-100 p-3 rounded-full">
											<Zap className="w-8 h-8 text-orange-700" />
										</div>
									</div>
									<h3 className="font-semibold text-m mb-2">Fuerza</h3>
									{/* <div className="text-2xl font-bold text-orange-700 mb-2">
										{hero.strength}
									</div> */}
									{/* <Progress
										value={hero.strength * 10}
										className="h-2 mobile-progress"
										activeColor="bg-orange-700"
									/> */}
									<CircularProgress
										value={hero.stats.strength * 10}
										stroke={12}
										size={100}
										color="text-red-700"
										textColor="text-orange-700"
										textSize="text-xl"
									/>
								</CardContent>
							</Card>

							{/* Intelligence */}
							<Card className="text-center">
								<CardContent className="pt-6">
									<div className="flex justify-center mb-4">
										<div className="bg-purple-100 p-3 rounded-full">
											<Brain className="w-8 h-8 text-blue-700" />
										</div>
									</div>
									<h3 className="font-semibold text-m mb-2">Inteligencia</h3>
									{/* <div className="text-2xl font-bold text-blue-700 mb-2">
										{hero.intelligence}
									</div> */}
									{/* <Progress
										value={hero.intelligence * 10}
										className="h-2 mobile-progress"
										activeColor="bg-blue-700"
									/> */}
									<CircularProgress
										value={hero.stats.intelligence * 10}
										stroke={12}
										size={100}
										color="text-blue-700"
										textColor="text-blue-700"
										textSize="text-xl"
									/>
								</CardContent>
							</Card>

							{/* Speed */}
							<Card className="text-center">
								<CardContent className="pt-6">
									<div className="flex justify-center mb-4">
										<div className="bg-yellow-100 p-3 rounded-full">
											<Gauge className="w-8 h-8 text-green-700" />
										</div>
									</div>
									<h3 className="font-semibold text-m mb-2">Velocidad</h3>
									{/* <div className="text-2xl font-bold text-green-700 mb-2">
										{hero.speed}
									</div>
									<Progress
										value={hero.speed * 10}
										className="h-2 mobile-progress"
										activeColor="bg-green-700"
									/> */}
									<CircularProgress
										value={hero.stats.speed * 10}
										stroke={12}
										size={100}
										color="text-green-700"
										textColor="text-green-700"
										textSize="text-xl"
									/>
								</CardContent>
							</Card>

							{/* Durability */}
							<Card className="text-center">
								<CardContent className="pt-6">
									<div className="flex justify-center mb-4">
										<div className="bg-purple-100 p-3 rounded-full">
											<Shield className="w-8 h-8 text-purple-700" />
										</div>
									</div>
									<h3 className="font-semibold text-m mb-2">Resistencia</h3>
									{/* <div className="text-2xl font-bold text-purple-700 mb-2">
										{hero.durability}
									</div> */}
									{/* <Progress
										value={hero.durability * 10}
										className="h-2 mobile-progress"
										activeColor="bg-purple-700"
									/> */}
									<CircularProgress
										value={hero.stats.speed * 10}
										stroke={12}
										size={100}
										color="text-purple-700"
										textColor="text-purple-700"
										textSize="text-xl"
									/>
								</CardContent>
							</Card>
							{/*Combate */}
							<Card className="text-center">
								<CardContent className="pt-6">
									<div className="flex justify-center mb-4">
										<div className="bg-red-100 p-3 rounded-full">
											<Swords className="w-8 h-8 text-red-700" />
										</div>
									</div>
									<h3 className="font-semibold text-m mb-2">Combate</h3>
									{/* <div className="text-2xl font-bold text-purple-700 mb-2">
										{hero.durability}
									</div> */}
									{/* <Progress
										value={hero.durability * 10}
										className="h-2 mobile-progress"
										activeColor="bg-purple-700"
									/> */}
									<CircularProgress
										value={hero.stats.combat * 10}
										stroke={12}
										size={100}
										color="text-red-700"
										textColor="text-red-700"
										textSize="text-xl"
									/>
								</CardContent>
							</Card>
						</div>

						{/* Power Comparison Chart */}
						<Card>
							<CardHeader>
								<CardTitle className="text-center">
									Comparación de Habilidades
								</CardTitle>
								<div className="mobile-on">
									<section>
										<div>
											<span>Fuerza</span> <div className="box bg-red-700"></div>
										</div>
										<div>
											<span>Inteligencia</span>{" "}
											<div className="box bg-blue-700"></div>
										</div>
									</section>
									{/*TODO: Separar */}
									<section>
										<div>
											<span>Velocidad</span>
											<div className="box bg-green-700"></div>
										</div>
										<div>
											<span>Durabilidad</span>
											<div className="box bg-purple-700"></div>
										</div>
									</section>
								</div>
							</CardHeader>
							<CardContent>
								<div
									style={{
										alignItems: "center",
										maxWidth: 850,
										marginLeft: "auto",
										marginRight: "auto",
									}}
									className="space-y-4 "
								>
									<div className="flex items-center gap-4">
										<div className="w-24 text-sm font-medium no-mobile">
											Fuerza
										</div>
										<div className="flex-1">
											{/* <AnimatedProgress
												value={hero.strength * 10}
												className="h-3"
												activeColor="bg-orange-700"
											/> */}
											<LinearProgressSVG
												value={hero.stats.strength * 10}
												barClass="text-orange-700"
												delay={0}
											/>
										</div>
										<div className="w-12 text-right font-medium">
											{hero.stats.strength}/10
										</div>
									</div>
									<div className="flex items-center gap-4">
										<div className="w-24 text-sm font-medium no-mobile">
											Inteligencia
										</div>
										<div className="flex-1">
											{/* <AnimatedProgress
												value={hero.intelligence * 10}
												className="h-3"
												activeColor="bg-blue-700"
											/> */}
											<LinearProgressSVG
												value={hero.stats.intelligence * 10}
												barClass="text-blue-700"
												delay={0}
											/>
										</div>
										<div className="w-12 text-right font-medium">
											{hero.stats.intelligence}/10
										</div>
									</div>
									<div className="flex items-center gap-4">
										<div className="w-24 text-sm font-medium no-mobile">
											Velocidad
										</div>
										<div className="flex-1">
											{/* <AnimatedProgress
												value={hero.speed * 10}
												className="h-3"
												activeColor="bg-green-700"
											/> */}
											<LinearProgressSVG
												value={hero.stats.speed * 10}
												barClass="text-green-700"
												delay={0}
											/>
										</div>
										<div className="w-12 text-right font-medium">
											{hero.stats.speed}/10
										</div>
									</div>
									<div className="flex items-center gap-4">
										<div className="w-24 text-sm font-medium no-mobile">
											Resistencia
										</div>
										<div className="flex-1">
											{/* <AnimatedProgress
												value={hero.durability * 10}
												className="h-3"
												activeColor="bg-purple-700"
											/> */}
											<LinearProgressSVG
												value={hero.stats.durability * 10}
												barClass="text-purple-700"
												delay={0}
											/>
										</div>
										<div className="w-12 text-right font-medium">
											{hero.stats.durability}/10
										</div>
									</div>
									<div className="flex items-center gap-4">
										<div className="w-24 text-sm font-medium no-mobile">
											Combate
										</div>
										<div className="flex-1">
											{/* <AnimatedProgress
												value={hero.strength * 10}
												className="h-3"
												activeColor="bg-orange-700"
											/> */}
											<LinearProgressSVG
												value={hero.stats.combat * 10}
												barClass="text-red-700"
												delay={0}
											/>
										</div>
										<div className="w-12 text-right font-medium">
											{hero.stats.combat}/10
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Armas */}
					<TabsContent value="weapons">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Crosshair className="w-6 h-6 text-yellow-500" />
									Armas
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
									{hero.weapons.map((power, index) => (
										<div
											key={index}
											className="bg-linear-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200"
										>
											<div className="flex items-center gap-3">
												<div className="bg-blue-500 p-2 rounded-full">
													<Crosshair className="w-4 h-4 text-white" />
												</div>
												<span className="font-medium text-blue-900">
													{power}
												</span>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>
					{/* Poderes */}
					<TabsContent value="powers">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Zap className="w-6 h-6 text-yellow-500" />
									Superpoderes
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
									{hero.powers.map((power, index) => (
										<div
											key={index}
											className="bg-linear-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200"
										>
											<div className="flex items-center gap-3">
												<div className="bg-blue-500 p-2 rounded-full">
													<Zap className="w-4 h-4 text-white" />
												</div>
												<span className="font-medium text-blue-900">
													{power}
												</span>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="team">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Users className="w-6 h-6 text-green-500" />
									Afiliación de Equipo
								</CardTitle>
							</CardHeader>
							<div className="flex justify-evenly">
								{hero.connections.groupAffiliation.map((team) => (
									<CardContent>
										<div className="text-center py-8">
											<div className="bg-green-100 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
												<Users className="w-12 h-12 text-green-700" />
											</div>
											<h3 className="text-2xl font-bold text-green-700 mb-2">
												<div key={team}>{team}</div>
											</h3>
											<p className="text-gray-700">
												{hero.connections.groupAffiliation.find((item) => {
													if (item === team) {
														getTeamMessage(team);
													}
												})}
											</p>
											{/* <p className="text-gray-700">
										Miembro activo del equipo de superhéroes más poderoso
										</p> */}
										</div>
									</CardContent>
								))}
							</div>
						</Card>
					</TabsContent>

					<TabsContent value="info">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Card>
								<CardHeader>
									<CardTitle>Detalles Personales</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex justify-between items-center py-2 border-b">
										<span className="text-gray-700">Nombre Real:</span>
										<span className="font-semibold">{hero.name}</span>
									</div>
									<div className="flex justify-between items-center py-2 border-b">
										<span className="text-gray-700">Alias:</span>
										<span className="font-semibold">{hero.alias}</span>
									</div>
									<div className="flex justify-between items-center py-2 border-b">
										<span className="text-gray-700">Nombre Completo:</span>
										<span className="font-semibold">
											{hero.biography.fullName}
										</span>
									</div>
									<div className="flex justify-between items-center py-2 border-b">
										<span className="text-gray-700">Lugar de Nacimiento:</span>
										<span className="font-semibold">
											{hero.biography.placeOfBirth}
										</span>
									</div>
									<div className="flex justify-between items-center py-2 border-b">
										<span className="text-gray-700">Alineamiento:</span>
										<span className="font-semibold">
											{hero.biography.alignment === "good" ? "Bueno" : "Malo"}
										</span>
									</div>
									{/* Sexo */}
									<div className="flex justify-between items-center py-2 border-b">
										<span className="text-gray-700">Género:</span>
										<span className="font-semibold">
											{hero.appearance.gender === "Female"
												? "Femenino"
												: hero.appearance.gender === "Male"
													? "Masculino"
													: hero.appearance.gender === "None"
														? "Ninguno"
														: "Otro"}
										</span>
									</div>

									<div className="flex justify-between items-center py-2 border-b">
										<span className="text-gray-700">Ocupación:</span>
										<span className="font-semibold">
											{hero.biography.occupation}
										</span>
									</div>
									<div className="flex justify-between items-center py-2 border-b">
										<span className="text-gray-700">Altura:</span>
										<span className="font-semibold">
											{hero.appearance.height}
										</span>
									</div>
									<div className="flex justify-between items-center py-2 border-b">
										<span className="text-gray-700">Peso:</span>
										<span className="font-semibold">
											{hero.appearance.weight}
										</span>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Información del Universo</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex justify-between items-center py-2 border-b">
										<span className="text-gray-700">Categoría:</span>
										<Badge
											className={`${getCategoryColor(hero.category)} text-sm text-white`}
										>
											{hero.category === "Hero"
												? "Héroe"
												: hero.category === "Antihero"
													? "Antihéroe"
													: hero.category === "Villain"
														? "Villano"
														: hero.category === "Civilian"
															? "Civl"
															: hero.category}
										</Badge>
									</div>
									<div className="flex justify-between items-center py-2">
										<span className="text-gray-700">Estado:</span>
										<Badge
											className={`${getStatusColor(hero.status)} text-sm text-white`}
										>
											{hero.status === "Active" ? "Activo" : "Fallecido"}
										</Badge>
									</div>
									<div className="flex justify-between items-center py-2 border-b">
										<span className="text-gray-700">Universo:</span>
										<span className="font-semibold">{hero.universe}</span>
									</div>
									<div className="flex justify-between items-center py-2 border-b">
										<span className="text-gray-700">Primera Aparición:</span>
										<span className="font-semibold">
											{hero.firstAppearance}
										</span>
									</div>
									<div className="flex justify-between items-center py-2 border-b">
										<span className="text-gray-700">
											Primera Publicación en Comic:
										</span>
										<span className="font-semibold">
											{hero.firstAppearanceComic}
										</span>
									</div>
									<div className="flex justify-between items-center py-2 border-b">
										<span className="text-gray-700">Creadores:</span>
										<span className="font-semibold">
											{hero.biography.creators.join(" / ")}
										</span>
									</div>
									<div className="flex justify-between items-center py-2 border-b">
										<span className="text-gray-700">Base de Operaciones:</span>
										<span className="font-semibold">
											{hero.biography.baseOfOperations}
										</span>
									</div>
									{/* Raza */}
									<div className="flex justify-between items-center py-2 border-b">
										<span className="text-gray-700">Raza:</span>
										<span className="font-semibold">
											{hero.appearance.race}
										</span>
									</div>
									<div className="flex justify-between items-center py-2">
										<span className="text-gray-700">Años Activo:</span>
										<span className="font-semibold">
											{new Date().getFullYear() -
												Number.parseInt(hero.firstAppearance)}{" "}
											años
										</span>
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};
