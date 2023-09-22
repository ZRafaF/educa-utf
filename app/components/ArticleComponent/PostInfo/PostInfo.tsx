// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import TagsComponent from '@/components/TagsComponent/TagsComponent';
import {
	ArticleStatsResponse,
	ArticlesResponse,
} from '@/types/pocketbase-types';
import Avatar from '@mui/material/Avatar/Avatar';
import Divider from '@mui/material/Divider/Divider';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import { FunctionComponent } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import Stack from '@mui/material/Stack/Stack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ArticlesExpand } from '@/types/expanded-types';

interface PostInfoProps {
	myArticle: ArticlesResponse<ArticlesExpand>;
	articleStats: ArticleStatsResponse;
}

const PostInfo: FunctionComponent<PostInfoProps> = ({
	myArticle,
	articleStats,
}) => {
	return (
		<Box
			sx={{
				px: 2,
				ml: { xs: -2, sm: -3, md: -4, lg: 0, xl: 0 },
				backgroundColor: '#F2F2F2',
				borderRadius: {
					xs: '0',
					sm: '0',
					md: '0',
					lg: '10px 0px 0px 10px',
				},
				boxShadow: {
					sm: 'none',
					md: 'none',
					lg: '0px 2px 2px 0px rgba(0, 0, 0, 0.25)',
				},
				overflow: 'hidden',
			}}
		>
			<Grid
				container
				direction="row"
				alignItems={'center'}
				justifyContent="space-between"
			>
				<Grid xs>
					<Stack
						direction="row"
						spacing={2}
						py={2}
						alignItems="center"
					>
						<Avatar sx={{ bgcolor: '#427AA1' }}>RF</Avatar>
						<Typography height={'100%'}>
							{articleStats.author_name}
						</Typography>
					</Stack>
					<TagsComponent tags={myArticle.expand?.tags} />
				</Grid>
				<Divider orientation="vertical" flexItem variant="middle" />
				<Grid xs={2} ml={2}>
					<Stack spacing={2}>
						<Stack direction="row" spacing={1} alignItems="center">
							<VisibilityIcon color="action" />
							<Typography variant="subtitle2">
								{myArticle.views}
							</Typography>
						</Stack>
						<Stack direction="row" spacing={1} alignItems="center">
							<FavoriteIcon color="action" />
							<Typography variant="subtitle2">
								{articleStats.likes}
							</Typography>
						</Stack>
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
};

export default PostInfo;
