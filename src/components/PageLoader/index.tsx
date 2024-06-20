const PageLoader = () => {
	return (
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 loader">
			<div className="loader-dot w-3 h-3 rounded-full absolute bg-blue-500 top-0 left-0"></div>
			<div className="loader-dot w-3 h-3 rounded-full absolute bg-red-500 top-0 right-0"></div>
			<div className="loader-dot w-3 h-3 rounded-full absolute bg-yellow-500 bottom-0 right-0"></div>
			<div className="loader-dot w-3 h-3 rounded-full absolute bg-green-500 bottom-0 left-0"></div>
		</div>
	);
};

export default PageLoader;
