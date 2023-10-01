// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import Skeleton from '@mui/material/Skeleton';

interface ArticleComponentLoadingProps {}

const fullWidth = false;
const ArticleComponentLoading: FunctionComponent<
	ArticleComponentLoadingProps
> = () => {
	return (
		<Box
			sx={{
				minHeight: '90vh',
			}}
		>
			<Grid
				container
				direction="row"
				alignItems={'center'}
				justifyContent="space-between"
				pl={{
					xs: 2,
					sm: 3,
					md: 4,
					lg: fullWidth ? 20 : 5,
					xl: fullWidth ? 30 : 5,
				}}
				pt={{ xs: 3, sm: 4, md: 8 }}
				pb={2}
			>
				<Grid xs={20} sm={20} md={20} lg mb={3} pr={2}>
					<Typography variant="h3">
						<Skeleton animation="wave" />
					</Typography>
					<Typography
						color="text.secondary"
						variant="subtitle2"
						gutterBottom
					>
						<Skeleton animation="wave" />
					</Typography>
				</Grid>
			</Grid>
			<Box
				mx={{
					xs: 2,
					sm: 3,
					md: 4,
					lg: fullWidth ? 20 : 5,
					xl: fullWidth ? 30 : 5,
				}}
				pb={5}
			>
				<Typography variant="h3">
					<Skeleton animation="wave" />
				</Typography>
				<Skeleton variant="rectangular" width={'100%'} height={150} />
				<Typography>
					<Skeleton animation="wave" />
				</Typography>
				<Typography variant="h3">
					<Skeleton animation="wave" />
				</Typography>
				<Skeleton variant="rectangular" width={'100%'} height={150} />
			</Box>
		</Box>
	);
};

export default ArticleComponentLoading;
