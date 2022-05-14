import { Container } from "@mui/material";
import React from "react";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/PageTitle";

const AddNewsPage = () => {
	return (
		<>
			<Navbar />

			<Container maxWidth="xl">
				<PageTitle title="Haber Ekle" />
			</Container>
		</>
	);
};

export default AddNewsPage;
