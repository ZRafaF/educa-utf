// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import IconButton from '@mui/material/IconButton/IconButton';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import { FunctionComponent } from 'react';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import { useColorScheme } from '@mui/material/styles/CssVarsProvider';
interface ThemeTogglerProps {}

const ThemeToggler: FunctionComponent<ThemeTogglerProps> = () => {
	const { mode, setMode } = useColorScheme();

	return (
		<Tooltip title="Trocar o tema" arrow>
			<IconButton
				edge="end"
				aria-label="toggle theme"
				aria-haspopup="true"
				color="inherit"
				onClick={() => {
					const newTheme = mode === 'light' ? 'dark' : 'light';
					setMode(newTheme);
				}}
				sx={{ mx: 0 }}
			>
				<Brightness6Icon />
			</IconButton>
		</Tooltip>
	);
};

export default ThemeToggler;
