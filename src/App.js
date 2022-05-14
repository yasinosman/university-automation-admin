import { CssBaseline } from "@mui/material";
import AuthenticationProvider, { ProtectedRoute } from "./context/Authentication";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import AccountPage from "./pages/Account";
import LoginPage from "./pages/Login";

function App() {
	return (
		<AuthenticationProvider>
			<BrowserRouter>
				<CssBaseline />
				<Routes>
					<Route path="/" element={<HomePage />} />

					<Route path="/login" element={<LoginPage />} />
					<Route
						path="account"
						element={
							<ProtectedRoute>
								<AccountPage />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</AuthenticationProvider>
	);
}

export default App;
