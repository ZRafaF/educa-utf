// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
	ArticlesStatsResponse,
	ChaptersStatsResponse,
} from '@/types/pocketbase-types';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface CardUsernameProps {
	content: ArticlesStatsResponse | ChaptersStatsResponse;
}

const CardUsername: FunctionComponent<CardUsernameProps> = ({ content }) => {
	return (
		<Tooltip title="Autor" arrow placement="top">
			<Typography
				color="text.secondary"
				variant="subtitle2"
				fontStyle={'italic'}
				sx={{
					overflow: 'hidden',
					wordBreak: 'break',
					textOverflow: 'ellipsis',
					display: '-webkit-box',
					WebkitBoxOrient: 'vertical',
					WebkitLineClamp: 1,
				}}
				maxWidth={'50%'}
			>
				<Link
					href={`/profile/${content.author_username}`}
					style={{
						color: 'inherit',
					}}
				>
					{content.author_name}
				</Link>
			</Typography>
		</Tooltip>
	);
};

export default CardUsername;
