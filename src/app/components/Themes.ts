// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
"use client";

import { createTheme } from "@mui/material/";

export const darkTheme = createTheme({
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

export const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#ffc107",
		},
		secondary: {
			main: "#f50057",
		},
	},
});
