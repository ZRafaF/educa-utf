// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { ChaptersExpand } from '@/types/expanded-types';
import { ArticlesResponse, ChaptersResponse } from '@/types/pocketbase-types';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import { FunctionComponent } from 'react';
import Link from 'next/link';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface RedirectButtonProps {
	chapter: ChaptersResponse<ChaptersExpand>;
	article: ArticlesResponse | undefined;
	variant: 'prev' | 'next';
}

const RedirectButton: FunctionComponent<RedirectButtonProps> = ({
	chapter,
	article,
	variant,
}) => {
	return (
		<Card
			sx={{
				width: 345,
				opacity: article === undefined ? 0.5 : 1,
				borderRadius:
					variant === 'prev'
						? '0px 10px 10px 0px'
						: '10px 0px 0px 10px',
			}}
		>
			<CardActionArea
				LinkComponent={Link}
				href={`/chapter/${chapter.id}/${article?.id}`}
				disabled={article === undefined}
				sx={{
					height: 150,
					backgroundColor: 'grey.A700',
				}}
				onClick={() => {
					window.scrollTo({
						top: 0,
						behavior: 'smooth',
					});
				}}
			>
				<CardContent>
					<Typography variant="h4">
						{variant === 'prev' ? 'Anterior' : 'Próximo'}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{article ? article.title : 'Nada aqui!'}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default RedirectButton;
