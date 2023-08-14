// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { FunctionComponent } from "react";
import { Divider, List, Tooltip } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import QueueIcon from "@mui/icons-material/Queue";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import WhatshotIcon from "@mui/icons-material/Whatshot";

interface ListItemsProps {}

const ListItems: FunctionComponent<ListItemsProps> = () => {
	return (
		<React.Fragment>
			<List>
				<Tooltip title="Posts em alta" arrow placement="right">
					<ListItemButton
						onClick={() => {
							const shareData: ShareData = {
								title: "EducaUTF",
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
				</Tooltip>

				<Tooltip title="Todos os posts" arrow placement="right">
					<ListItemButton onClick={() => {}}>
						<ListItemIcon>
							<AutoStoriesIcon />
						</ListItemIcon>
						<ListItemText primary="Posts" />
					</ListItemButton>
				</Tooltip>
				<ListItemButton onClick={() => {}}>
					<ListItemIcon>
						<LibraryBooksIcon />
					</ListItemIcon>
					<ListItemText primary="Coleções" />
				</ListItemButton>
			</List>

			<Divider />

			<List>
				<ListItemButton onClick={() => {}}>
					<ListItemIcon>
						<NoteAddIcon />
					</ListItemIcon>
					<ListItemText primary="Novo post" />
				</ListItemButton>
				<ListItemButton onClick={() => {}}>
					<ListItemIcon>
						<QueueIcon />
					</ListItemIcon>
					<ListItemText primary="Nova coleção" />
				</ListItemButton>
			</List>
		</React.Fragment>
	);
};

export default ListItems;
