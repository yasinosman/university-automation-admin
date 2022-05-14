import React from "react";
import { Container, Grid, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import DataCard from "./DataCard";
import news from "../mock/news.json";

const News = () => {
	const navigate = useNavigate();

	const navigateToNewsDetails = (newsItem) => {
		navigate(`/news/${newsItem.id}`);
	};

	return (
		<>
			<Container maxWidth="xl">
				<PageTitle title="Son 4 Haber" />

				<Grid container spacing={5}>
					{news.map((newsItem) => (
						<Grid key={newsItem.id} item xs={12} sm={6} md={4} lg={3}>
							<DataCard
								onClick={() => navigateToNewsDetails(newsItem)}
								title={newsItem.title}
								subtitle={newsItem.subtitle}
								imgURL={newsItem.imgURL}
								imgAlt={newsItem.imgAlt}
								date={newsItem.date}
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
	);
};

export default News;
