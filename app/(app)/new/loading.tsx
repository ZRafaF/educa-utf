// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Container from '@mui/material/Container/Container';
import Paper from '@mui/material/Paper/Paper';
import Skeleton from '@mui/material/Skeleton/Skeleton';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2

export default function Loading() {
	return (
		<Container maxWidth={'lg'} sx={{ py: 4, flexGrow: 1 }}>
			<Paper
				elevation={0}
				variant="outlined"
				sx={{ mb: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
			>
				<Skeleton variant="text" sx={{ fontSize: '3rem' }} />
				<Skeleton variant="text" sx={{ fontSize: '2rem' }} />
				<Grid container spacing={3}>
					<Grid xs={12} md={6}>
						<Skeleton
							variant="rounded"
							width={'50%'}
							height={100}
						/>
					</Grid>
					<Grid xs={12} md={6}>
						<Skeleton variant="rounded" width={'50%'} height={60} />
					</Grid>

					<Grid xs={12}>
						<Skeleton
							variant="rounded"
							width={'50%'}
							height={100}
						/>
					</Grid>
				</Grid>
			</Paper>
			<Skeleton />

			<Skeleton variant="rounded" width={'100%'} height={300} />
		</Container>
	);
}
