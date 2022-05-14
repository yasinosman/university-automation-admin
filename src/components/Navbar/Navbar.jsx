import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { BookOnline as BookOnlineIcon } from "@mui/icons-material";

import { useNavigate, Link as RouterLink } from "react-router-dom";
import SettingsMenu from "./SettingsMenu";
import { Badge } from "@mui/material";
import { useAuth } from "../../context/Authentication";

const pages = [
	{ link: "/", name: "Ana Sayfa" },
	{ link: "/calendar", name: "Takvim" },
	{ link: "/courses", name: "Dersler" },
];
const settings = [
	{
		link: "/account",
		name: "Hesap",
		appendix: <Badge color="secondary" badgeContent={4} />,
	},
];

const Navbar = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const openNav = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const openUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const closeNav = () => {
		setAnchorElNav(null);
	};

	const closeUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleNavItemClick = (page) => {
		closeNav();

		navigate(page.link);
	};

	const handleUserMenuItemClick = (page) => {
		closeUserMenu();

		navigate(page.link);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<BookOnlineIcon
						onClick={() => navigate("/")}
						sx={{
							display: { xs: "none", md: "flex" },
							mr: 1,
							"&:hover": {
								cursor: "pointer",
							},
						}}
					/>
					<Typography
						variant="h6"
						noWrap
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
							"&:hover": {
								cursor: "pointer",
							},
						}}
						onClick={() => navigate("/")}
					>
						uniPortal
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={openNav}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={closeNav}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<MenuItem key={page.link} onClick={() => handleNavItemClick(page)}>
									<Typography textAlign="center">{page.name}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<BookOnlineIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						uniPortal
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Button
								key={page.link}
								onClick={() => handleNavItemClick(page)}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								{page.name}
							</Button>
						))}
					</Box>

					{user ? (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Ayarlar">
								<IconButton onClick={openUserMenu} sx={{ p: 0 }}>
									<Badge color="secondary" badgeContent={4}>
										<Avatar
											alt={`${user.firstName} ${user.lastName}`}
											src={user.imgURL}
										/>
									</Badge>
								</IconButton>
							</Tooltip>
							<SettingsMenu
								anchorEl={anchorElUser}
								settings={settings}
								handleClose={closeUserMenu}
								onSettingItemClick={handleUserMenuItemClick}
							/>
						</Box>
					) : (
						<Box sx={{ flexGrow: 0 }}>
							<Button component={RouterLink} to="/login" color="inherit">
								Giriş Yap
							</Button>
						</Box>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
