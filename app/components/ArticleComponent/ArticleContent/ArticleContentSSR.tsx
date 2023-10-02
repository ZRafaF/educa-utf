// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import './github-markdown.css';
import Box from '@mui/material/Box/Box';
import MdRendererAsync from './MdRenderer/MdRendererAsync';

interface ArticleContentProps {
	article: string;
}

const ArticleContentSSR: FunctionComponent<ArticleContentProps> = ({
	article,
}) => {
	return (
		<Box className="markdown-body">
			<MdRendererAsync article={article} />
		</Box>
	);
};

export default ArticleContentSSR;
