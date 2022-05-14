import { Container, Grid } from "@mui/material";
import React from "react";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/PageTitle";
import AddNewsForm from "./components/AddNewsForm";

const AddNewsPage = () => {
	return (
		<>
			<Navbar />

			<Container maxWidth="xl">
				<PageTitle title="Haber Ekle" />
			</Container>

			<Container maxWidth="xl">
				<AddNewsForm />
			</Container>
		</>
	);
};

export default AddNewsPage;
