export const getStatusColor = (status: string) => {
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

export const getCategoryColor = (category: string) => {
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
