import React from "react";
import { Container, Grid, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import DataCard from "./DataCard";
import { useFetch } from "../../../hooks";

import AlertPopup from "../../../components/AlertPopup";
import Loading from "../../../components/Loading";

const News = () => {
	const navigate = useNavigate();

	const navigateToNewsDetails = (newsItem) => {
		navigate(`/news/${newsItem.id}`);
	};

	const { loading, error, value, setError } = useFetch("/announcements");

	return (
		<>
			{value && (
				<>
					<Container maxWidth="xl">
						<PageTitle title="Haberler" />

						<Grid container spacing={5}>
							{value.map((announcement) => (
								<Grid key={announcement.id} item xs={12} sm={6} md={4} lg={3}>
									<DataCard
										onClick={() => navigateToNewsDetails(announcement)}
										title={announcement.title}
										subtitle={announcement.subtitle}
										imgURL={announcement.imgURL}
										imgAlt={announcement.imgAlt}
										date={announcement.createdAt}
									/>
								</Grid>
							))}
						</Grid>
					</Container>

					<Container maxWidth="xl" sx={{ mb: 5, mt: 2 }}>
						<Link component={RouterLink} to="/addNews">
							Haber Ekle
						</Link>
					</Container>
				</>
			)}

			{error && <AlertPopup error={error.message} handleClose={() => setError(false)} />}
			<Loading loading={loading} />
		</>
	);
};

export default News;
