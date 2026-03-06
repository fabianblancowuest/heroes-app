import { useEffect, useState } from "react";

export const CircularProgress = ({
	value = 10,
	size = 120,
	stroke = 10,
	color = "text-blue-500",
	textColor = "fill-gray-700",
	textSize = "text-lg",
}) => {
	const [progress, setProgress] = useState(0);

	const radius = (size - stroke) / 2;
	const circumference = 2 * Math.PI * radius;

	useEffect(() => {
		const timer = setTimeout(() => {
			setProgress(value);
		}, 100);

		return () => clearTimeout(timer);
	}, [value]);

	const offset = circumference - (progress / 100) * circumference;

	return (
		<div className={`flex items-center justify-center ${color}`}>
			<svg width={size} height={size}>
				{/* fondo */}
				<circle
					className="text-gray-200/40"
					stroke="currentColor"
					fill="transparent"
					strokeWidth={stroke}
					r={radius}
					cx={size / 2}
					cy={size / 2}
				/>

				{/* progreso */}
				<circle
					stroke="currentColor"
					fill="transparent"
					strokeWidth={stroke}
					strokeLinecap="round"
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					r={radius}
					cx={size / 2}
					cy={size / 2}
					style={{
						transition: "stroke-dashoffset 1.5s ease",
						transform: "rotate(-90deg) scaleY(-1)",
						transformOrigin: "50% 50%",
					}}
				/>

				{/* texto */}
				<text
					x="50%"
					y="50%"
					dominantBaseline="middle"
					textAnchor="middle"
					fill="currentColor"
					className={`${textSize} font-bold ${textColor}`}
				>
					{progress / 10}
				</text>
			</svg>
		</div>
	);
};
