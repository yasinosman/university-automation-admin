import React from "react";
import { BookOnline } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const Title = () => {
	return (
		<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 5 }}>
			<BookOnline color="primary" sx={{ width: 50, height: 50 }} />
			<Typography
				variant="h3"
				component="h1"
				href="/"
				color="primary"
				sx={{
					fontFamily: "monospace",
					fontWeight: 700,
					letterSpacing: ".3rem",
					textDecoration: "none",
				}}
			>
				uniPortal Admin
			</Typography>
		</Box>
	);
};

export default Title;
