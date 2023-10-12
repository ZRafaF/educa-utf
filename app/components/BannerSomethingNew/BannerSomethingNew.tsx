// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import Button from '@mui/material/Button/Button';
import NewArticlesCarousel from './NewArticlesCarousel/NewArticlesCarousel';
import { getNewArticles } from '@/lib/apiHelpers/articlesAPI';
import styleModule from './TextGradientAnimation.module.css';
import Link from 'next/link';
async function BannerSomethingNew() {
	const posts = await getNewArticles();

	return (
		<Box
			// component={Paper}
			width="100%"
			sx={{
				backgroundColor: 'grey.A400',

				// backgroundColor: '#121212',

				//outlineColor: 'grey',
				//outlineWidth: 1,
				//outlineStyle: 'solid',
			}}
			// variant="outlined"
			// square
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
					<div data-mui-color-scheme="dark">
						<Box>
							<Typography
								variant="h2"
								color="text.primary"
								fontWeight={700}
								component="h1"
							>
								Descubra algo{' '}
								<span className={styleModule.animated_text}>
									novo
								</span>
							</Typography>

							<Typography
								variant="h6"
								color="text.secondary"
								mb={3}
								component="p"
							>
								Encontre seu próximo conhecimento agora!
							</Typography>
							<Button
								variant="contained"
								sx={{ fontWeight: 'bold' }}
								color="secondary"
								href="/random"
								LinkComponent={Link}
							>
								Me surpreenda
							</Button>
						</Box>
					</div>
				</Grid>
				<Grid sm={20} md pt={6}>
					{<NewArticlesCarousel myArticles={posts} />}
				</Grid>
			</Grid>
		</Box>
	);
}

export default BannerSomethingNew;
