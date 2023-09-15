// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import Markdown from 'markdown-to-jsx';
import CustomButton from './CustomButton';
import './github-markdown.css';
import Box from '@mui/material/Box/Box';
//@ts-ignore
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
//@ts-ignore
import { Prism } from 'react-syntax-highlighter';

interface PostContentProps {
	article: string;
}

const CodeBlock = ({
	className,
	children,
}: {
	className: string;
	children: string;
}) => {
	let lang = 'text'; // default monospaced text
	if (className && className.startsWith('lang-')) {
		lang = className.replace('lang-', '');
	}
	return (
		<Prism language={lang} style={darcula}>
			{children}
		</Prism>
	);
};

// markdown-to-jsx uses <pre><code/></pre> for code blocks.
const PreBlock = ({ children, ...rest }: { rest: any; children: any }) => {
	if ('type' in children && children['type'] === 'code') {
		return CodeBlock(children['props']);
	}
	return (
		<pre
			{...rest}
			style={{
				borderRadius: '10px !important',
			}}
		>
			{children}
		</pre>
	);
};

const PostContent: FunctionComponent<PostContentProps> = ({ article }) => {
	return (
		<Box className="markdown-body">
			<Markdown
				options={{
					overrides: {
						CustomButton,
						pre: PreBlock,
					},
				}}
			>
				{article}
			</Markdown>
		</Box>
	);
};

export default PostContent;
