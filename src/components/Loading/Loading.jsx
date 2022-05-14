import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

/**
 * Displays a loading screen while the app is loading.
 * @param {Object} props
 * @param {Boolean} props.loading
 */
const Loading = ({ loading }) => {
	return (
		<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default Loading;
