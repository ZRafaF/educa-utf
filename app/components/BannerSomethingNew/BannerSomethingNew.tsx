// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Box from '@mui/material/Box/Box';
import { FunctionComponent } from 'react';
import Typography from '@mui/material/Typography/Typography';
import { darkTheme } from '../Themes';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import Button from '@mui/material/Button/Button';
import NewPostsCarousel from './NewPostsCarousel/NewPostsCarousel';
import { bannerFaderSize } from '@/lib/helper';
import { getSomePostsSorted } from '@/lib/dbApi';
import { PostsResponse } from '@/types/pocketbase-types';

export const revalidate = 10;

async function getBestPosts() {
	const posts = await getSomePostsSorted(8).catch((error) => {
		console.error(error);
		return [] as PostsResponse[];
	});

	return posts as PostsResponse[];
}

async function BannerSomethingNew() {
	const posts = await getBestPosts();

	return (
		<Box
			width={'100%'}
			sx={{
				backgroundColor: '#121212',
				//background:
				//	"linear-gradient(180deg, #121212  100%, rgba(81, 73, 90, 0.00) 100%)",
			}}
			mb={3}
			pb={3}
			pt={3}
		>
			<Grid
				container
				spacing={2}
				width={'100%'}
				alignItems={'center'}
				justifyContent="center"
				pl={{ xs: 2, sm: 2, md: 4, lg: 10 }}
				pr={{ xs: 0, sm: 2, md: 2, lg: 8 }}
			>
				<Grid xs={14} sm={10} md={5} lg={4}>
					<ThemeProvider theme={darkTheme}>
						<Box>
							<Typography
								variant="h2"
								color="text.primary"
								fontWeight={700}
							>
								Descubra algo novo
							</Typography>

							<Typography
								variant="h6"
								color="text.secondary"
								mb={3}
							>
								Encontre seu próximo conhecimento agora!
							</Typography>
							<Button
								variant="contained"
								sx={{ fontWeight: 'bold' }}
								color="secondary"
							>
								Me surpreenda
							</Button>
						</Box>
					</ThemeProvider>
				</Grid>
				<Grid sm={20} md pt={6}>
					<NewPostsCarousel myPosts={posts} />
				</Grid>
			</Grid>
			<Box height={bannerFaderSize} />
		</Box>
	);
}

export default BannerSomethingNew;
