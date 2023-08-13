// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
"use client";

import { FunctionComponent, useState } from "react";

import { Tooltip, Box, IconButton, Badge, MenuItem, Menu } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import MoreIcon from "@mui/icons-material/MoreVert";
import { AccountCircle } from "@mui/icons-material";
import React from "react";
import GuestMenuContents from "./GuestMenuContents";
interface TopButtonsProps {}

const TopButtons: FunctionComponent<TopButtonsProps> = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
		useState<null | HTMLElement>(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<GuestMenuContents handleClose={handleMenuClose} />
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton
					size="large"
					aria-label="show 4 new mails"
					color="inherit"
				>
					<Badge badgeContent={4} color="error">
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton
					size="large"
					aria-label="show 17 new notifications"
					color="inherit"
				>
					<NoteAddIcon />
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	return (
		<React.Fragment>
			<Box sx={{ display: { xs: "none", sm: "flex" } }}>
				<Tooltip title="PLACE HOLDER" arrow>
					<IconButton
						size="large"
						aria-label="show 4 new mails"
						color="inherit"
					>
						<Badge badgeContent={4} color="error">
							<MailIcon />
						</Badge>
					</IconButton>
				</Tooltip>
				<Tooltip title="Novo post" arrow>
					<IconButton
						size="large"
						aria-label="show 17 new notifications"
						color="inherit"
					>
						<NoteAddIcon />
					</IconButton>
				</Tooltip>

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
				{renderMobileMenu}
				{renderMenu}
			</Box>
			<Box sx={{ display: { xs: "flex", sm: "none" } }}>
				<IconButton
					size="large"
					aria-label="show more"
					aria-controls={mobileMenuId}
					aria-haspopup="true"
					onClick={handleMobileMenuOpen}
					color="inherit"
				>
					<MoreIcon />
				</IconButton>
			</Box>
		</React.Fragment>
	);
};

export default TopButtons;
