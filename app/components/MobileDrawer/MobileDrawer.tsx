// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import Button from '@mui/material/Button/Button';
import Stack from '@mui/material/Stack/Stack';
import Drawer from '@mui/material/Drawer/Drawer';
import Container from '@mui/material/Container/Container';
import Box from '@mui/material/Box/Box';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import { usePathname } from 'next/navigation';
import Divider from '@mui/material/Divider';

interface MobileDrawerProps {
	children: ReactNode;
	fabTooltip: string;
	fabIcon: ReactNode;
	zIndex?: number;
	px?: number;
	hidden?: boolean;
}

const MobileDrawer: FunctionComponent<MobileDrawerProps> = ({
	children,
	fabTooltip,
	fabIcon,
	px = 4,
	zIndex = 0,
	hidden = false,
}) => {
	const theme = useTheme();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const pathname = usePathname();

	const onlySmallScreen = useMediaQuery(theme.breakpoints.only('sm'));

	const handleClose = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	return (
		<>
			<Drawer
				anchor={'bottom'}
				open={isOpen}
				onClose={handleClose}
				sx={{
					zIndex: zIndex,
					left: 7,
					display: hidden ? 'none' : 'inherit',
				}}
				PaperProps={{
					style: { borderRadius: '20px 20px 0px 0px' },
					elevation: 0,
				}}
			>
				<Box
					sx={{
						maxHeight: '67dvh',
						ml: onlySmallScreen ? 7 : 0,
					}}
				>
					<Grid
						sx={
							{
								// outlineWidth: 5,
								// outlineStyle: 'solid',
								// outlineColor: 'InactiveBorder',
							}
						}
						px={px}
						zIndex={1}
						boxShadow={3}
					>
						<Box>
							<div data-mui-color-scheme="dark">
								<Stack
									direction="row"
									justifyContent="center"
									alignItems="center"
									display={{ sm: 'flex', md: 'none' }}
									mt={1}
									height={32}
									px={2}
								>
									<Button
										variant="text"
										sx={{
											fontWeight: 'bold',
											width: '50%',
										}}
										onClick={handleClose}
									>
										FECHAR
									</Button>
								</Stack>
							</div>

							<Box my={-6}>{children}</Box>
						</Box>
					</Grid>
				</Box>
			</Drawer>
			<Tooltip title={fabTooltip} arrow>
				<Fab
					color="primary"
					aria-label="add"
					sx={{
						position: 'fixed',
						bottom: '30px',
						right: '30px',
						zIndex: zIndex,
						display: hidden ? 'none' : 'block',
					}}
					onClick={() => {
						setIsOpen((o) => !o);
					}}
				>
					{fabIcon}
				</Fab>
			</Tooltip>
		</>
	);
};

export default MobileDrawer;
