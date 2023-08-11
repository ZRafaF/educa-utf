// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

"use client";

import { FunctionComponent, ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#ffc107",
		},
		secondary: {
			main: "#f50057",
		},
	},
});

interface DarkModeThemeProps {
	children: ReactNode;
}

const DarkModeTheme: FunctionComponent<DarkModeThemeProps> = ({ children }) => {
	return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
};

export default DarkModeTheme;
