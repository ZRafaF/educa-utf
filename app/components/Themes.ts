// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
"use client";

import { createTheme } from "@mui/material/";

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: { main: "#427AA1" },
		secondary: { main: "#FFCA02" },
	},
});

export const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#427AA1",
		},
		secondary: { main: "#F0CF65" },
	},
});
