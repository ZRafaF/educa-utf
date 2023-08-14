// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
"use client";

import { FunctionComponent, useState } from "react";
import {
	AppBar,
	Avatar,
	AvatarGroup,
	Box,
	Container,
	CssBaseline,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Toolbar,
	Typography,
} from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import ShareIcon from "@mui/icons-material/Share";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import QueueIcon from "@mui/icons-material/Queue";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import DownloadIcon from "@mui/icons-material/Download";
import DarkModeTheme from "../DarkModeTheme/DarkModeTheme";
import Link from "next/link";
import educaUtfLogoImage from "@/resources/logo-utf-sm.png";

interface AppDrawerProps {}
const drawerWidth = 240;

const AppDrawer: FunctionComponent<AppDrawerProps> = () => {
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<Toolbar
				component={Paper}
				elevation={4}
				sx={{
					display: {
						sm: "none",
						md: "flex",
					},
				}}
			>
				<Link href={"/"}>
					<Box
						component="img"
						sx={{
							height: 25,
							maxHeight: { xs: 20, sm: 25 },
							objectFit: "contain",

							aspectRatio: "540/107",
						}}
						alt="The house from the offer."
						src={educaUtfLogoImage.src}
					/>
				</Link>
			</Toolbar>

			<List>
				<ListItem disablePadding>
					<ListItemButton
						onClick={() => {
							const shareData: ShareData = {
								title: "Uno Pow Zero",
								text: "Let's play a ⁿᵒᵗ uno game?",
								url: window.location.href,
							};
							navigator.share(shareData);
						}}
					>
						<ListItemIcon>
							<WhatshotIcon />
						</ListItemIcon>
						<ListItemText primary="Em alta" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={() => {}}>
						<ListItemIcon>
							<AutoStoriesIcon />
						</ListItemIcon>
						<ListItemText primary="Posts" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={() => {}}>
						<ListItemIcon>
							<LibraryBooksIcon />
						</ListItemIcon>
						<ListItemText primary="Coleções" />
					</ListItemButton>
				</ListItem>
			</List>

			<Divider />

			<List>
				<ListItem disablePadding>
					<ListItemButton onClick={() => {}}>
						<ListItemIcon>
							<NoteAddIcon />
						</ListItemIcon>
						<ListItemText primary="Novo post" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={() => {}}>
						<ListItemIcon>
							<QueueIcon />
						</ListItemIcon>
						<ListItemText primary="Nova coleção" />
					</ListItemButton>
				</ListItem>
			</List>
		</div>
	);

	return (
		<DarkModeTheme>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { sm: "block", md: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "none", md: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
		</DarkModeTheme>
	);
};

export default AppDrawer;
