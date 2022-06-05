import React from "react";
import Loading from "../../components/Loading";
import AuthenticationContext from "./AuthenticationContext";

const AuthenticationProvider = ({ children }) => {
	const [user, setUser] = React.useState(() => JSON.parse(window.localStorage.getItem("user")));

	const [loading, setLoading] = React.useState(false);

	const login = ({ email, password }) => {
		return new Promise(async (resolve, reject) => {
			try {
				setLoading(true);

				// signin
				const tokenResponse = await fetch(`${process.env.REACT_APP_API_URL}/auth/signin`, {
					method: "post",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email: email, password: password }),
				});

				if (!tokenResponse.ok) {
					return reject("Geçersiz e-posta ya da şifre girdiniz. Lütfen tekrar deneyin");
				}

				const tokenData = await tokenResponse.json();
				window.localStorage.setItem("accessToken", tokenData.access_token);

				// fetch user data
				const userResponse = await fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
					headers: { Authorization: `Bearer ${tokenData.access_token}` },
				});
				if (userResponse.ok) {
					const userData = await userResponse.json();
					window.localStorage.setItem("user", JSON.stringify(userData.user));

					setUser(userData.user);

					return resolve(userData.user);
				}

				return resolve(null);
			} catch (error) {
				setUser(null);
				return reject(error.message);
			} finally {
				setLoading(false);
			}
		});
	};

	const logout = () =>
		new Promise((resolve) => {
			setLoading(true);

			setTimeout(() => {
				setUser(null);

				window.localStorage.removeItem("user");
				window.localStorage.removeItem("accessToken");

				setLoading(false);
				return resolve();
			}, 1000);
		});

	const value = { user, login, logout, loading, setUser };

	return (
		<AuthenticationContext.Provider value={value}>
			<>
				{children}
				<Loading loading={loading} />
			</>
		</AuthenticationContext.Provider>
	);
};

export default AuthenticationProvider;
