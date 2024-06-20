import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";

const LoadingProgress = () => {
	const { state, location } = useNavigation();
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		setProgress(0);
	}, [location?.pathname]);

	useEffect(() => {
		if (state === "loading") {
			const timer = setInterval(() => {
				setProgress((prev) => {
					if (prev === 100) {
						clearInterval(timer);
						return 100;
					}
					const newProgress = prev + 10;
					return newProgress > 100 ? 100 : newProgress;
				});
			}, 300);
			return () => {
				clearInterval(timer);
			};
		}
	}, [state]);
	if (state !== "loading") return null;
	return (
		<div
			className="fixed top-[4rem] left-0 h-1 bg-blue-500 transition-all duration-200 ease-in-out"
			style={{ width: `${progress}%` }}
		></div>
	);
};

export default LoadingProgress;
