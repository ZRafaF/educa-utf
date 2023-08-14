// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
"use client";

import {
	IconButton,
	Tooltip,
	MenuItem,
	ListItemIcon,
	ListItemText,
	ListItem,
	Divider,
	Typography,
	Menu,
} from "@mui/material";
import { FunctionComponent, useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import React from "react";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

// https://opensource.org/licenses/MIT
interface ProfileButtonProps {}

const ProfileButton: FunctionComponent<ProfileButtonProps> = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const isMenuOpen = Boolean(anchorEl);
	const handleMenuClose = () => {
		setAnchorEl(null);
	};
	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			id={menuId}
			keepMounted
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<ListItem>
				<Typography variant="caption">
					Olá:
					<Typography>Visitante</Typography>
				</Typography>
			</ListItem>
			<Divider />
			<Link href={"/login"}>
				<MenuItem onClick={handleMenuClose}>
					<ListItemIcon>
						<LoginIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Login</ListItemText>
				</MenuItem>
			</Link>
			<MenuItem
				onClick={handleMenuClose}
				LinkComponent={Link}
				href={"/login"}
			>
				<ListItemIcon>
					<PersonAddIcon fontSize="small" />
				</ListItemIcon>
				<ListItemText>Registrar</ListItemText>
			</MenuItem>
		</Menu>
	);

	return (
		<React.Fragment>
			<Tooltip title="Meu perfil" arrow>
				<IconButton
					size="large"
					edge="end"
					aria-label="account of current user"
					aria-controls={menuId}
					aria-haspopup="true"
					onClick={handleProfileMenuOpen}
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
			</Tooltip>
			{renderMenu}
		</React.Fragment>
	);
};

export default ProfileButton;
