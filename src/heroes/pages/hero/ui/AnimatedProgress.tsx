import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export const AnimatedProgress = ({ value = 10, delay = 300, ...props }) => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			setProgress(value);
		}, delay);

		return () => clearTimeout(timer);
	}, [value, delay]);

	return (
		<Progress
			value={progress}
			className="h-3 [&>div]:transition-all [&>div]:duration-3000 [&>div]:ease-out"
			{...props}
		/>
	);
};
