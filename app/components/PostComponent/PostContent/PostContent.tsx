// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, Suspense } from 'react';
import './github-markdown.css';
import Box from '@mui/material/Box/Box';
import MdRendererAsync from './MdRenderer/MdRendererAsync';
import MdRenderer from './MdRenderer/MdRenderer';

interface PostContentProps {
	article: string;
	ssr?: boolean;
}

const PostContent: FunctionComponent<PostContentProps> = ({
	article,
	ssr = true,
}) => {
	return (
		<Box className="markdown-body">
			{ssr ? (
				<MdRendererAsync article={article} />
			) : (
				<MdRenderer article={article} />
			)}
		</Box>
	);
};

export default PostContent;
