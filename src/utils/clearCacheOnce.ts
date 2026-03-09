export const clearCacheOnce = () => {
	try {
		// Usamos un flag para que solo se ejecute una vez
		const cacheCleared = localStorage.getItem("cacheCleared_v1");

		if (!cacheCleared) {
			console.log("Limpiando caché...");

			// Limpiamos localStorage, sessionStorage y/o cookies
			localStorage.clear();
			sessionStorage.clear();

			// Para IndexedDB
			if (window.indexedDB) {
				const DBDeleteRequest = indexedDB.deleteDatabase("NombreDeTuDB");
				DBDeleteRequest.onsuccess = () => console.log("IndexedDB eliminada");
				DBDeleteRequest.onerror = () =>
					console.log("Error eliminando IndexedDB");
			}

			// Marcamos que ya se ejecutó
			localStorage.setItem("cacheCleared_v1", "true");
		} else {
			console.log("Cache ya limpiado en este dispositivo");
		}
	} catch (err) {
		console.error("Error limpiando caché:", err);
	}
};
