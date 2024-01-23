// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';

import Card from '@mui/material/Card/Card';
import CardActionArea from '@mui/material/CardActionArea/CardActionArea';
import CardActions from '@mui/material/CardActions/CardActions';
import CardContent from '@mui/material/CardContent/CardContent';
import Typography from '@mui/material/Typography/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';
import CardMedia from '@mui/material/CardMedia/CardMedia';
import Divider from '@mui/material/Divider/Divider';
import Stack from '@mui/material/Stack/Stack';
import { ChaptersStatsResponse } from '@/types/pocketbase-types';
import { ChaptersExpandTags } from '@/types/expanded-types';
import React from 'react';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import VisibilityIcon from '@mui/icons-material/Visibility';
import dynamic from 'next/dynamic';
import { formatNumber } from '@/lib/helper';
import { getChapterCoverURL } from '@/lib/apiHelpers/chaptersAPI';
import MoreChapterOptions from '../MoreChapterOptions/MoreChapterOptions';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

const TagsComponent = dynamic(
	() => import('@/components/TagsComponent/TagsComponent'),
	{
		ssr: false,
	}
);

interface ChapterCardProps {
	isExpanded?: boolean;
	isClickable?: boolean;
	myChapter: ChaptersStatsResponse<ChaptersExpandTags>;
}

const ChapterCard: FunctionComponent<ChapterCardProps> = ({
	isExpanded = true,
	isClickable = true,
	myChapter,
}) => {
	const getFormattedDate = (date: string) => {
		const parsedDate = parseISO(date);

		return format(parsedDate, 'P', {
			locale: ptBR,
		});
	};

	const ExpandedContent = () => (
		<CardContent
			sx={{
				p: { xs: 1, sm: 1, md: 2 },
			}}
		>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Typography
					gutterBottom
					variant="h5"
					sx={{
						overflow: 'hidden',
						wordBreak: 'break',

						textOverflow: 'ellipsis',
						display: '-webkit-box',
						WebkitLineClamp: '2',
						WebkitBoxOrient: 'vertical',
					}}
				>
					{myChapter.title}
				</Typography>

				<Stack
					direction="column"
					justifyContent="center"
					alignItems="end"
					spacing={0.5}
				>
					<Stack
						direction="row"
						spacing={1}
						alignItems="center"
						justifyContent="center"
					>
						<Typography variant="caption">
							{formatNumber(myChapter.views)}
						</Typography>
						<VisibilityIcon color="action" fontSize="small" />
					</Stack>
					<Stack direction="row" spacing={1} alignItems="center">
						<Typography variant="caption">
							{formatNumber(myChapter.likes)}
						</Typography>
						<FavoriteIcon color="action" fontSize="small" />
					</Stack>
				</Stack>
			</Stack>
			<Typography variant="body2" color="text.secondary">
				{myChapter.description}
			</Typography>
		</CardContent>
	);

	const CollapsedContent = () => (
		<CardContent
			sx={{
				p: 1,
			}}
		>
			<Stack
				direction="column"
				justifyContent="space-between"
				alignItems="start"
				minHeight={80}
				useFlexGap
			>
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
					{myChapter.title}
				</Typography>
				<Stack
					direction={'row'}
					justifyContent={'space-between'}
					alignItems={'center'}
					width={'stretch'}
				>
					<Stack direction="row" spacing={2} alignItems="center">
						<Stack direction="row" spacing={1} alignItems="center">
							<VisibilityIcon color="action" fontSize="small" />
							<Typography variant="caption">
								{formatNumber(myChapter.views)}
							</Typography>
						</Stack>
						<Stack direction="row" spacing={1} alignItems="center">
							<FavoriteIcon color="action" fontSize="small" />
							<Typography variant="caption">
								{formatNumber(myChapter.likes)}
							</Typography>
						</Stack>
					</Stack>
					<MoreChapterOptions
						chapter={myChapter}
						shareUrl={`https://educautf.td.utfpr.edu.br/chapter/${myChapter.id}`}
						placement="left"
						size="small"
					/>
				</Stack>
			</Stack>
		</CardContent>
	);

	return (
		<Card
			sx={{
				pointerEvents: isClickable ? 'inherit' : 'none',
			}}
			variant="outlined"
		>
			<CardActionArea
				LinkComponent={Link}
				href={`/chapter/${myChapter.id}`}
			>
				<Box position="relative">
					<CardMedia
						component="img"
						sx={{
							aspectRatio: '2/1',
						}}
						src={getChapterCoverURL(myChapter, false)}
						alt="chapter-cover-img"
					/>
					<Tooltip
						title="Numero de artigos"
						arrow
						placement="left-start"
					>
						<Box
							position="absolute"
							top={-1}
							right={-1}
							sx={{
								width: isExpanded ? 24 : 20,
								height: isExpanded ? 24 : 20,
								fontWeight: 'bold',
							}}
							borderRadius={'0 0 0 10px'}
							bgcolor={'Background'}
							display={'flex'}
							alignItems={'center'}
							justifyContent={'center'}
							boxShadow={4}
						>
							{myChapter.articles.length}
						</Box>
					</Tooltip>
				</Box>

				{isExpanded ? <ExpandedContent /> : <CollapsedContent />}
			</CardActionArea>
			{isExpanded ? (
				<>
					<Divider />
					<CardActions>
						<Stack
							sx={{
								width: '100%',
							}}
						>
							<Stack
								direction="row"
								justifyContent="space-between"
							>
								<TagsComponent
									tag={myChapter.expand?.tag}
									keyWords={myChapter.expand?.key_words}
									expanded
								/>
								<MoreChapterOptions
									chapter={myChapter}
									shareUrl={`https://educautf.td.utfpr.edu.br/chapter/${myChapter.id}`}
									placement="left"
									size="medium"
								/>
							</Stack>
						</Stack>
					</CardActions>
				</>
			) : (
				<></>
			)}
		</Card>
	);
};

export default ChapterCard;
