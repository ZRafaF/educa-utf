// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent } from 'react';
import Markdown from 'markdown-to-jsx';
import CustomButton from '../CustomButton';
import PreBlock from './PreBlock';

interface MdRendererProps {
	article: string;
}

const MdRenderer: FunctionComponent<MdRendererProps> = ({ article }) => {
	return (
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
	);
};

export default MdRenderer;
