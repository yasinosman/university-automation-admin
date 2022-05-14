import React from "react";
import { Avatar, Paper, Typography } from "@mui/material";
import { useAuth } from "../../context/Authentication";

const UserCard = () => {
	const { user } = useAuth();

	return (
		<Paper elevation={0} sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 5, paddingRight: 5 }}>
			<Avatar
				alt={`${user.firstName} ${user.lastName}`}
				src={user.imgURL}
				sx={{
					marginBottom: 2,
					marginLeft: "auto",
					marginRight: "auto",
					width: 100,
					height: 100,
				}}
			/>
			<Typography variant="h6" component="p" align="center">
				{user.firstName} {user.lastName}
			</Typography>
			<Typography variant="body1" component="p" align="center">
				{user.email}
			</Typography>
		</Paper>
	);
};

export default UserCard;
