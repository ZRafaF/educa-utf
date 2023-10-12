// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';
import React from 'react';
import MobileDrawer from '@/components/MobileDrawer/MobileDrawer';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

interface DrawerControllerProps {
	children: ReactNode;
}

const DrawerController: FunctionComponent<DrawerControllerProps> = ({
	children,
}) => {
	const theme = useTheme();
	const notSmallScreens = useMediaQuery(theme.breakpoints.up('md'));
	const onlyMediumScreen = useMediaQuery(theme.breakpoints.only('md'));

	const fixedDrawer = (
		<Grid
			sx={{
				backgroundColor: 'grey.A700',
				width: onlyMediumScreen ? 300 : 350,
			}}
			p={2}
			zIndex={1}
			boxShadow={3}
		>
			{children}
		</Grid>
	);
	const dynamicDrawer = (
		<React.Fragment>
			<MobileDrawer
				fabTooltip="Abrir gaveta de posts"
				fabIcon={<FormatListBulletedIcon />}
			>
				{children}
			</MobileDrawer>
		</React.Fragment>
	);

	return notSmallScreens ? fixedDrawer : dynamicDrawer;
};

export default DrawerController;
