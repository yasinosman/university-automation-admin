import { CssBaseline } from "@mui/material";
import AuthenticationProvider, { ProtectedRoute } from "./context/Authentication";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import AccountPage from "./pages/Account";
import LoginPage from "./pages/Login";
import AddNewsPage from "./pages/AddNews";
import AddEventPage from "./pages/AddEvent";

function App() {
	return (
		<AuthenticationProvider>
			<BrowserRouter>
				<CssBaseline />
				<Routes>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<HomePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/addNews"
						element={
							<ProtectedRoute>
								<AddNewsPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/addEvent"
						element={
							<ProtectedRoute>
								<AddEventPage />
							</ProtectedRoute>
						}
					/>

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
