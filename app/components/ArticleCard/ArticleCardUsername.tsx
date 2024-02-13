// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ArticlesStatsResponse } from '@/types/pocketbase-types';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface ArticleCardUsernameProps {
	myArticle: ArticlesStatsResponse;
}

const ArticleCardUsername: FunctionComponent<ArticleCardUsernameProps> = ({
	myArticle,
}) => {
	return (
		<Tooltip title="Autor" arrow placement="top">
			<Typography
				color="text.secondary"
				variant="subtitle2"
				textAlign={'left'}
				fontStyle={'italic'}
			>
				<Link
					href={`/profile/${myArticle.author_username}`}
					style={{
						color: 'inherit',
					}}
				>
					{myArticle.author_name}
				</Link>
			</Typography>
		</Tooltip>
	);
};

export default ArticleCardUsername;
