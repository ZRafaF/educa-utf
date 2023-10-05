// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import TagsComponent from '@/components/TagsComponent/TagsComponent';
import {
	ArticlesStatsResponse,
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
import { getUserAvatarUrlByUserId } from '@/lib/apiHelpers/usersAPI';
import AvatarComponent from '@/components/AvatarComponent/AvatarComponent';
import Link from 'next/link';

interface PostInfoProps {
	myArticle: ArticlesResponse<ArticlesExpand>;
	articleStats: ArticlesStatsResponse;
	authorAvatarUrl: string;
}

const PostInfo: FunctionComponent<PostInfoProps> = ({
	myArticle,
	articleStats,
	authorAvatarUrl,
}) => {
	const authorProfileUrl = `/profile/${articleStats.author_username}`;

	return (
		<Box
			sx={{
				px: 2,
				ml: { xs: -2, sm: -3, md: -4, lg: 0, xl: 0 },
				backgroundColor: 'grey.A700',
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
						<Link
							href={authorProfileUrl}
							style={{ textDecoration: 'none' }}
						>
							<AvatarComponent
								name={articleStats.author_name}
								src={authorAvatarUrl}
							/>
						</Link>
						<Typography
							height={'100%'}
							component="p"
							color={'text.primary'}
						>
							<Link
								href={authorProfileUrl}
								style={{
									textDecoration: 'none',
									color: 'inherit',
								}}
							>
								{articleStats.author_name}
							</Link>
						</Typography>
					</Stack>

					<TagsComponent tags={myArticle.expand?.tags} />
				</Grid>
				<Divider orientation="vertical" flexItem variant="middle" />
				<Grid xs={2} ml={2}>
					<Stack spacing={2}>
						<Stack direction="row" spacing={1} alignItems="center">
							<VisibilityIcon color="action" />
							<Typography variant="subtitle2" component="p">
								{myArticle.views}
							</Typography>
						</Stack>
						<Stack direction="row" spacing={1} alignItems="center">
							<FavoriteIcon color="action" />
							<Typography variant="subtitle2" component="p">
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
