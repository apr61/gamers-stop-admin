import { useEffect, useState } from "react";

type useCustomQueryProps<T> = {
	fn: () => Promise<T[]>;
};

const useCustomQuery = <T>({ fn }: useCustomQueryProps<T>) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<T[]>([]);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async () => {
		try {
			setLoading(true);
			const response = await fn();
			setData(response as T[]);
		} catch (error) {
			if (error instanceof Error) setError(error.message);
			setData([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
	return {
		loading,
		data,
		error,
	};
};

export { useCustomQuery };
