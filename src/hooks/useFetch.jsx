import { useAuth } from "../context/Authentication";
import useAsync from "./useAsync";

const DEFAULT_OPTIONS = {
	headers: { "Content-Type": "application/json" },
};

/**
 *
 * @param {string} endpoint - URL endpoint to be fetched
 * @param {RequestInit} options - Fetch options
 * @param {Array<any>} dependencies - Dependencies for fetching again
 * @returns
 */
export default function useFetch(endpoint, options = {}, dependencies = []) {
	const { logout } = useAuth();
	const token = window.localStorage.getItem("accessToken");

	return useAsync(() => {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
					...DEFAULT_OPTIONS,
					headers: {
						Authorization: `Bearer ${token}`,
					},
					...options,
				});

				if (res.status === 401) {
					logout();
					return reject("Lütfen devam etmek için yeniden giriş yapın");
				}

				const data = await res.json();

				return resolve(data);
			} catch (error) {
				return reject(error.message);
			}
		});
	}, dependencies);
}
