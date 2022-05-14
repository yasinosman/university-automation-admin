import React from "react";
import AuthenticationContext from "./AuthenticationContext";

const USER_DATA = {
	firstName: "Yasin",
	lastName: "Osman",
	email: "yasinosman10@gmail.com",
	imgURL: "https://picsum.photos/100",
	password: "123123",
};

const AuthenticationProvider = ({ children }) => {
	const [user, setUser] = React.useState(null);

	const login = ({ email, password }) => {
		return new Promise((resolve, reject) =>
			setTimeout(() => {
				if (email === USER_DATA.email && password === USER_DATA.password) {
					setUser(USER_DATA);
					return resolve();
				} else {
					return reject("Hatalı e-posta veya şifre girdiniz, lütfen tekrar deneyin.");
				}
			}, 1000)
		);
	};

	const logout = () =>
		new Promise((resolve, reject) => {
			setTimeout(() => {
				setUser(null);
				return resolve();
			}, 1000);
		});

	const value = { user, login, logout };

	return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};

export default AuthenticationProvider;
