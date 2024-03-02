// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Box from '@mui/material/Box/Box';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import { FunctionComponent, ReactNode, Suspense } from 'react';
import ListItems from './ListItems/ListItems';
import OverlayControllerProvider from '@/contexts/OverlayControllerProvider';
import DrawerController from './OverlayController/DrawerControllers';
import AppBarController from './OverlayController/AppBarController';
import ContentArea from './ContentArea/ContentArea';

interface AppOverlayProps {
	children: ReactNode;
}

const AppOverlay: FunctionComponent<AppOverlayProps> = ({ children }) => {
	return (
		<OverlayControllerProvider>
			<Box bgcolor={'background.default'} color={'text.primary'}>
				<div data-mui-color-scheme="dark">
					<Suspense fallback={<div>Carregando...</div>}>
						<AppBarController />
					</Suspense>

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
