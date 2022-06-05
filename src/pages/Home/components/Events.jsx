import React from "react";
import { Container, Grid, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import PageTitle from "../../../components/PageTitle";
import DataCard from "./DataCard";

import { useFetch } from "../../../hooks";
import AlertPopup from "../../../components/AlertPopup";
import Loading from "../../../components/Loading";

const Events = () => {
	const navigate = useNavigate();

	const navigateToEventDetails = (event) => {
		navigate(`/events/${event.id}`);
	};

	const { loading, error, value: events, setError } = useFetch("/events");

	return (
		<>
			{error && <AlertPopup error={error.message} handleClose={() => setError(false)} />}
			<Loading loading={loading} />

			{events && (
				<>
					<Container maxWidth="xl">
						<PageTitle title="Etkinlikler" />

						<Grid container spacing={5}>
							{events.map((event) => (
								<Grid key={event.id} item xs={12} sm={6} md={4} lg={3}>
									<DataCard
										key={event.id}
										onClick={() => navigateToEventDetails(event)}
										title={event.title}
										subtitle={event.subtitle}
										imgURL={event.imgURL}
										imgAlt={event.imgAlt}
										date={event.createdAt}
									/>
								</Grid>
							))}
						</Grid>
					</Container>
					<Container maxWidth="xl" sx={{ mb: 5, mt: 2 }}>
						<Link component={RouterLink} to="/addEvent">
							Etkinlik Ekle
						</Link>
					</Container>
				</>
			)}
		</>
	);
};

export default Events;
