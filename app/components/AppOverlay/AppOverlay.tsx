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
import OverlayControllerProvider from '@/contexts/OverlayControllerProvider';
import ToggleDrawerButton from './OverlayController/TogglerDrawerButton';
import DrawerController from './OverlayController/DrawerControllers';
import AppBarController from './OverlayController/AppBarController';
import MainLogo from './MainLogo/MainLogo';
import ContentArea from './ContentArea/ContentArea';
import dynamic from 'next/dynamic';
const NoSSRThemeToggler = dynamic(() => import('./ThemeToggler/ThemeToggler'), {
	ssr: true,
});

interface AppOverlayProps {
	children: ReactNode;
}

const AppOverlay: FunctionComponent<AppOverlayProps> = ({ children }) => {
	return (
		<OverlayControllerProvider>
			<Box bgcolor={'background.default'} color={'text.primary'}>
				<div data-mui-color-scheme="dark">
					<AppBarController>
						<Toolbar>
							<ToggleDrawerButton />
							<Link href={'/'}>
								<MainLogo />
							</Link>
							<SearchBar />
							<NoSSRThemeToggler />
							<ProfileButton />
						</Toolbar>
					</AppBarController>

					<DrawerController>
						<Toolbar />
						<ListItems />
					</DrawerController>
				</div>
				<ContentArea>{children}</ContentArea>
			</Box>
		</OverlayControllerProvider>
	);
};

export default AppOverlay;
