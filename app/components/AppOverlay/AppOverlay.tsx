// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Box from '@mui/material/Box/Box';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import { FunctionComponent, ReactNode } from 'react';
import ListItems from './ListItems/ListItems';
import Link from 'next/link';
import ProfileButton from './ProfileButton/ProfileButton';
import SearchBar from './SearchBar/SearchBar';
import { cssTheme } from '../Themes';
import OverlayControllerProvider from '@/contexts/OverlayControllerProvider';
import ToggleDrawerButton from './OverlayController/TogglerDrawerButton';
import DrawerController from './OverlayController/DrawerControllers';
import AppBarController from './OverlayController/AppBarController';
import MainLogo from './MainLogo/MainLogo';
import ThemeToggler from './ThemeToggler/ThemeToggler';
import ContentArea from './ContentArea/ContentArea';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

interface AppOverlayProps {
	children: ReactNode;
}

const AppOverlay: FunctionComponent<AppOverlayProps> = ({ children }) => {
	return (
		<OverlayControllerProvider>
			<Box>
				<CssVarsProvider theme={cssTheme} colorSchemeSelector="dark">
					<AppBarController>
						<Toolbar>
							<ToggleDrawerButton />

							<Link href={'/'}>
								<MainLogo />
							</Link>
							<SearchBar />
							<ThemeToggler />
							<ProfileButton />
						</Toolbar>
					</AppBarController>

					<DrawerController>
						<Toolbar />
						<ListItems />
					</DrawerController>
				</CssVarsProvider>
				<ContentArea>{children}</ContentArea>
			</Box>
		</OverlayControllerProvider>
	);
};

export default AppOverlay;
