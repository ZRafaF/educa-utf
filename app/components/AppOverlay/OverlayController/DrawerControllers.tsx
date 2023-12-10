// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { FunctionComponent, ReactNode, useContext, useEffect } from 'react';
import drawerWidth from '../../../lib/drawerWidth';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { OverlayControllerContext } from '@/contexts/OverlayControllerProvider';
import Backdrop from '@mui/material/Backdrop';
import { usePathname } from 'next/dist/client/components/navigation';

interface ControllerProps {
	children: ReactNode;
}

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	'& .MuiDrawer-paper': {
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: 'border-box',
		...(!open && {
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),

			[theme.breakpoints.down('sm')]: {
				width: theme.spacing(0),
			},
		}),
	},
}));

const DrawerController: FunctionComponent<ControllerProps> = ({ children }) => {
	const [open, setOpen] = useContext(OverlayControllerContext);
	const pathname = usePathname();

	useEffect(() => {
		setOpen(false);
	}, [pathname, setOpen]);

	return (
		<Drawer variant="permanent" open={open} disableScrollLock>
			<Backdrop
				open={open}
				onClick={() => {
					setOpen(false);
				}}
			/>
			{children}
		</Drawer>
	);
};

export default DrawerController;
