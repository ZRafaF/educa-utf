// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import SortComponent from './SortComponent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import BrowseTitle from './BrowseTitle';
import OrderComponent from './OrderComponent';
import Divider from '@mui/material/Divider';

interface QueryBuilderProps {}

const QueryBuilder: FunctionComponent<QueryBuilderProps> = () => {
	const [isAtTop, setIsAtTop] = useState(true);

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
		<>
			<Box
				position={{ sm: 'relative', md: 'sticky' }}
				top={{ sm: 0, md: 64 }}
				zIndex={1}
				p={3}
				bgcolor={'Background'}
				boxShadow={{ sm: 0, md: isAtTop ? 0 : 2 }}
			>
				<Grid
					container
					spacing={2}
					justifyContent="space-between"
					alignItems="center"
				>
					<Grid>
						<BrowseTitle />
					</Grid>
					<Grid
						container
						spacing={2}
						justifyContent="space-between"
						alignItems="center"
					>
						<Grid>
							<SortComponent />
						</Grid>

						<Grid>
							<OrderComponent />
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default QueryBuilder;
