interface Props {
	title: string;
	description?: string;
}

export const CustomJumbotron = ({ title, description }: Props) => {
	return (
		<header className="text-center mb-8">
			<h1
				style={{
					lineHeight: 1.3,
				}}
				className="text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
			>
				{title}
			</h1>
			{description && <p className="text-gray-600 text-lg">{description}</p>}
		</header>
	);
};
