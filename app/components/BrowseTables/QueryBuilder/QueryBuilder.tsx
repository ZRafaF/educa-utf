// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useContext, useEffect, useState } from 'react';
import SortComponent from './SortComponent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import BrowseTitle from './BrowseTitle';
import OrderComponent from './OrderComponent';
import Divider from '@mui/material/Divider';
import FiltersComponent from './FiltersComponent/FiltersComponent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import Typography from '@mui/material/Typography';
import { useSearchParams } from 'next/navigation';
import { LoadingQueryContext } from '@/contexts/LoadingQueryContext';

interface QueryBuilderProps {}

const QueryBuilder: FunctionComponent<QueryBuilderProps> = () => {
	const [isAtTop, setIsAtTop] = useState(true);
	const theme = useTheme();
	const isExtraSmallScreen = useMediaQuery(theme.breakpoints.only('xs'));
	const searchParams = useSearchParams()!;
	const [isLoading] = useContext(LoadingQueryContext);

	useEffect(() => {
		window.onscroll = () => {
			setIsAtTop(window.scrollY === 0);
		};

		// cleanup this component
		return () => {
			window.onscroll = null;
		};
	}, [setIsAtTop]);

	return (
		<Box
			position={{ sm: 'relative', md: 'sticky' }}
			top={{ sm: 0, md: 64 }}
			zIndex={1}
			p={3}
			bgcolor={'background.default'}
			boxShadow={{ sm: 0, md: isAtTop ? 0 : 2 }}
		>
			{isLoading ? (
				<Box display={'flex'}>
					<Typography fontWeight={'bold'} variant="h4" pr={2} py={1}>
						Atualizando...
					</Typography>
					<CircularProgress />
				</Box>
			) : (
				<Grid
					container
					spacing={2}
					justifyContent="space-between"
					alignItems="center"
					direction={{ sm: 'column', md: 'row' }}
				>
					<Grid>
						<BrowseTitle />
					</Grid>
					<Grid
						container
						spacing={2}
						justifyContent="space-between"
						alignItems={{ xs: 'flex-start', sm: 'center' }}
						direction={{ xs: 'column', sm: 'row' }}
					>
						<Grid>
							<SortComponent />
						</Grid>
						{!isExtraSmallScreen && (
							<Divider
								orientation="vertical"
								flexItem
								variant="middle"
							/>
						)}

						<Grid>
							<OrderComponent />
						</Grid>
						{!isExtraSmallScreen && (
							<Divider
								orientation="vertical"
								flexItem
								variant="middle"
							/>
						)}
						<Grid>
							<FiltersComponent />
						</Grid>
					</Grid>
				</Grid>
			)}
		</Box>
	);
};

export default QueryBuilder;
