// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

export const cssTheme = extendTheme({
	colorSchemes: {
		dark: {
			palette: {
				mode: 'dark',
				primary: { main: '#58A6FF' },
				secondary: { main: '#FFCA02' },
				background: {
					//default: '#161616',
				},
				text: {
					primary: '#F7F7F7',
				},
				grey: { A700: '#090909', A400: '#090909' },
			},
		},
		light: {
			palette: {
				mode: 'light',
				primary: {
					main: '#427AA1',
				},
				secondary: { main: '#F0CF65' },

				grey: { A700: '#f2f2f2', A400: '#090909' },
			},
		},
	},
});
