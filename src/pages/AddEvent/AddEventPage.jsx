import { Container } from "@mui/material";
import React from "react";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/PageTitle";
import AddEventForm from "./components/AddEventForm";

const AddEventPage = () => {
	return (
		<>
			<Navbar />

			<Container maxWidth="xl">
				<PageTitle title="Etkinlik Ekle" />
			</Container>

			<Container maxWidth="xl">
				<AddEventForm />
			</Container>
		</>
	);
};

export default AddEventPage;
