import { Container } from "@mui/material";
import React from "react";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/PageTitle";

const AddEventPage = () => {
	return (
		<>
			<Navbar />

			<Container maxWidth="xl">
				<PageTitle title="Etkinlik Ekle" />
			</Container>
		</>
	);
};

export default AddEventPage;
