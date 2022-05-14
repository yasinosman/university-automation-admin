import { Container, Grid } from "@mui/material";
import React from "react";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/PageTitle";
import AddAssignmentForm from "./components/AddAssignmentForm";

const CoursesPage = () => {
	return (
		<>
			<Navbar />

			<Container maxWidth="xl">
				<PageTitle title="Dersler" />
			</Container>

			<Container maxWidth="xl">
				<Grid container spacing={5}>
					<Grid item xs={12} md={6}>
						<AddAssignmentForm />
					</Grid>
					<Grid item xs={12} md={6}>
						Duyuru ekle
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default CoursesPage;
