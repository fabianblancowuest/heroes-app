import { useEffect } from "react";
import { getTeamsObject } from "../actions/get-all-teams.action";

export const TeamsConsole = () => {
	useEffect(() => {
		const fetchTeams = async () => {
			const teams = await getTeamsObject();
			console.log("Equipos y miembros:", teams);

			// Si querés ver solo los nombres de los equipos
			console.log("Lista de equipos:", Object.keys(teams));
		};

		fetchTeams();
	}, []);

	return null; // No renderizamos nada, solo queremos la consola
};
