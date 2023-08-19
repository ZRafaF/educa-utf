// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
"use client";

import { FunctionComponent, ReactNode, useContext } from "react";
import drawerWidth from "../drawerWidth";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { OverlayControllerContext } from "@/contexts/OverlayControllerProvider";

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

interface ControllerProps {
	children: ReactNode;
}

const AppBarController: FunctionComponent<ControllerProps> = ({ children }) => {
	const [open] = useContext(OverlayControllerContext);

	return (
		<AppBar position="absolute" open={open}>
			{children}
		</AppBar>
	);
};

export default AppBarController;
