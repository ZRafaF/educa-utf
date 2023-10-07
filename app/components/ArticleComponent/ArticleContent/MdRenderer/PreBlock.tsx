// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

//@ts-ignore
import { vscDarkPlus as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
//@ts-ignore
import { Prism } from 'react-syntax-highlighter';

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
		<Prism language={lang} style={theme}>
			{children}
		</Prism>
	);
};

// markdown-to-jsx uses <pre><code/></pre> for code blocks.
const PreBlock = ({ children, ...rest }: { rest: any; children: any }) => {
	if ('type' in children && children['type'] === 'code') {
		return CodeBlock(children['props']);
	}
	return <pre {...rest}>{children}</pre>;
};

export default PreBlock;
