import React from "react";

const AuthenticationContext = React.createContext({
	user: null,
	login: ({ email, password }) => new Promise((res) => res()),
	logout: () => new Promise((res) => res()),
});

export default AuthenticationContext;
