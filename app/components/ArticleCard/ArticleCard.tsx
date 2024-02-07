// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
	ArticlesResponse,
	ArticlesStatsResponse,
} from '@/types/pocketbase-types';
import CardActionArea from '@mui/material/CardActionArea/CardActionArea';
import Stack from '@mui/material/Stack/Stack';
import Typography from '@mui/material/Typography/Typography';
import Link from 'next/link';
import { FunctionComponent, Suspense } from 'react';
import { ArticlesExpand } from '@/types/expanded-types';
import Box from '@mui/material/Box/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';

import dynamic from 'next/dynamic';
import { formatNumber, getFormattedVisibility } from '@/lib/helper';
import MoreArticleOptions from '../MoreArticleOptions/MoreArticleOptions';

const TagsComponent = dynamic(() => import('../TagsComponent/TagsComponent'), {
	ssr: true,
});

const ArticleCardUsername = dynamic(() => import('./ArticleCardUsername'), {
	ssr: false,
});

interface ArticleCardProps {
	idx?: number | undefined;
	myArticle: ArticlesStatsResponse<ArticlesExpand>;
	expanded?: boolean;
	hideMoreOptions?: boolean;
	disabled?: boolean;
}

const ArticleCard: FunctionComponent<ArticleCardProps> = ({
	idx,
	myArticle,
	expanded,
	hideMoreOptions,
	disabled,
}) => {
	return (
		<CardActionArea
			LinkComponent={Link}
			href={`/article/${myArticle.id}`}
			sx={{
				p: 1,
				borderRadius: 3,
				border: '1px solid var(--mui-palette-divider)',
			}}
			disabled={disabled}
		>
			<Grid container gap={2}>
				{idx !== undefined && (
					<Grid>
						<Box
							height={'100%'}
							sx={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<Typography
								variant="h2"
								fontWeight="700"
								color={'#E0E0E0'}
							>
								{idx + 1}
							</Typography>
						</Box>
					</Grid>
				)}
				<Grid xs>
					<Stack
						direction="column"
						justifyContent="center"
						gap={1}
						width={'100%'}
					>
						<Box
							minHeight={65}
							sx={{
								display: 'flex',
							}}
						>
							<Stack
								direction={'row'}
								justifyContent={'space-between'}
								alignItems={'start'}
								// alignItems={'center'}
								width={'stretch'}
								spacing={1}
							>
								<Stack width={'100%'} minHeight={0}>
									<Typography
										variant="body1"
										fontWeight="700"
										sx={{
											overflow: 'hidden',
											wordBreak: 'break',
											textOverflow: 'ellipsis',
											display: '-webkit-box',
											WebkitLineClamp: '2',
											WebkitBoxOrient: 'vertical',
										}}
									>
										{myArticle.title}
									</Typography>

									<Box display={'flex'} height={'100%'}>
										<Typography
											variant="body2"
											color="text.secondary"
											sx={{
												overflow: 'hidden',
												wordBreak: 'break',
												textOverflow: 'ellipsis',
												display: '-webkit-box',
												WebkitBoxOrient: 'vertical',
												WebkitLineClamp: 2,
											}}
											// minHeight={50}
										>
											{myArticle.description}
										</Typography>
									</Box>
								</Stack>
								<Stack spacing={1} color="text.secondary">
									<Tooltip
										title="Visibilidade"
										arrow
										placement="top"
									>
										<Typography
											variant="subtitle2"
											component="p"
											fontWeight={600}
											color={
												myArticle.visibility ===
												'public'
													? 'success.main'
													: 'text.secondary'
											}
										>
											{getFormattedVisibility(
												myArticle.visibility
											)}
										</Typography>
									</Tooltip>
									<Tooltip
										title="Visualizações"
										arrow
										placement="left"
									>
										<Stack
											direction="row"
											spacing={1}
											alignItems="center"
										>
											<VisibilityIcon fontSize="small" />
											<Typography
												variant="body2"
												component="p"
											>
												{formatNumber(myArticle.views)}
											</Typography>
										</Stack>
									</Tooltip>
									<Tooltip
										title="Likes"
										arrow
										placement="left"
									>
										<Stack
											direction="row"
											spacing={1}
											alignItems="center"
										>
											<FavoriteIcon fontSize="small" />
											<Typography
												variant="body2"
												component="p"
											>
												{formatNumber(myArticle.likes)}
											</Typography>
										</Stack>
									</Tooltip>
								</Stack>
							</Stack>
						</Box>

						<Stack
							direction={'row'}
							justifyContent={'space-between'}
							alignItems={'center'}
							width={'stretch'}
							gap={1}
						>
							<Grid
								container
								gap={2}
								justifyContent={'space-between'}
								alignItems={'center'}
								width={'100%'}
								direction={{ xs: 'column-reverse', sm: 'row' }}
							>
								<Grid>
									<Box minWidth={0} overflow={'auto'}>
										<TagsComponent
											tag={myArticle.expand?.tag}
											keyWords={
												myArticle.expand?.key_words
											}
											expanded={expanded}
										/>
									</Box>
								</Grid>
								<Grid>
									<ArticleCardUsername
										myArticle={myArticle}
									/>
								</Grid>
							</Grid>

							<Box>
								{hideMoreOptions ? null : (
									<MoreArticleOptions
										article={myArticle}
										placement="left"
										shareUrl={`https://educautf.td.utfpr.edu.br/article/${myArticle.id}`}
									/>
								)}
							</Box>
						</Stack>
					</Stack>
				</Grid>
			</Grid>
		</CardActionArea>
	);
};

export default ArticleCard;
