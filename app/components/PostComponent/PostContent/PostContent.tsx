// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import Markdown from 'markdown-to-jsx';
import CustomButton from './CustomButton';
import './github-markdown.css';
import Box from '@mui/material/Box/Box';

interface PostContentProps {
	article: string;
}

const PostContent: FunctionComponent<PostContentProps> = ({ article }) => {
	return (
		<Box className="markdown-body">
			<Markdown
				options={{
					overrides: {
						CustomButton,
					},
				}}
			>
				{article}
			</Markdown>
		</Box>
	);
};

export default PostContent;
