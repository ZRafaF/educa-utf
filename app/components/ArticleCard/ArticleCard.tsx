// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';

import Card from '@mui/material/Card/Card';
import CardActionArea from '@mui/material/CardActionArea/CardActionArea';
import CardActions from '@mui/material/CardActions/CardActions';
import CardContent from '@mui/material/CardContent/CardContent';
import IconButton from '@mui/material/IconButton/IconButton';
import Typography from '@mui/material/Typography/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';
import CardMedia from '@mui/material/CardMedia/CardMedia';
import Divider from '@mui/material/Divider/Divider';
import Stack from '@mui/material/Stack/Stack';
import contemplativeReptile from '@/resources/contemplative-reptile.jpg';
import ShareButton from '../ShareButton/ShareButton';
import { ArticlesResponse } from '@/types/pocketbase-types';
import TagsComponent from '../TagsComponent/TagsComponent';
import { ArticlesExpand } from '@/types/expanded-types';
import React from 'react';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreOptions from '../MoreOptions/MoreOptions';

interface ArticleCardProps {
	imgSrc?: string;
	isExpanded?: boolean;
	isClickable?: boolean;
	myArticle: ArticlesResponse<ArticlesExpand>;
	href: string;
}

const ArticleCard: FunctionComponent<ArticleCardProps> = ({
	imgSrc = contemplativeReptile.src,
	isExpanded = true,
	isClickable = true,
	myArticle,
	href,
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
					{myArticle.title}
				</Typography>

				<Stack
					direction="column"
					justifyContent="center"
					alignItems="end"
				>
					<Typography variant="caption">
						{getFormattedDate(myArticle.created)}
					</Typography>
					<Stack
						direction="row"
						spacing={1}
						alignItems="center"
						justifyContent="center"
					>
						<VisibilityIcon color="action" fontSize="small" />
						<Typography variant="caption">
							{myArticle.views}
						</Typography>
					</Stack>
				</Stack>
			</Stack>
			<Typography variant="body2" color="text.secondary">
				{myArticle.description}
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
					{myArticle.title}
				</Typography>
				<Stack
					direction={'row'}
					justifyContent={'space-between'}
					alignItems={'center'}
					width={'stretch'}
				>
					<Typography variant="caption">
						{getFormattedDate(myArticle.created)}
					</Typography>
					<Stack direction="row" spacing={1} alignItems="center">
						<VisibilityIcon color="action" fontSize="small" />
						<Typography variant="caption">
							{myArticle.views}
						</Typography>
						<MoreOptions />
					</Stack>
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
			<CardActionArea LinkComponent={Link} href={href}>
				<CardMedia
					component="img"
					sx={{
						aspectRatio: '2/1',
					}}
					image={imgSrc}
					alt="green iguana"
				/>

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
								<TagsComponent tags={myArticle.expand?.tags} />

								<Stack direction="row">
									<IconButton
										aria-label="add to favorites"
										key={'favorite-post'}
									>
										<FavoriteIcon />
									</IconButton>

									<ShareButton
										key={'share-button'}
										shareData={{
											title: `${myArticle.title} - EducaUTF`,
											text: `Aqui: ${myArticle.description}`,
											url: `https://educautf.td.utfpr.edu.br/article/${myArticle.id}`,
										}}
									/>
								</Stack>
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

export default ArticleCard;
