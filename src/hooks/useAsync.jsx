import { useCallback, useEffect, useState } from "react";

export default function useAsync(callback, dependencies = []) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	const [value, setValue] = useState();

	const callbackMemoized = useCallback(() => {
		setLoading(true);
		setError(undefined);
		setValue(undefined);
		setTimeout(() => {
			callback()
				.then(setValue)
				.catch(setError)
				.finally(() => setLoading(false));
		}, 500);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies);

	useEffect(() => {
		callbackMemoized();
	}, [callbackMemoized]);

	return { loading, error, value, execute: callbackMemoized, setError };
}
