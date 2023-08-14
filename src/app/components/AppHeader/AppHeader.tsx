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
import Link from "next/link";
import educaUtfLogoImage from "@/resources/logo-utf-sm.png";

interface AppHeaderProps {}

const AppHeader: FunctionComponent<AppHeaderProps> = () => {
	return (
		<DarkModeTheme>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar
					position="fixed"
					sx={{
						width: { md: `calc(100% - 240px)` },
					}}
				>
					<Toolbar>
						<Link href={"/"}>
							<Box
								component="img"
								sx={{
									height: 25,
									maxHeight: { xs: 20, sm: 25 },
									objectFit: "contain",
									display: { sm: "block", md: "none" },

									aspectRatio: "540/107",
								}}
								alt="The house from the offer."
								src={educaUtfLogoImage.src}
							/>
						</Link>
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
