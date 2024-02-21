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
import { FunctionComponent } from 'react';
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

const CardUsername = dynamic(() => import('../CardUsername/CardUsername'), {
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
					<Box>
						<Box
							display={'flex'}
							width={'100%'}
							justifyContent={'space-between'}
						>
							<Typography
								variant="body1"
								fontWeight="700"
								sx={{
									overflow: 'hidden',
									wordBreak: 'break',
									textOverflow: 'ellipsis',
									display: '-webkit-box',
									WebkitLineClamp: '1',
									WebkitBoxOrient: 'vertical',
								}}
							>
								{myArticle.title}
							</Typography>
						</Box>
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
										<Box
											display={'flex'}
											justifyContent={'space-between'}
											alignItems={'center'}
											width={'100%'}
											pb={1}
										>
											<CardUsername content={myArticle} />
											<Tooltip
												title="Visualizações"
												arrow
												placement="top"
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
														{formatNumber(
															myArticle.views
														)}
													</Typography>
												</Stack>
											</Tooltip>
											<Tooltip
												title="Likes"
												arrow
												placement="top"
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
														{formatNumber(
															myArticle.likes
														)}
													</Typography>
												</Stack>
											</Tooltip>
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
										</Box>
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
								</Stack>
							</Box>

							<Stack
								direction={'row'}
								justifyContent={'space-between'}
								alignItems={'center'}
								width={'100%'}
								gap={0.5}
							>
								<Box overflow={'auto'} width={'100%'}>
									<TagsComponent
										tag={myArticle.expand?.tag}
										keyWords={myArticle.expand?.key_words}
										expanded={expanded}
									/>
								</Box>

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
					</Box>
				</Grid>
			</Grid>
		</CardActionArea>
	);
};

export default ArticleCard;
