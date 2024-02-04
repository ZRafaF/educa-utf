// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { ArticlesResponse } from '@/types/pocketbase-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FunctionComponent } from 'react';

interface ArticleSelectorProps {
	callback: (article: ArticlesResponse) => void;
}

const ArticleSelector: FunctionComponent<ArticleSelectorProps> = ({
	callback,
}) => {
	return (
		<Box>
			<TextField
				id="outlined-basic"
				label="Outlined"
				variant="outlined"
				fullWidth
			/>
		</Box>
	);
};

export default ArticleSelector;
