// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ChaptersResponse } from '@/types/pocketbase-types';
import Card from '@mui/material/Card/Card';
import CardActionArea from '@mui/material/CardActionArea/CardActionArea';
import CardContent from '@mui/material/CardContent/CardContent';
import Typography from '@mui/material/Typography/Typography';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface ChapterCardProps {
	myChapter: ChaptersResponse;
}

const ChapterCard: FunctionComponent<ChapterCardProps> = ({ myChapter }) => {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardActionArea
				LinkComponent={Link}
				href={`chapter/${myChapter.id}`}
			>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{myChapter.title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{myChapter.description}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ChapterCard;
