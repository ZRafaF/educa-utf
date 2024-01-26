// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useMemo } from 'react';
import { getFormattedDate, getFormattedVisibility } from '@/lib/helper';
import MoreArticleOptions from '@/components/MoreArticleOptions/MoreArticleOptions';
import {
	ArticlesResponse,
	ArticlesVisibilityOptions,
	ChaptersResponse,
} from '@/types/pocketbase-types';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';
import { ChaptersExpand } from '@/types/expanded-types';

interface ArticlesListItemProps {
	article: ArticlesResponse;
	chapter: ChaptersResponse<ChaptersExpand>;
	active: boolean;
	editMode: boolean;
}

const ArticlesListItem: FunctionComponent<ArticlesListItemProps> = ({
	article,
	chapter,
	active,
	editMode,
}) => {
	const MemorizedComponent = useMemo(() => {
		return (
			<Box
				key={'link_to_article' + article.id}
				sx={{
					opacity:
						article.visibility === ArticlesVisibilityOptions.private
							? 0.8
							: 1,

					bgcolor:
						article.visibility === ArticlesVisibilityOptions.private
							? 'rgba(130, 130, 130, 0.15)'
							: 'grey.A700',
					':hover': {
						border: editMode ? 1 : 0,
					},
				}}
				position={'relative'}
				color={'text.primary'}
			>
				<ListItemButton
					LinkComponent={Link}
					href={`/chapter/${chapter.id}/${article.id}`}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						borderLeft: active ? 5 : 0,
						borderColor: 'primary.main',
					}}
					disabled={editMode}
				>
					<Stack
						direction="row"
						width={'100%'}
						justifyContent="space-between"
						alignItems="center"
					>
						<ListItemText
							sx={{
								color: active ? 'primary.main' : 'text.primary',
							}}
						>
							{article.title}
						</ListItemText>
						<MoreArticleOptions
							article={article}
							shareUrl={`https://educautf.td.utfpr.edu.br/chapter/${chapter.id}/${article.id}`}
							placement="right"
							size="small"
						/>
					</Stack>
					<Typography
						color="text.secondary"
						variant="subtitle2"
						component="p"
					>
						{article.description}
					</Typography>
					<Stack
						direction="row"
						width={'100%'}
						spacing={2}
						mt={2}
						justifyContent="space-between"
						alignItems="center"
					>
						<Tooltip title="Visualizações" arrow placement="top">
							<Stack
								direction="row"
								spacing={0.5}
								alignItems="center"
								minWidth={70}
							>
								<VisibilityIcon
									color="action"
									fontSize="small"
								/>
								<Typography variant="subtitle2" component="p">
									{article.views}
								</Typography>
							</Stack>
						</Tooltip>

						<Tooltip title="Visibilidade" arrow placement="top">
							<Typography
								variant="subtitle2"
								component="p"
								fontWeight={600}
								color={
									article.visibility === 'public'
										? 'success.main'
										: 'text.secondary'
								}
							>
								{getFormattedVisibility(article.visibility)}
							</Typography>
						</Tooltip>
						<Tooltip title="Data de criação" arrow placement="top">
							<Typography
								color="text.secondary"
								variant="subtitle2"
								component="p"
								align="right"
								minWidth={80}
							>
								{getFormattedDate(
									article.created,
									'dd/MM/yyyy'
								)}
							</Typography>
						</Tooltip>
					</Stack>
				</ListItemButton>
			</Box>
		);
	}, [article, chapter, active, editMode]);

	return MemorizedComponent;
};

export default ArticlesListItem;
