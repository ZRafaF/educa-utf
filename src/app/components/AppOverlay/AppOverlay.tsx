// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { FunctionComponent, ReactNode } from "react";
import ListItems from "./ListItems/ListItems";
import Link from "next/link";
import ProfileButton from "./ProfileButton/ProfileButton";
import SearchBar from "./SearchBar/SearchBar";
import { darkTheme, lightTheme } from "../Themes";
import OverlayControllerProvider from "@/app/contexts/OverlayControllerProvider";
import ToggleDrawerButton from "./OverlayController/TogglerDrawerButton";
import DrawerController from "./OverlayController/DrawerControllers";
import AppBarController from "./OverlayController/AppBarController";
import MainLogo from "./MainLogo/MainLogo";

interface AppOverlayProps {
	children: ReactNode;
}

const AppOverlay: FunctionComponent<AppOverlayProps> = ({ children }) => {
	return (
		<ThemeProvider theme={darkTheme}>
			<OverlayControllerProvider>
				<Box sx={{ display: "flex" }}>
					<AppBarController>
						<Toolbar>
							<ToggleDrawerButton />

							<Link href={"/"}>
								<MainLogo />
							</Link>
							<SearchBar />
							<Box sx={{ flexGrow: 1 }} />
							<ProfileButton />
						</Toolbar>
					</AppBarController>

					<DrawerController>
						<Toolbar />
						<ListItems />
					</DrawerController>
					<ThemeProvider theme={lightTheme}>
						<Box
							component="main"
							sx={{
								flexGrow: 1,
								height: "100vh",
								overflow: "auto",
							}}
						>
							<Toolbar />
							{children}
						</Box>
					</ThemeProvider>
				</Box>
			</OverlayControllerProvider>
		</ThemeProvider>
	);
};

export default AppOverlay;
