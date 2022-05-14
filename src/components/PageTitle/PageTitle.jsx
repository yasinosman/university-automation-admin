import { Typography } from "@mui/material";
import React from "react";

/**
 *  Renders a page title
 * @param {Object} props
 * @param {String} props.title - Page title
 */
const PageTitle = ({ title }) => {
	return (
		<Typography variant="h4" component="h1" gutterBottom sx={{ mt: 5 }}>
			{title}
		</Typography>
	);
};

export default PageTitle;
