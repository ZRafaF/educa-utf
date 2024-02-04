// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { ArticlesResponse } from '@/types/pocketbase-types';
import Box from '@mui/material/Box';
import { FunctionComponent } from 'react';

interface ArticleSelectorProps {
	callback: (article: ArticlesResponse) => void;
}

const ArticleSelector: FunctionComponent<ArticleSelectorProps> = ({
	callback,
}) => {
	return (
		<Box>
			asd
			<Box>asd</Box>
		</Box>
	);
};

export default ArticleSelector;
