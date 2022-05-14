import { Container } from "@mui/material";
import React from "react";
import Navbar from "../../components/Navbar";
import Events from "./components/Events";
import News from "./components/News";
import Title from "./components/Title";

const HomePage = () => {
	return (
		<>
			<Navbar />

			<Container maxWidth="xl">
				<Title />
				<News />
				<Events />
			</Container>
		</>
	);
};

export default HomePage;
