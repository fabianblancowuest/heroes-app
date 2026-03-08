export const getTeamMessage = (team: string) => {
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
};
