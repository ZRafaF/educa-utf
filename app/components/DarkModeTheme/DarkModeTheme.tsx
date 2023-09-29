// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '../Themes';

interface DarkModeThemeProps {
	children: ReactNode;
}

const DarkModeTheme: FunctionComponent<DarkModeThemeProps> = ({ children }) => {
	return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
};

export default DarkModeTheme;
