import { Alert, AlertTitle, Snackbar } from "@mui/material";
import React from "react";

/**
 * Displays an alert popup.
 * @param {Object} props
 * @param {String} props.error - The error message to display
 * @param {() => void} props.handleClose - The function to call when the error message is dismissed
 */
const AlertPopup = ({ error, handleClose }) => {
	return (
		<Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			open={error !== null && error !== ""}
			onClose={handleClose}
		>
			<Alert onClose={handleClose} severity="error" sx={{ width: "100%", mb: 2 }}>
				<AlertTitle>Hata</AlertTitle>
				{error}
			</Alert>
		</Snackbar>
	);
};

export default AlertPopup;
