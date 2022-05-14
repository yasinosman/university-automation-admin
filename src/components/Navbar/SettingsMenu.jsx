import { AccountCircle, Logout } from "@mui/icons-material";
// eslint-disable-next-line no-unused-vars
import { ListItemIcon, Menu, MenuItem, Typography, MenuProps } from "@mui/material";
import React from "react";
import { useAuth } from "../../context/Authentication";
import AlertPopup from "../AlertPopup/AlertPopup";
import Loading from "../Loading";
import UserCard from "../UserCard";

/**
 *
 * @param {Object} props
 * @param {MenuProps.anchorEl} props.anchorEl
 * @param {Function} props.handleClose
 * @param {Array<{link: String, name: String}>} props.settings
 * @param {(setting: {link: String, name: String}) => void} props.onSettingItemClick
 */
const SettingsMenu = ({ anchorEl, handleClose, settings, onSettingItemClick }) => {
	const auth = useAuth();

	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);

	const handleLogout = async () => {
		setLoading(true);

		try {
			await auth.logout();
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Menu
			sx={{ mt: "45px" }}
			id="menu-appbar"
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={Boolean(anchorEl)}
			onClose={handleClose}
		>
			<UserCard />
			{settings.map((page) => (
				<MenuItem key={page.link} onClick={() => onSettingItemClick(page)}>
					<ListItemIcon>
						<AccountCircle fontSize="small" />
					</ListItemIcon>
					<Typography textAlign="center" sx={{ mr: 2 }}>
						{page.name}
					</Typography>
					{page.appendix && page.appendix}
				</MenuItem>
			))}
			<MenuItem onClick={handleLogout}>
				<ListItemIcon>
					<Logout fontSize="small" />
				</ListItemIcon>
				<Typography textAlign="center">Çıkış</Typography>
			</MenuItem>

			<Loading loading={loading} />
			<AlertPopup error={error} handleClose={() => setError(null)} />
		</Menu>
	);
};

export default SettingsMenu;
