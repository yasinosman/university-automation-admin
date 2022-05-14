import React from "react";
import AuthenticationContext from "./AuthenticationContext";

function useAuth() {
	const authContext = React.useContext(AuthenticationContext);

	if (!authContext) {
		throw new Error("useAuth must be used within an AuthenticationProvider");
	}

	return authContext;
}

export default useAuth;
