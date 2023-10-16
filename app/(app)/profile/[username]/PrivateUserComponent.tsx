// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import usePbAuth from '@/hooks/usePbAuth';
import Box from '@mui/material/Box';
import React, { ReactNode } from 'react';
import { FunctionComponent } from 'react';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileDrawer from '@/components/MobileDrawer/MobileDrawer';
import PortraitIcon from '@mui/icons-material/Portrait';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

interface PrivateUserComponentProps {
	username: string;
	children: ReactNode;
}

const drawerWidth = 400;

const PrivateUserComponent: FunctionComponent<PrivateUserComponentProps> = ({
	username,
	children,
}) => {
	const [, user] = usePbAuth();
	const theme = useTheme();
	const notSmallScreens = useMediaQuery(theme.breakpoints.up('md'));

	if (username !== user?.username) return <></>;

	if (notSmallScreens)
		return (
			<Box display={'flex'}>
				<Divider orientation="vertical" flexItem />
				<Box
					minWidth={drawerWidth}
					sx={{
						bgcolor: 'grey.A700',
					}}
					position={'relative'}
				>
					{children}
				</Box>
			</Box>
		);
	return (
		<MobileDrawer
			fabTooltip="Meu perfil"
			fabIcon={<PortraitIcon />}
			zIndex={3}
			px={0}
		>
			{children}
		</MobileDrawer>
	);
};

export default PrivateUserComponent;
