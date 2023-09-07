// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import Markdown from 'markdown-to-jsx';
import Container from '@mui/material/Container/Container';
import CustomButton from './CustomButton';
import './github-markdown.css';
import Box from '@mui/material/Box/Box';

interface PostContentProps {
	article: string;
}

const PostContent: FunctionComponent<PostContentProps> = ({ article }) => {
	return (
		<Box
			className="markdown-body"
			sx={{
				minHeight: '90vh',
			}}
		>
			<Container maxWidth="md">
				<Markdown
					options={{
						overrides: {
							CustomButton,
						},
					}}
				>
					{article}
				</Markdown>
			</Container>
		</Box>
	);
};

export default PostContent;
