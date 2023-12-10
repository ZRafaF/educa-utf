// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import Markdown from 'markdown-to-jsx';
import PreBlock from './PreBlock';
import PluginsArray from '@/plugins/PluginsArray';

interface MdRendererAsyncProps {
	article: string;
}

// DEPRECATED
const MdRendererAsync: FunctionComponent<MdRendererAsyncProps> = async ({
	article,
}) => {
	const renderers: { [key: string]: FunctionComponent<any> } = {};
	PluginsArray.forEach((plugin) => {
		renderers[plugin.render.name] = plugin.render;
	});

	return (
		<Markdown
			options={{
				overrides: {
					...renderers,
					pre: PreBlock,
				},
			}}
		>
			{article}
		</Markdown>
	);
};

export default MdRendererAsync;
