// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import Fab from '@mui/material/Fab/Fab';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';
import Button from '@mui/material/Button/Button';
import Stack from '@mui/material/Stack/Stack';
import React from 'react';
import Drawer from '@mui/material/Drawer/Drawer';
import Container from '@mui/material/Container/Container';
import Box from '@mui/material/Box/Box';
import { usePathname } from 'next/navigation';
import Tooltip from '@mui/material/Tooltip/Tooltip';

interface DrawerControllerProps {
	children: ReactNode;
}

const DrawerController: FunctionComponent<DrawerControllerProps> = ({
	children,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const pathname = usePathname();

	const theme = useTheme();
	const notSmallScreens = useMediaQuery(theme.breakpoints.up('sm'));
	const onlySmallScreen = useMediaQuery(theme.breakpoints.only('sm'));
	const onlyMediumScreen = useMediaQuery(theme.breakpoints.only('md'));

	const handleClose = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

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
			<Drawer
				anchor={'bottom'}
				open={isOpen}
				onClose={handleClose}
				sx={{
					zIndex: 0,
				}}
				PaperProps={{
					style: { borderRadius: '20px 20px 0px 0px' },
				}}
			>
				<Box
					sx={{
						maxHeight: '65vh',
						ml: onlySmallScreen ? 7 : 0,
					}}
				>
					<Grid
						sx={{
							backgroundColor: 'grey.A700',
						}}
						p={2}
						pb={8}
						zIndex={1}
						boxShadow={3}
					>
						<Container maxWidth={'sm'}>
							<Stack
								direction="row"
								justifyContent="center"
								alignItems="center"
								display={{ sm: 'flex', md: 'none' }}
							>
								<Button
									variant="text"
									sx={{ fontWeight: 'bold' }}
									onClick={handleClose}
								>
									FECHAR
								</Button>
							</Stack>
							{children}
						</Container>
					</Grid>
				</Box>
			</Drawer>
			<Tooltip title="Abrir gaveta de posts" arrow>
				<Fab
					color="primary"
					aria-label="add"
					sx={{
						position: 'fixed',
						bottom: '30px',
						right: '30px',
						zIndex: 1,
					}}
					onClick={() => {
						setIsOpen((o) => !o);
					}}
				>
					<FormatListBulletedIcon />
				</Fab>
			</Tooltip>
		</React.Fragment>
	);

	return notSmallScreens ? fixedDrawer : dynamicDrawer;
};

export default DrawerController;
