// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import { darkTheme } from '../Themes';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import Button from '@mui/material/Button/Button';
import NewPostsCarousel from './NewPostsCarousel/NewPostsCarousel';
import { getNewArticles } from '@/lib/apiHelpers/articlesAPI';

export const revalidate = 300;

async function BannerSomethingNew() {
	const posts = await getNewArticles();

	return (
		<Box
			width="100%"
			sx={{
				backgroundColor: '#121212',
			}}
			mb={3}
			pb={3}
			pt={3}
		>
			<Grid
				container
				spacing={2}
				width="100%"
				alignItems="center"
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
					<NewPostsCarousel myArticles={posts} />
				</Grid>
			</Grid>
		</Box>
	);
}

export default BannerSomethingNew;
