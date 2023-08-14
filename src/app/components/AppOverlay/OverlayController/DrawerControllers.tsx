// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
"use client";

import { OverlayControllerContext } from "@/app/contexts/OverlayControllerProvider";
import { FunctionComponent, ReactNode, useContext } from "react";
import drawerWidth from "../drawerWidth";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";

interface ControllerProps {
	children: ReactNode;
}

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	"& .MuiDrawer-paper": {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: "border-box",
		...(!open && {
			overflowX: "hidden",
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(7.5),
			},
		}),
	},
}));

const DrawerController: FunctionComponent<ControllerProps> = ({ children }) => {
	const [open] = useContext(OverlayControllerContext);

	return (
		<Drawer variant="permanent" open={open}>
			{children}
		</Drawer>
	);
};

export default DrawerController;
