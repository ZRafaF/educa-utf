// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import Markdown from 'markdown-to-jsx';
import CustomButton from '../CustomButton';
import PreBlock from './PreBlock';

interface MdRendererAsyncProps {
	article: string;
}

const MdRendererAsync: FunctionComponent<MdRendererAsyncProps> = async ({
	article,
}) => {
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

export default MdRendererAsync;
