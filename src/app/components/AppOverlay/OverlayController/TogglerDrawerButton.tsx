// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
"use client";

import { OverlayControllerContext } from "@/app/contexts/OverlayControllerProvider";
import { IconButton } from "@mui/material";
import { FunctionComponent, useContext } from "react";
import { ChevronLeft } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

interface ToggleButtonProps {}

const ToggleDrawerButton: FunctionComponent<ToggleButtonProps> = () => {
	const [open, setOpen] = useContext(OverlayControllerContext);

	const toggleDrawer = () => {
		setOpen((old) => !old);
	};

	return (
		<IconButton
			edge="start"
			color="inherit"
			aria-label="open drawer"
			onClick={toggleDrawer}
			sx={{
				marginRight: "20px",
			}}
		>
			{open ? <ChevronLeft /> : <MenuIcon />}
		</IconButton>
	);
};

export default ToggleDrawerButton;
