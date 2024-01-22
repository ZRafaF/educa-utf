// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
	ArticlesStatsResponse,
	ArticlesResponse,
} from '@/types/pocketbase-types';
import Divider from '@mui/material/Divider/Divider';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import { FunctionComponent } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import Stack from '@mui/material/Stack/Stack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ArticlesExpand } from '@/types/expanded-types';
import AvatarComponent from '@/components/AvatarComponent/AvatarComponent';
import Link from 'next/link';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dynamic from 'next/dynamic';
import LikeButton from '@/components/LikeButton/LikeButton';
import Tooltip from '@mui/material/Tooltip';

const TagsComponent = dynamic(
	() => import('@/components/TagsComponent/TagsComponent'),
	{
		ssr: false,
	}
);

interface PostInfoProps {
	myArticle: ArticlesResponse<ArticlesExpand>;
	articleStats: ArticlesStatsResponse;
	authorAvatarUrl: string | undefined;
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
						<Stack
							direction="row"
							spacing={2}
							py={2}
							alignItems="center"
							justifyContent="space-between"
							flexGrow={2}
						>
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
							<MoreVertIcon color="action" />
						</Stack>
					</Stack>

					<TagsComponent
						tag={myArticle.expand?.tag}
						keyWords={myArticle.expand?.key_words}
						expanded
					/>
				</Grid>
				<Divider
					orientation="vertical"
					flexItem
					variant="middle"
					sx={{ mx: 1 }}
				/>
				<Grid xs={2}>
					<Stack spacing={1}>
						<Tooltip title="Visualizações" arrow placement="left">
							<Stack
								direction="row"
								spacing={1}
								alignItems="center"
								pl={1}
							>
								<VisibilityIcon color="action" />
								<Typography variant="subtitle2" component="p">
									{myArticle.views}
								</Typography>
							</Stack>
						</Tooltip>

						<LikeButton
							numberOfLikes={articleStats.likes}
							item={{
								id: myArticle.id,
								type: 'articles',
							}}
						/>
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
};

export default PostInfo;
