// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Box from '@mui/material/Box/Box';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import { FunctionComponent, ReactNode } from 'react';
import ListItems from './ListItems/ListItems';
import Link from 'next/link';
import ProfileButton from './ProfileButton/ProfileButton';
import SearchBar from './SearchBar/SearchBar';
import { darkTheme, lightTheme } from '../Themes';
import OverlayControllerProvider from '@/contexts/OverlayControllerProvider';
import ToggleDrawerButton from './OverlayController/TogglerDrawerButton';
import DrawerController from './OverlayController/DrawerControllers';
import AppBarController from './OverlayController/AppBarController';
import MainLogo from './MainLogo/MainLogo';

interface AppOverlayProps {
	children: ReactNode;
}

const AppOverlay: FunctionComponent<AppOverlayProps> = ({ children }) => {
	return (
		<OverlayControllerProvider>
			<Box>
				<ThemeProvider theme={darkTheme}>
					<AppBarController>
						<Toolbar>
							<ToggleDrawerButton />

							<Link href={'/'}>
								<MainLogo />
							</Link>
							<SearchBar />
							<ProfileButton />
						</Toolbar>
					</AppBarController>

					<DrawerController>
						<Toolbar />
						<ListItems />
					</DrawerController>
				</ThemeProvider>

				{children}
			</Box>
		</OverlayControllerProvider>
	);
};

export default AppOverlay;
