// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as React from "react";

import { FunctionComponent } from "react";
import DarkModeTheme from "../DarkModeTheme/DarkModeTheme";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import TopButtons from "./TopButtons/TopButtons";
import SearchBar from "./SearchBar/SearchBar";
import NextLink from "next/link";
import Link from "next/link";

interface AppHeaderProps {}

const AppHeader: FunctionComponent<AppHeaderProps> = () => {
	return (
		<DarkModeTheme>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<Typography
							variant="h6"
							noWrap
							component={Link}
							href={"/"}
						>
							EducaUTF
						</Typography>
						<SearchBar />
						<Box sx={{ flexGrow: 1 }} />
						<TopButtons />
					</Toolbar>
				</AppBar>
			</Box>
		</DarkModeTheme>
	);
};

export default AppHeader;
