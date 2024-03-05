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
		<Box bgcolor={'background.default'} color={'text.primary'}>
			<Suspense fallback={<div>Carregando...</div>}>
				<div data-mui-color-scheme="dark">
					<OverlayControllerProvider>
						<AppBarController />
						<DrawerController>
							<Toolbar />
							<ListItems />
						</DrawerController>
					</OverlayControllerProvider>
				</div>
			</Suspense>
			<ContentArea>{children}</ContentArea>
		</Box>
	);
};

export default AppOverlay;
