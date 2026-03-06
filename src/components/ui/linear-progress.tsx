import { useEffect, useRef, useState } from "react";

interface LinearProgressSVGProps {
	value: number;
	height?: number;
	duration?: number;
	delay?: number;
	barClass?: string;
	bgClass?: string;
}

export const LinearProgressSVG = ({
	value,
	height = 10,
	duration = 850,
	delay = 0,
	barClass = "text-green-600",
	bgClass = "text-gray-200",
}: LinearProgressSVGProps) => {
	const containerRef = useRef<HTMLDivElement | null>(null);

	const [progress, setProgress] = useState<number>(0);
	const [isVisible, setIsVisible] = useState<boolean>(false);

	// detectar cuando entra en pantalla
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.3 },
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => observer.disconnect();
	}, []);

	// animación
	useEffect(() => {
		if (!isVisible) return;

		let start: number | null = null;
		let frame: number;

		const startAnimation = () => {
			const animate = (timestamp: number) => {
				if (!start) start = timestamp;

				const elapsed = timestamp - start;
				const percentage = Math.min(elapsed / duration, 1);

				setProgress(percentage * value);

				if (percentage < 1) {
					frame = requestAnimationFrame(animate);
				}
			};

			frame = requestAnimationFrame(animate);
		};

		const timer = setTimeout(startAnimation, delay);

		return () => {
			cancelAnimationFrame(frame);
			clearTimeout(timer);
		};
	}, [isVisible, value, duration, delay]);

	return (
		<div ref={containerRef} className="w-full">
			<svg width="100%" height={height}>
				{/* fondo */}
				<rect
					x="0"
					y="0"
					width="100%"
					height={height}
					rx={height / 2}
					className={bgClass}
					fill="currentColor"
				/>

				{/* progreso */}
				<rect
					x="0"
					y="0"
					width={`${progress}%`}
					height={height}
					rx={height / 2}
					className={barClass}
					fill="currentColor"
				/>
			</svg>
		</div>
	);
};
