// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { createTheme } from '@mui/material/';

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: { main: '#427AA1' },
		secondary: { main: '#FFCA02' },
		background: {
			//default: '#161616',
		},
		text: {
			primary: '#c9d1d9',
		},
		grey: { A700: '#202020' },
	},
});

export const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#427AA1',
		},
		secondary: { main: '#F0CF65' },
		grey: { A700: '#f2f2f2' },
	},
});
