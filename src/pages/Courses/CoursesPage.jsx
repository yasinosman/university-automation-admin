import { Container, Grid } from "@mui/material";
import React from "react";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/PageTitle";
import AddAnnouncementForm from "./components/AddAnnouncementForm";
import AddAssignmentForm from "./components/AddAssignmentForm";

import { useFetch } from "../../hooks";
import AlertPopup from "../../components/AlertPopup/AlertPopup";
import Loading from "../../components/Loading";

const CoursesPage = () => {
	const { loading, error, value: courses, setError } = useFetch("/courses");

	return (
		<>
			<Navbar />

			<Container maxWidth="xl">
				<PageTitle title="Dersler" />
			</Container>

			{error && <AlertPopup error={error.message} handleClose={() => setError(false)} />}
			<Loading loading={loading} />

			{courses && (
				<Container maxWidth="xl">
					<Grid container spacing={5}>
						<Grid item xs={12} md={6}>
							<AddAssignmentForm courses={courses} />
						</Grid>
						<Grid item xs={12} md={6}>
							<AddAnnouncementForm courses={courses} />
						</Grid>
					</Grid>
				</Container>
			)}
		</>
	);
};

export default CoursesPage;
