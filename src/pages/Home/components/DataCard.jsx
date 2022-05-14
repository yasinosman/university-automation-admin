import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

/**
 * Renders a card with a title, image, and description.
 * @param {Object} props
 * @param {String} props.title - Title of the card
 * @param {String} props.subtitle - Subtitle of the card
 * @param {String} props.imgURL - URL of the image to be displayed in the card
 * @param {String} props.imgAlt - Alt text of the image to be displayed in the card
 * @param {String} props.date - Date of the card
 * @param {Function} props.onClick - Function to be called when the card is clicked
 * @returns
 */
const DataCard = ({ imgURL, imgAlt, title, subtitle, date, onClick }) => {
	return (
		<Card>
			<CardActionArea onClick={onClick}>
				<CardMedia component="img" height="140" image={imgURL} alt={imgAlt} />
				<CardContent>
					<Typography variant="body2" component="div">
						{date}
					</Typography>
					<Typography gutterBottom variant="h5" component="div">
						{title}
					</Typography>

					<Typography variant="body1" color="text.secondary">
						{subtitle}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default DataCard;
