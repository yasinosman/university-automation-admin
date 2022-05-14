import { CssBaseline } from "@mui/material";
import AuthenticationProvider, { ProtectedRoute } from "./context/Authentication";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import AccountPage from "./pages/Account";
import LoginPage from "./pages/Login";
import AddNewsPage from "./pages/AddNews";
import AddEventPage from "./pages/AddEvent";
import CoursesPage from "./pages/Courses";

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
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

						<Route
							path="/courses"
							element={
								<ProtectedRoute>
									<CoursesPage />
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
		</LocalizationProvider>
	);
}

export default App;
