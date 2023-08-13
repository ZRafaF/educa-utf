// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";

import {
	MenuItem,
	ListItemIcon,
	ListItemText,
	ListItem,
	Divider,
	Typography,
} from "@mui/material";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import React from "react";

interface GuestMenuContentsProps {
	handleClose: () => void;
}

const GuestMenuContents: FunctionComponent<GuestMenuContentsProps> = ({
	handleClose,
}) => {
	return (
		<React.Fragment>
			<ListItem>
				<Typography variant="caption">
					Olá:
					<Typography>Visitante</Typography>
				</Typography>
			</ListItem>
			<Divider />
			<Link href={"/login"}>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<LoginIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Login</ListItemText>
				</MenuItem>
			</Link>
			<MenuItem
				onClick={handleClose}
				LinkComponent={Link}
				href={"/login"}
			>
				<ListItemIcon>
					<PersonAddIcon fontSize="small" />
				</ListItemIcon>
				<ListItemText>Registrar</ListItemText>
			</MenuItem>
		</React.Fragment>
	);
};

export default GuestMenuContents;
